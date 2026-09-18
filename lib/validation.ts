import { z } from "zod";

export const subjectOptions = [
  { value: "nahala", label: "נחלה / שטח חקלאי" },
  { value: "roof", label: "גג מסחרי או תעשייתי" },
  { value: "storage", label: "אגירת אנרגיה / תעריף משלים" },
  { value: "other", label: "אחר" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "נא להזין שם מלא").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s\-()]{7,19}$/, "נא להזין מספר טלפון תקין"),
  email: z.string().trim().email("נא להזין כתובת דוא״ל תקינה").max(120),
  subject: z.enum(subjectOptions.map((o) => o.value) as [string, ...string[]], {
    message: "נא לבחור נושא",
  }),
  message: z.string().trim().max(2000, "ההודעה ארוכה מדי").optional().default(""),
  // anti-spam: honeypot must stay empty, and the form must take a few seconds to fill
  company: z.string().max(0).optional().default(""),
  startedAt: z.coerce.number().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
