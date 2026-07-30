import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ako promenljive okruženja nisu podešene (npr. u lokalnom razvoju bez
// .env.local), export je null i storage.js se vraća na localStorage —
// aplikacija i dalje radi, samo bez deljenih podataka između uređaja.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
