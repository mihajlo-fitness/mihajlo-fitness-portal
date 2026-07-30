// Storage sloj: koristi Supabase (deljena baza, vidljiva sa svih uređaja)
// ako su env promenljive podešene; u suprotnom se vraća na localStorage
// (samo na ovom uređaju) — tako projekat radi odmah, čak i pre nego što
// se poveže baza.

import { supabase } from "./supabaseClient";

const PREFIX = "mihajlo_";

/* ---------------- Supabase (kv_store tabela) ---------------- */

async function supaSet(key, value) {
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) {
    console.error("supabase set failed", error);
    return false;
  }
  return true;
}

async function supaGet(key) {
  const { data, error } = await supabase.from("kv_store").select("value").eq("key", key).maybeSingle();
  if (error) {
    console.error("supabase get failed", error);
    return null;
  }
  return data ? data.value : null;
}

async function supaList(prefix = "") {
  const { data, error } = await supabase.from("kv_store").select("key").ilike("key", `${prefix}%`);
  if (error) {
    console.error("supabase list failed", error);
    return [];
  }
  return (data || []).map((row) => row.key);
}

async function supaDelete(key) {
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

/* ---------------- Javni API (isti za oba slučaja) ---------------- */

export async function storageSet(key, value) {
  try {
    if (supabase) return await supaSet(key, value);
    return lsSet(key, value);
  } catch (e) {
    console.error("storage set failed", e);
    return false;
  }
}

export async function storageGet(key) {
  try {
    if (supabase) return await supaGet(key);
    return lsGet(key);
  } catch (e) {
    return null;
  }
}

export async function storageList(prefix = "") {
  try {
    if (supabase) return await supaList(prefix);
    return lsList(prefix);
  } catch (e) {
    return [];
  }
}

export async function storageDelete(key) {
  try {
    if (supabase) return await supaDelete(key);
    return lsDelete(key);
  } catch (e) {
    return false;
  }
}

/* ---------------- Fotografije (Supabase Storage) ---------------- */

// Otprema fajl u "photos" bucket i vraća javni URL. Ako Supabase nije
// podešen (ili bucket ne postoji), vraća null — pozivalac se tada
// vraća na stari fallback (samo naziv fajla, bez trajnog čuvanja).
export async function uploadPhoto(file, path) {
  if (!file || !supabase) return null;
  try {
    const ext = file.name.split(".").pop() || "jpg";
    const key = `${path}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("photos").upload(key, file, {
      upsert: true,
      contentType: file.type || "image/jpeg",
    });
    if (error) {
      console.error("photo upload failed", error);
      return null;
    }
    const { data } = supabase.storage.from("photos").getPublicUrl(key);
    return data?.publicUrl || null;
  } catch (e) {
    console.error("photo upload failed", e);
    return null;
  }
}
