import { z } from "zod";
import { site } from "./site";

/** Shared by the form (instant feedback) and /api/contact (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Add your name (2+ characters).").max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(200, "That email is too long.")
    .pipe(z.email("That email looks off. Check for a typo.")),
  message: z
    .string()
    .trim()
    .min(10, "Say a bit more, at least 10 characters.")
    .max(5000, "Keep it under 5,000 characters."),
  /** Honeypot: hidden from people, so only bots fill it in. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";

export const mailtoSubject = "Hi Jake, from [your name]";
export const mailtoBody = `Hi Jake,

I'm ___ from ___.
I'd like to talk about ___.
Best time to reach me: ___`;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
