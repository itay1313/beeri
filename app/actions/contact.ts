"use server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, subjectOptions, type ContactField, type ContactFieldErrors, type ContactValues } from "@/lib/validation";
import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactFieldErrors;
  /** submitted values, echoed back so React 19's form reset doesn't wipe what the user typed */
  values?: ContactValues;
};

const FIELDS: ContactField[] = ["name", "phone", "email", "subject", "message"];
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;

/**
 * Best-effort in-memory limiter (per server instance). Enough for this traffic; swap for
 * Upstash/Vercel KV if the form ever attracts abuse.
 */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const values: ContactValues = Object.fromEntries(FIELDS.map((k) => [k, typeof raw[k] === "string" ? String(raw[k]) : ""]));

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (FIELDS.includes(key) && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors, values };
  }
  const data = parsed.data;

  // bots: honeypot filled, or no/implausibly fast fill time → pretend success, send nothing
  if (data.company || !data.startedAt || Date.now() - data.startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const h = await headers();
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return { status: "error", message: "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.", values };

  const to = process.env.CONTACT_TO_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const subjectLabel = subjectOptions.find((o) => o.value === data.subject)?.label ?? data.subject;

  if (!key || !to || (process.env.NODE_ENV === "production" && !from)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] Resend env not set — logging submission instead:", { ...data, subjectLabel });
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL missing");
    return { status: "error", message: "השליחה אינה זמינה כרגע.", values };
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: from ?? "BE'ERI Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `פנייה חדשה מהאתר: ${subjectLabel} – ${data.name}`,
      text: [
        `שם: ${data.name}`,
        `טלפון: ${data.phone}`,
        `דוא"ל: ${data.email}`,
        `נושא: ${subjectLabel}`,
        "",
        data.message || "(ללא הודעה)",
        "",
        `— נשלח מ-${site.domain}`,
      ].join("\n"),
    });
    if (error) {
      console.error("[contact] Resend rejected the email", error);
      return { status: "error", values };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", values };
  }
}
