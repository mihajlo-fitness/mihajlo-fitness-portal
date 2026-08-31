// Storage sloj: koristi Supabase (deljena baza, RLS-zaštićena po korisniku)
// ako su env promenljive podešene; u suprotnom se vraća na localStorage
// (samo na ovom uređaju, bez deljenja) — tako projekat i dalje radi u
// razvoju čak i bez povezane baze.
//
// VAŽNO O owner_id: svaki red u kv_store ima owner_id koji RLS politike
// (supabase/schema.sql) koriste da ograniče ko sme šta da vidi/menja.
// - Kad KLIJENT piše svoje podatke (onboarding, check-in), owner_id se
//   automatski postavlja na njegov auth.uid() (podrazumevano ponašanje).
// - Kad TRENER piše u ime klijenta (plan, feedback), mora eksplicitno
//   proslediti ownerId = uid tog klijenta kao treći argument storageSet-a
//   — u suprotnom bi red "pripao" treneru, ne klijentu.
//
// VAŽNO O TIMEOUT-u: svaki poziv ka bazi je omotan sa withTimeout() —
// ako Supabase ne odgovori u razumnom roku (10s), poziv se prekida i
// vraća bezbednu praznu vrednost umesto da zauvek "visi". Ovo znači da
// nijedna stranica u aplikaciji više ne može ostati zaglavljena na
// "Učitavanje..." unedogled, čak i ako mreža/baza privremeno zapne.

import { createSupabaseBrowserClient } from "./supabase/browserClient";

const PREFIX = "mihajlo_";
const TIMEOUT_MS = 10000;

// Klijent se pravi SAMO JEDNOM i ponovo koristi za sve pozive (umesto da
// se pravi iznova pri svakom storageGet/storageSet pozivu) — jeftinije i
// izbegava potencijalne probleme sa ponovljenim instanciranjem.
let cachedClient;
function getClient() {
  if (cachedClient === undefined) {
    cachedClient = createSupabaseBrowserClient();
  }
  return cachedClient;
}

function withTimeout(promise, fallback, label) {
  return Promise.race([
    promise,
    new Promise((resolve) =>
      setTimeout(() => {
        console.error(`storage timeout: ${label} nije odgovorio za ${TIMEOUT_MS}ms`);
        resolve(fallback);
      }, TIMEOUT_MS)
    ),
  ]);
}

async function currentUserId(supabase) {
  const { data } = await supabase.auth.getUser();
  return data?.user?.id || null;
}

/* ---------------- Supabase (kv_store tabela) ---------------- */

async function supaSet(supabase, key, value, ownerId) {
  const owner = ownerId !== undefined ? ownerId : await currentUserId(supabase);
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, owner_id: owner, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) {
    console.error("supabase set failed", error);
    return false;
  }
  return true;
}

async function supaGet(supabase, key) {
  const { data, error } = await supabase.from("kv_store").select("value").eq("key", key).maybeSingle();
  if (error) {
    console.error("supabase get failed", error);
    return null;
  }
  return data ? data.value : null;
}

async function supaList(supabase, prefix = "") {
  const { data, error } = await supabase.from("kv_store").select("key").ilike("key", `${prefix}%`);
  if (error) {
    console.error("supabase list failed", error);
    return [];
  }
  return (data || []).map((row) => row.key);
}

async function supaDelete(supabase, key) {
  const { error } = await supabase.from("kv_store").delete().eq("key", key);
  return !error;
}

/* ---------------- localStorage fallback (bez baze) ---------------- */

function lsSet(key, value) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function lsGet(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function lsList(prefix = "") {
  if (typeof window === "undefined") return [];
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX + prefix)) keys.push(k.slice(PREFIX.length));
    }
    return keys;
  } catch (e) {
    return [];
  }
}

function lsDelete(key) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(PREFIX + key);
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------------- Javni API ---------------- */

