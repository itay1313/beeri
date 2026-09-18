import { z } from "zod";

export const subjectOptions = [
  { value: "nahala", label: "נחלה / שטח חקלאי" },
  { value: "roof", label: "גג מסחרי או תעשייתי" },
  { value: "storage", label: "אגירת אנרגיה / תעריף משלים" },
  { value: "other", label: "אחר" },
] as const;

/** Single-line text: trimmed, no control characters (keeps them out of email headers). */
const line = () => z.string().trim().transform((v) => v.replace(/[\r\n\t]+/g, " "));

export const contactSchema = z.object({
  name: line().pipe(z.string().min(2, "נא להזין שם מלא").max(80, "השם ארוך מדי")),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s\-()]{7,19}$/, "נא להזין מספר טלפון תקין"),
  email: z.string().trim().email("נא להזין כתובת דוא״ל תקינה").max(120),
  subject: z.enum(subjectOptions.map((o) => o.value) as [string, ...string[]], {
    message: "נא לבחור נושא",
  }),
  message: z.string().trim().max(2000, "ההודעה ארוכה מדי (עד 2,000 תווים)").optional().default(""),
  // anti-spam, checked in the action: honeypot must stay empty, form must take a few seconds to fill
  company: z.string().optional().default(""),
  startedAt: z.coerce.number().int().nonnegative().default(0),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = "name" | "phone" | "email" | "subject" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;
export type ContactValues = Partial<Record<ContactField, string>>;
