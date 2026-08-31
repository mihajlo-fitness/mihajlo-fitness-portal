import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Server klijent koji čita sesiju iz kolačića trenutnog zahteva.
// Koristi anon ključ + RLS — vraća SAMO podatke ulogovanog klijenta,
// baš kao browser klijent. Koristi se u server komponentama/rutama
// koje treba da znaju "ko je trenutno ulogovan klijent".
export function createSupabaseServerClient() {
  if (!url || !anonKey) return null;
  const cookieStore = cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (e) {
          // setAll pozvan iz Server Componente bez mogućnosti pisanja —
          // middleware.js se brine o osvežavanju sesije, ovo je bezopasno.
        }
      },
    },
  });
}

// ADMIN klijent — service role ključ, ZAOBILAZI RLS u potpunosti.
// SME SE KORISTITI SAMO na serveru (API rute pod app/api/trener/*),
// NIKAD u komponenti koja se šalje u browser, i NIKAD bez prethodne
// provere coach_session kolačića. Ovo je namerno odvojen fajl/export
// da bi bilo teško slučajno ga uvesti u client komponentu.
export function createSupabaseAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
