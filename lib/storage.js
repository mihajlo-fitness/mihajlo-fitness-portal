// Jednostavan storage sloj preko localStorage (podaci na uređaju).
//
// VAŽNO: localStorage čuva podatke SAMO na uređaju na kom je forma popunjena.
// To znači da klijent koji popuni check-in na svom telefonu neće automatski
// biti vidljiv treneru na njegovom telefonu/računaru — za to je potrebna
// prava baza podataka (npr. Supabase, Vercel Postgres, Firebase).
// Ova implementacija je namerno jednostavna da bi projekat odmah radio na
// Vercel-u bez dodatnog podešavanja; kad budeš spreman/na, zamenimo ovaj
// fajl API pozivima ka pravoj bazi — ostatak aplikacije se neće menjati.

const PREFIX = "mihajlo_";

export async function storageSet(key, value) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("storage set failed", e);
    return false;
  }
}

export async function storageGet(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export async function storageList(prefix = "") {
  if (typeof window === "undefined") return [];
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX + prefix)) {
        keys.push(k.slice(PREFIX.length));
      }
    }
    return keys;
  } catch (e) {
    return [];
  }
}

export async function storageDelete(key) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(PREFIX + key);
    return true;
  } catch (e) {
    return false;
  }
}
