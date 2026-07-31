import { NextResponse } from "next/server";
import { COACH_EMAIL } from "@/lib/config";

// Šalje email preko Resend-a (resend.com, besplatno za mali obim).
// Ako RESEND_API_KEY nije podešen, tiho se preskače — nikad ne rušimo
// slanje forme (check-in, zahtev, poruka) zbog email obaveštenja.
export async function POST(request) {
  const { subject, text } = await request.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, skipped: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Mihajlo Fitness Portal <onboarding@resend.dev>",
        to: [COACH_EMAIL],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("resend failed", await res.text());
      return NextResponse.json({ ok: false });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("notify failed", e);
    return NextResponse.json({ ok: false });
  }
}
