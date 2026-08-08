"use client";

import Link from "next/link";
import { Play, Check } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ACCENT = "#2563eb";

const ISTAKNUTO = [
  "-25 kg transformacija",
  "Sertifikovani fitness trener",
  "Besplatna edukacija",
  "Praktični planovi",
];

export default function OMeniPage() {
  const [imgRef, imgVidljivo] = useScrollReveal(0.15);
  const [textRef, textVidljivo] = useScrollReveal(0.15);

  return (
    <div className="max-w-md md:max-w-5xl mx-auto px-6 py-10 md:py-14">
      <div
        className="rounded-[36px] p-6 md:p-14 relative overflow-hidden"
        style={{ background: "#050506" }}
      >
        {/* Ambijentalni sjaj u pozadini */}
        <div
          className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)` }}
        />

        <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEVA STRANA — slider (na mobilnom ide prvi) */}
          <div
            ref={imgRef}
            className={
              "transition-all duration-700 ease-out " +
              (imgVidljivo ? "opacity-100 scale-100" : "opacity-0 scale-95")
            }
          >
            <BeforeAfterSlider badge="-25 KG TRANSFORMACIJA" />
          </div>

          {/* DESNA STRANA — priča */}
          <div
            ref={textRef}
            className={
              "transition-all duration-700 ease-out delay-150 " +
              (textVidljivo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")
            }
          >
            <p
              className="text-[13px] font-bold tracking-[3px] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              O meni
            </p>
            <h1 className="text-[34px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Nisam rođen fit.
            </h1>

            <div className="space-y-4 text-[15px] md:text-[16px] text-white/60 leading-relaxed mb-8">
              <p>
                Godinama sam nosio višak kilograma i svaki pokušaj da to promenim završavao se isto —
                brzim rezultatom koji bi se vratio dvostruko, i sve manje vere da postoji način koji stvarno traje.
              </p>
              <p>
                Prošao sam kroz ceo proces, sa svim greškama koje se mogu napraviti — pogrešnim dijetama,
                pretreniranjem, odustajanjem i ponovnim počinjanjem. Iz toga sam naučio više nego iz bilo koje knjige.
              </p>
              <p>
                Danas sam sertifikovani trener i pomažem ljudima da ne izgube godine tražeći ono što sam ja
                morao sam da otkrijem — sistem koji se stvarno može održati.
              </p>
            </div>

            {/* Glassmorphism highlight box */}
            <div className="rounded-3xl p-6 mb-8 border border-white/10 backdrop-blur-xl bg-white/[0.04]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ISTAKNUTO.map((stavka) => (
                  <div key={stavka} className="flex items-center gap-2.5">
                    <div
                      className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${ACCENT}30` }}
                    >
                      <Check size={12} strokeWidth={3} style={{ color: ACCENT }} />
                    </div>
                    <span className="text-[13.5px] font-medium text-white/85">{stavka}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/edukacija"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-white font-semibold text-[15px] transition-all duration-300 hover:gap-3.5 hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)] active:scale-[0.98]"
              style={{ background: ACCENT, boxShadow: "0 10px 26px rgba(37,99,235,0.35)" }}
            >
              <Play size={15} fill="white" /> Pogledaj besplatne lekcije
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
