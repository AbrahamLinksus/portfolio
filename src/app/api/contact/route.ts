import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;

const json = (body: unknown, status = 200, headers?: HeadersInit) => Response.json(body, { status, headers });

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return json(
      { error: "Too many messages from this connection. Try again in a few minutes, or email me directly." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ error: "That message is too long to send." }, 413);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "The request wasn't valid JSON." }, 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: "A couple of fields need fixing.", fields: z.flattenError(parsed.error).fieldErrors }, 400);
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot filled in: almost certainly a bot. Pretend it worked.
  if (website) return json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return json({ error: "The contact form isn't set up yet. Please use the email link instead." }, 503);
  }

  const safeName = name.replace(/[\r\n]+/g, " ");
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio: message from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}`,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[contact] send failed:", err);
    return json({ error: "The message couldn't be sent right now. Please try again, or use the email link." }, 502);
  }

  return json({ ok: true });
}
