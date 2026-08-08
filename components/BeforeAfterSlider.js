"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Interaktivni before/after slider. Očekuje fotografije na:
 *   /public/mihajlo-pre.jpg
 *   /public/mihajlo-posle.jpg
 * Dok ih ne dodaš, prikazuje elegantan placeholder umesto polomljene slike.
 */
export default function BeforeAfterSlider({ badge = "-25 KG TRANSFORMACIJA" }) {
  const [pozicija, setPozicija] = useState(50);
  const [prevlaci, setPrevlaci] = useState(false);
  const [preGreska, setPreGreska] = useState(false);
  const [posleGreska, setPosleGreska] = useState(false);
  const [sirina, setSirina] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setSirina(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const azurirajPoziciju = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPozicija((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!prevlaci) return;
    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      azurirajPoziciju(x);
    };
    const onUp = () => setPrevlaci(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [prevlaci, azurirajPoziciju]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden select-none shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10"
        onMouseDown={(e) => {
          setPrevlaci(true);
          azurirajPoziciju(e.clientX);
        }}
        onTouchStart={(e) => {
          setPrevlaci(true);
          azurirajPoziciju(e.touches[0].clientX);
        }}
      >
        {/* POSLE — bazni sloj, puna širina */}
        <div className="absolute inset-0">
          {posleGreska ? (
            <div className="w-full h-full bg-gradient-to-br from-[#1a2540] to-[#0a0a0f] flex items-center justify-center">
              <span className="text-[13px] font-semibold tracking-widest text-white/30 uppercase">Foto: posle</span>
            </div>
          ) : (
            <img
              src="/mihajlo-posle.jpg"
              alt="Mihajlo posle transformacije"
              onError={() => setPosleGreska(true)}
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}
          <span className="absolute top-5 right-5 text-[11px] font-bold tracking-[3px] text-white/80 uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
            Posle
          </span>
        </div>

        {/* PRE — gornji sloj, isečen prema poziciji slidera */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pozicija}%` }}>
          {preGreska ? (
            <div className="h-full bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] flex items-center justify-center" style={{ width: sirina || "100%" }}>
              <span className="text-[13px] font-semibold tracking-widest text-white/30 uppercase">Foto: pre</span>
            </div>
          ) : (
            <img
              src="/mihajlo-pre.jpg"
              alt="Mihajlo pre transformacije"
              onError={() => setPreGreska(true)}
              className="h-full object-cover"
              style={{ width: sirina || "100%", maxWidth: "none" }}
              draggable={false}
            />
          )}
          <span className="absolute top-5 left-5 text-[11px] font-bold tracking-[3px] text-white/80 uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
            Pre
          </span>
        </div>

        {/* Linija razdvajanja + kružni handle */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/70" style={{ left: `${pozicija}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-ew-resize">
            <ChevronLeft size={14} className="text-black -mr-1" strokeWidth={3} />
            <ChevronRight size={14} className="text-black -ml-1" strokeWidth={3} />
          </div>
        </div>

        {/* Premium badge */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-white text-[13px] font-bold tracking-wide backdrop-blur-md border border-white/20 shadow-lg"
          style={{ background: "rgba(37,99,235,0.85)" }}
        >
          {badge}
        </div>
      </div>

      <p className="text-center text-[12px] text-white/30 mt-4 font-medium tracking-wide">
        ← Prevuci da uporediš →
      </p>
    </div>
  );
}
