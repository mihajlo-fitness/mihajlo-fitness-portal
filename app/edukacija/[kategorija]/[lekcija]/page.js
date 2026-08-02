"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Check, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useIgUnlocked, IgGate } from "@/components/IgGate";
import { getKategorija, getLekcija } from "@/lib/edukacija-data";
import { getYouTubeId } from "@/lib/helpers";
import { markLessonWatched } from "@/lib/progress";

export default function LekcijaPage({ params }) {
  const { unlocked, checked, unlock } = useIgUnlocked();
  const router = useRouter();
  const found = getLekcija(params.kategorija, params.lekcija);

  useEffect(() => {
    if (unlocked && found) {
      markLessonWatched(found.kategorija.slug, found.lekcija.slug);
    }
  }, [unlocked, found]);

  if (!checked) return null;
  if (!unlocked) return <IgGate onUnlock={unlock} />;
  if (!found) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-[15px] text-gray-500 font-medium mb-4">Lekcija nije pronađena.</p>
        <Link href="/edukacija" className="text-accent font-semibold text-[14px]">
          ← Nazad na Edukaciju
        </Link>
      </div>
    );
  }

  const { kategorija, lekcija } = found;
  const idx = kategorija.lekcije.findIndex((l) => l.slug === lekcija.slug);
  const prethodna = idx > 0 ? kategorija.lekcije[idx - 1] : null;
  const sledeca = idx < kategorija.lekcije.length - 1 ? kategorija.lekcije[idx + 1] : null;
  const slicne = kategorija.lekcije.filter((l) => l.slug !== lekcija.slug).slice(0, 3);
  const ytId = getYouTubeId(lekcija.video);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <button
        onClick={() => router.push(`/edukacija/${kategorija.slug}`)}
        className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 -ml-2 mb-6"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="rounded-[28px] overflow-hidden mb-6 bg-black relative aspect-video">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            title={lekcija.naslov}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/25 to-accent/5 flex items-center justify-center">
            <PlayCircle size={48} className="text-white/80" />
          </div>
        )}
      </div>

      <p className="text-[13px] font-semibold text-accent uppercase tracking-wide mb-2">
        {kategorija.emoji} {kategorija.naziv}
      </p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight leading-snug mb-2">{lekcija.naslov}</h1>
      <div className="flex items-center gap-2.5 mb-6">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400">
          <Clock size={13} /> {lekcija.trajanje}
        </span>
        {lekcija.nivo && (
          <>
            <span className="text-gray-300">·</span>
            <span className="text-[12px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{lekcija.nivo}</span>
          </>
        )}
      </div>

      <p className="text-[15px] text-gray-600 leading-relaxed mb-8">{lekcija.opis}</p>

      {lekcija.kljucneTacke?.length > 0 && (
        <div className="rounded-2xl bg-gray-50/70 p-5 mb-10">
          <p className="text-[12.5px] font-semibold text-gray-500 uppercase tracking-wide mb-4">Ključne tačke</p>
          <div className="space-y-3">
            {lekcija.kljucneTacke.map((tacka, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed">{tacka}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-12">
        {prethodna ? (
          <Link
            href={`/edukacija/${kategorija.slug}/${prethodna.slug}`}
            className="rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-accent/25"
          >
            <span className="flex items-center gap-1 text-[11.5px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              <ChevronLeft size={13} /> Prethodna
            </span>
            <p className="text-[13.5px] font-semibold text-gray-900 line-clamp-2">{prethodna.naslov}</p>
          </Link>
        ) : (
          <div />
        )}
        {sledeca ? (
          <Link
            href={`/edukacija/${kategorija.slug}/${sledeca.slug}`}
            className="rounded-2xl border border-gray-100 p-4 text-right transition-all duration-200 hover:border-accent/25"
          >
            <span className="flex items-center justify-end gap-1 text-[11.5px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Sledeća <ChevronRight size={13} />
            </span>
            <p className="text-[13.5px] font-semibold text-gray-900 line-clamp-2">{sledeca.naslov}</p>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {slicne.length > 0 && (
        <div>
          <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-4">Slične lekcije</p>
          <div className="space-y-2.5">
            {slicne.map((lek) => (
              <Link
                key={lek.slug}
                href={`/edukacija/${kategorija.slug}/${lek.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-accent/25 active:scale-[0.98]"
              >
                <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center text-accent shrink-0">
                  <PlayCircle size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-900 truncate">{lek.naslov}</p>
                  <p className="text-[12px] text-gray-400">{lek.trajanje}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
