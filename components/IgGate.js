"use client";

import { useEffect, useState } from "react";
import { Instagram, Check } from "lucide-react";
import { ACCENT } from "./ui";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/config";

const KEY = "mihajlo_ig_unlocked";

// Napomena: ovo je "na časnu reč" otključavanje (sačuvano samo u ovom
// pregledaču) — Instagram ne dozvoljava aplikacijama trećih strana da
// automatski provere da li je neko zapratio nalog.
export function useIgUnlocked() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(window.localStorage.getItem(KEY) === "yes");
    } catch (e) {
      // ignore
    }
    setChecked(true);
  }, []);

  const unlock = () => {
    try {
      window.localStorage.setItem(KEY, "yes");
    } catch (e) {
      // ignore
    }
    setUnlocked(true);
  };

  return { unlocked, checked, unlock };
}

export function IgGate({ onUnlock }) {
  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center animate-fade-in">
      <div className="h-14 w-14 rounded-2xl bg-accent/8 text-accent flex items-center justify-center mx-auto mb-5">
        <Instagram size={22} />
      </div>
      <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mb-2">Otključaj Edukaciju</h1>
      <p className="text-[13.5px] text-gray-400 leading-relaxed mb-7 max-w-xs mx-auto">
        Zaprati <span className="font-medium text-gray-600">@{mihajlofitness}</span> na Instagramu da dobiješ pristup video lekcijama i savetima.
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 mb-3 transition-all duration-200 active:scale-[0.98]"
        style={{ background: ACCENT }}
      >
        <Instagram size={17} /> Otvori Instagram
      </a>
      <button
        onClick={onUnlock}
        className="w-full h-[52px] rounded-2xl border border-gray-200 text-gray-700 font-medium text-[14.5px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] hover:bg-gray-50"
      >
        <Check size={16} /> Zapratio/la sam, otključaj
      </button>
    </div>
  );
}
