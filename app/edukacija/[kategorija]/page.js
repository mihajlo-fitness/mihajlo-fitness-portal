"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Clock, PlayCircle, Check } from "lucide-react";
import { useIgUnlocked, IgGate } from "@/components/IgGate";
import { getKategorija, ukupnoTrajanjeKategorije, jeNovo } from "@/lib/edukacija-data";
import { useEduProgress } from "@/lib/progress";

export default function KategorijaPage({ params }) {
  const { unlocked, checked, unlock } = useIgUnlocked();
  const router = useRouter();
  const kategorija = getKategorija(params.kategorija);
  const { ready: progressReady, isWatched, watchedCountFor } = useEduProgress();

  if (!checked) return null;
  if (!unlocked) return <IgGate onUnlock={unlock} />;
  if (!kategorija) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-[15px] text-gray-500 font-medium mb-4">Kategorija nije pronađena.</p>
        <Link href="/edukacija" className="text-accent font-semibold text-[14px]">
          ← Nazad na Edukaciju
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <button
        onClick={() => router.push("/edukacija")}
        className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 -ml-2 mb-6"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="flex items-center gap-4 mb-2">
        <div className="h-14 w-14 rounded-2xl bg-accent/8 flex items-center justify-center text-[28px] shrink-0">
          {kategorija.emoji}
        </div>
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">{kategorija.naziv}</h1>
          <p className="text-[13.5px] text-gray-400 flex items-center gap-2">
            <span>{kategorija.lekcije.length} {kategorija.lekcije.length === 1 ? "lekcija" : "lekcije"}</span>
            {ukupnoTrajanjeKategorije(kategorija) && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {ukupnoTrajanjeKategorije(kategorija)}</span>
              </>
            )}
            {progressReady && watchedCountFor(kategorija.slug) > 0 && (
              <>
                <span>·</span>
                <span className="font-semibold text-accent">{watchedCountFor(kategorija.slug)} odgledano</span>
              </>
            )}
          </p>
        </div>
      </div>
      <p className="text-[14.5px] text-gray-400 leading-relaxed mt-4 mb-9 max-w-lg">{kategorija.opis}</p>

      <div className="grid gap-3.5 md:grid-cols-2">
        {kategorija.lekcije.map((lek) => {
          const watched = progressReady && isWatched(kategorija.slug, lek.slug);
          const novo = jeNovo(lek);
          const imaVideo = Boolean(lek.video && lek.video !== "#");
          return (
            <Link
              key={lek.slug}
              href={`/edukacija/${kategorija.slug}/${lek.slug}`}
              className="group rounded-[26px] border border-gray-100 overflow-hidden transition-all duration-300 hover:border-accent/25 hover:shadow-[0_14px_36px_rgba(81,112,255,0.10)] hover:-translate-y-0.5 active:scale-[0.98] bg-white"
            >
              <div className="h-40 bg-gradient-to-br from-accent/10 to-accent/[0.03] flex items-center justify-center relative">
                <PlayCircle size={34} className="text-accent/70 transition-transform duration-300 group-hover:scale-110" />
                {imaVideo ? (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[11.5px] font-semibold text-white bg-black/55 px-2.5 py-1 rounded-full">
                    <Clock size={11} /> {lek.trajanje}
                  </span>
                ) : (
                  <span className="absolute bottom-3 right-3 text-[11.5px] font-semibold text-gray-500 bg-white/90 px-2.5 py-1 rounded-full">
                    Uskoro
                  </span>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {novo && (
                    <span className="text-[10.5px] font-bold text-white bg-accent px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Novo
                    </span>
                  )}
                  {lek.nivo && (
                    <span className="text-[10.5px] font-semibold text-gray-700 bg-white/90 px-2.5 py-1 rounded-full">
                      {lek.nivo}
                    </span>
                  )}
                </div>
                {watched && (
                  <span className="absolute top-3 right-3 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-[15px] font-bold text-gray-900 leading-snug mb-2">{lek.naslov}</p>
                <p className="text-[13px] text-gray-400 leading-relaxed mb-4 line-clamp-2">{lek.opis}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                  {watched ? "Pogledaj ponovo" : "Pogledaj"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
