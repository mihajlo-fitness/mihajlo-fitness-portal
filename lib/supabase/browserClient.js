"use client";

import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// KLJUČNA POPRAVKA (nova, konačna): Supabase klijent interno koristi
// "lock" mehanizam (Web Locks API u browseru) da spreči da dve
// istovremene auth operacije (npr. dva poziva getUser()/verifyOtp() u
// razmaku od par sekundi, ili ostatak prekinutog poziva iz ranijeg taba)
// međusobno "pregaze" sesiju. Dokazano u testiranju: mrežni poziv zna
// da USPE (status 200, brzo) dok sam JS poziv i dalje "visi" — to je
// tačan potpis zaglavljenog internog lock-a, NE mrežnog problema.
// Zamenjujemo taj interni lock sa "no-op" verzijom (samo odmah izvrši
// funkciju, bez čekanja na bilo kakvo zaključavanje) — bezbedno za ovu
// aplikaciju jer korisnik po pravilu ima samo JEDAN aktivan tab/uređaj
// odjednom, pa zaštita od retke istovremene kolizije nije neophodna,
// a rizik od zaglavljivanja je bio realan i ponavljao se.
async function noOpLock(_name, _acquireTimeout, fn) {
  return fn();
}

let singleton;

export function createSupabaseBrowserClient() {
  if (!url || !anonKey) return null;
  if (!singleton) {
    singleton = createBrowserClient(url, anonKey, {
      auth: { lock: noOpLock },
    });
  }
  return singleton;
}
