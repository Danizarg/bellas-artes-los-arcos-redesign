import { NextResponse } from "next/server";
import { business } from "@/lib/site";

/**
 * Contact delivery.
 *
 * This endpoint only claims to have sent something when it actually did. With
 * no mail provider configured it returns 503 and the form falls back to
 * opening the visitor's own mail client, so a message is never silently lost.
 *
 * To switch on direct delivery, set in the Vercel project:
 *   RESEND_API_KEY     — API key from resend.com
 *   CONTACT_TO_EMAIL   — optional, defaults to the shop's address
 *   CONTACT_FROM_EMAIL — optional, must be a domain verified with Resend
 */

const MAX = { name: 120, email: 180, phone: 40, message: 4000 };

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        reason: "not_configured",
        message:
          "El envío directo no está configurado todavía. Escríbanos a " + business.email + ".",
      },
      { status: 503 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // Honeypot: real people leave this hidden field empty.
  if (clean(payload.company, 50) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const phone = clean(payload.phone, MAX.phone);
  const message = clean(payload.message, MAX.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Indíquenos su nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Revise su email.";
  if (message.length < 10) errors.message = "Cuéntenos un poco más.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "invalid", errors }, { status: 422 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? business.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Bellas Artes Los Arcos <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Consulta desde la web — ${name}`,
        text: [
          `Nombre:  ${name}`,
          `Email:   ${email}`,
          phone ? `Teléfono: ${phone}` : null,
          "",
          message,
        ]
          .filter((line) => line !== null)
          .join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message:", response.status, detail);
      return NextResponse.json({ ok: false, reason: "provider_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Could not reach the mail provider:", error);
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 502 });
  }
}
