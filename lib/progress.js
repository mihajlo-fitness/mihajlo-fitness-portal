"use client";

import { useEffect, useState } from "react";

const WATCHED_KEY = "mihajlo_edu_watched";

function readWatched() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(WATCHED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeWatched(data) {
  try {
    window.localStorage.setItem(WATCHED_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

// Poziva se na stranici lekcije da je označi kao odgledanu.
export function markLessonWatched(katSlug, lekSlug) {
  const data = readWatched();
  const key = `${katSlug}/${lekSlug}`;
  data[key] = Date.now();
  writeWatched(data);
}

// Hook koji vraća {watchedCount, watchedSlugs, lastWatched, ready}
// ready=false dok se localStorage ne pročita (izbegava flash pri renderu).
export function useEduProgress() {
  const [data, setData] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(readWatched());
    setReady(true);
  }, []);

  const isWatched = (katSlug, lekSlug) => Boolean(data[`${katSlug}/${lekSlug}`]);

  const watchedCountFor = (katSlug) =>
    Object.keys(data).filter((k) => k.startsWith(`${katSlug}/`)).length;

  const lastWatched = () => {
    const entries = Object.entries(data);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    const [key] = entries[0];
    const [katSlug, lekSlug] = key.split("/");
    return { katSlug, lekSlug };
  };

  return { ready, isWatched, watchedCountFor, lastWatched };
}
