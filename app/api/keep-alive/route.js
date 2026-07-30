import { NextResponse } from "next/server";
import { storageSet } from "@/lib/storage";

// Vercel Cron pogađa ovu rutu jednom dnevno (vidi vercel.json).
// Cilj je samo da napravi jedan pravi upit ka Supabase bazi, da
// projekat na besplatnom planu ne bude automatski pauziran zbog
// 7 dana neaktivnosti.
export async function GET() {
  const ok = await storageSet("_keep-alive", { pinged: Date.now() });
  return NextResponse.json({ ok });
}
