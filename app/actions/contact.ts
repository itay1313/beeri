"use server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, subjectOptions, type ContactFieldErrors } from "@/lib/validation";
import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactFieldErrors;
};

// simple in-memory rate limit: 5 submissions / 10 min / IP (enough at this traffic)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFieldErrors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }
  const data = parsed.data;

  // anti-spam: honeypot filled or submitted too fast → pretend success
  if (data.company || (data.startedAt && Date.now() - data.startedAt < 3000)) {
    return { status: "success" };
  }
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return { status: "error", message: "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות." };

  const to = process.env.CONTACT_TO_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const subjectLabel = subjectOptions.find((o) => o.value === data.subject)?.label ?? data.subject;

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — logging submission instead:", { ...data, subjectLabel });
      return { status: "success" };
    }
    return { status: "error", message: "השליחה אינה זמינה כרגע." };
  }

  try {
    const resend = new Resend(key);
    const from = process.env.CONTACT_FROM_EMAIL ?? "BE'ERI Website <onboarding@resend.dev>";
    await resend.emails.send({
      from,
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
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", message: undefined };
  }
}
