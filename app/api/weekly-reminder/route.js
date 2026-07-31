import { NextResponse } from "next/server";
import { storageList, storageGet } from "@/lib/storage";

// Vercel Cron pogađa ovu rutu svake nedelje ujutru (vidi vercel.json).
// Prolazi kroz sve klijente koji su u početnom upitniku ostavili email
// i šalje im kratak podsetnik da popune nedeljni check-in.
export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, skipped: true });
  }

  const keys = await storageList("client:");
  let sent = 0;

  for (const key of keys) {
    const val = await storageGet(key);
    if (!val?.email) continue;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mihajlo Fitness Coach <onboarding@resend.dev>",
          to: [val.email],
          subject: "Vreme je za nedeljni check-in 💪",
          text: `Ćao ${val.ime || ""}!\n\nPodsetnik da popuniš nedeljni check-in na portalu kad stigneš — traje par minuta.\n\nVidimo se,\nMihajlo`,
        }),
      });
      if (res.ok) sent++;
    } catch (e) {
      console.error("reminder failed for", val.email, e);
    }
  }

  return NextResponse.json({ ok: true, sent });
}
