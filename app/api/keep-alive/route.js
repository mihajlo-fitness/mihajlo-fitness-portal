import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

// Vercel Cron pogađa ovu rutu jednom dnevno (vidi vercel.json).
// Cilj je samo da napravi jedan pravi upit ka Supabase bazi, da projekat
// na besplatnom planu ne bude automatski pauziran zbog 7 dana neaktivnosti.
//
// VAŽNO: koristi ADMIN (service role) klijent, ne obični storage.js —
// ova ruta nema ulogovanog korisnika (poziva je Vercel Cron, ne osoba u
// browseru), pa RLS politike vezane za auth.uid() ne bi propustile upis.
export async function GET() {
  const admin = createSupabaseAdminClient();
  if (!admin) return NextResponse.json({ ok: false, skipped: true });

  const { error } = await admin
    .from("kv_store")
    .upsert({ key: "_keep-alive", value: { pinged: Date.now() }, owner_id: null, updated_at: new Date().toISOString() });

  return NextResponse.json({ ok: !error });
}