// ownerId je OPCIONO. Ne prosleđuj ga (podrazumevano ponašanje) kad
// korisnik piše SVOJE podatke. Prosledi ga eksplicitno (uid klijenta)
// kad TRENER piše u ime klijenta (npr. plan, feedback).
export async function storageSet(key, value, ownerId) {
  try {
    const supabase = getClient();
    if (supabase) return await withTimeout(supaSet(supabase, key, value, ownerId), false, `set(${key})`);
    return lsSet(key, value);
  } catch (e) {
    console.error("storage set failed", e);
    return false;
  }
}

export async function storageGet(key) {
  try {
    const supabase = getClient();
    if (supabase) return await withTimeout(supaGet(supabase, key), null, `get(${key})`);
    return lsGet(key);
  } catch (e) {
    console.error("storage get failed", e);
    return null;
  }
}

// P1-3: dodatna, POSEBNA funkcija (ne menja postojeću storageGet iznad
// da se ne rizikuje nešto drugo što je već zavisno od nje) — vraća i
// da li je poziv STVARNO uspeo, da stranice mogu da razlikuju "nema
// podataka" od "poziv nije uspeo/istekao".
export async function storageGetSafe(key) {
  try {
    const supabase = getClient();
    if (!supabase) return { value: lsGet(key), ok: true };
    const TIMED_OUT = Symbol("timeout");
    const result = await withTimeout(supaGet(supabase, key), TIMED_OUT, `get(${key})`);
    if (result === TIMED_OUT) return { value: null, ok: false };
    return { value: result, ok: true };
  } catch (e) {
    console.error("storage getSafe failed", e);
    return { value: null, ok: false };
  }
}

export async function storageList(prefix = "") {
  try {
    const supabase = getClient();
    if (supabase) return await withTimeout(supaList(supabase, prefix), [], `list(${prefix})`);
    return lsList(prefix);
  } catch (e) {
    console.error("storage list failed", e);
    return [];
  }
}

// P1-3: isti obrazac kao storageGetSafe — razlikuje "prazna lista"
// od "poziv nije uspeo".
export async function storageListSafe(prefix = "") {
  try {
    const supabase = getClient();
    if (!supabase) return { keys: lsList(prefix), ok: true };
    const TIMED_OUT = Symbol("timeout");
    const result = await withTimeout(supaList(supabase, prefix), TIMED_OUT, `list(${prefix})`);
    if (result === TIMED_OUT) return { keys: [], ok: false };
    return { keys: result, ok: true };
  } catch (e) {
    console.error("storage listSafe failed", e);
    return { keys: [], ok: false };
  }
}


export async function storageDelete(key) {
  try {
    const supabase = getClient();
    if (supabase) return await withTimeout(supaDelete(supabase, key), false, `delete(${key})`);
    return lsDelete(key);
  } catch (e) {
    console.error("storage delete failed", e);
    return false;
  }
}

/* ---------------- Fotografije (Supabase Storage, privatan bucket) ---------------- */

// Otprema fajl u "photos" bucket pod putanjom {path}/{userId}/... i vraća
// signed URL (bucket VIŠE NIJE javan — vidi supabase/schema.sql). Signed
// URL važi godinu dana, dovoljno dugo za praktičnu upotrebu u portalu.
// Ako Supabase nije podešen, vraća null — pozivalac se vraća na stari
// fallback (bez trajnog čuvanja fotografije).
export async function uploadPhoto(file, path) {
  const supabase = getClient();
  if (!file || !supabase) return null;
  try {
    const ext = file.name.split(".").pop() || "jpg";
    const key = `${path}-${Date.now()}.${ext}`;
    const { error } = await withTimeout(
      supabase.storage.from("photos").upload(key, file, {
        upsert: true,
        contentType: file.type || "image/jpeg",
      }),
      { error: { message: "timeout" } },
      `upload(${key})`
    );
    if (error) {
      console.error("photo upload failed", error);
      return null;
    }
    const { data, error: signError } = await withTimeout(
      supabase.storage.from("photos").createSignedUrl(key, 60 * 60 * 24 * 365),
      { data: null, error: { message: "timeout" } },
      `signedUrl(${key})`
    );
    if (signError) {
      console.error("signed url failed", signError);
      return null;
    }
    return data?.signedUrl || null;
  } catch (e) {
    console.error("photo upload failed", e);
    return null;
  }
}
