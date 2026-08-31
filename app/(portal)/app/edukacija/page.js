"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, PlayCircle, Clock } from "lucide-react";
import { KATEGORIJE, pretraziLekcije, ukupnoTrajanjeKategorije, getLekcija } from "@/lib/edukacija-data";
import { useEduProgress } from "@/lib/progress";

export default function EdukacijaPage() {
  const [query, setQuery] = useState("");
  const { ready: progressReady, watchedCountFor, lastWatched } = useEduProgress();

  const rezultatiPretrage = useMemo(() => pretraziLekcije(query), [query]);
  const pretrazujem = query.trim().length > 0;

  const nastavi = progressReady ? lastWatched() : null;
  const nastaviLekcija = nastavi ? getLekcija(nastavi.katSlug, nastavi.lekSlug) : null;

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 md:py-14 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-11 w-11 rounded-2xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
          <BookOpen size={20} />
        </div>
        <h1 className="text-[30px] md:text-[36px] font-bold text-gray-900 tracking-tight">Edukacija</h1>
      </div>
      <p className="text-[15px] text-gray-400 leading-relaxed mb-8 max-w-lg">
        Nauči osnove treninga, ishrane i zdravih navika kroz kratke i praktične lekcije.
      </p>

      <div className="relative mb-10">
        <Search size={17} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretraži lekcije..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 pl-12 pr-5 py-4 text-[15px] outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all duration-200"
        />
      </div>

      {!pretrazujem && nastaviLekcija && (
        <Link
          href={`/app/edukacija/${nastaviLekcija.kategorija.slug}/${nastaviLekcija.lekcija.slug}`}
          className="group flex items-center gap-5 rounded-[26px] p-5 mb-8 text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          style={{ background: "#5170ff", boxShadow: "0 16px 36px rgba(81,112,255,0.3)" }}
        >
          <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <PlayCircle size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70 mb-1">Nastavi gde si stao/la</p>
            <p className="text-[15.5px] font-bold truncate">{nastaviLekcija.lekcija.naslov}</p>
          </div>
          <ChevronRight size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}

      {pretrazujem ? (
        <SearchResults results={rezultatiPretrage} query={query} />
      ) : (
        <div className="grid gap-3.5 md:grid-cols-2">
          {KATEGORIJE.map((kat) => {
            const watched = progressReady ? watchedCountFor(kat.slug) : 0;
            const total = kat.lekcije.length;
            const pct = total > 0 ? Math.round((watched / total) * 100) : 0;
            return (
              <Link
                key={kat.slug}
                href={`/app/edukacija/${kat.slug}`}
                className="group rounded-[28px] border border-gray-100 p-6 flex items-start gap-5 transition-all duration-300 hover:border-accent/25 hover:shadow-[0_16px_40px_rgba(81,112,255,0.10)] hover:-translate-y-0.5 active:scale-[0.98] bg-white"
              >
                <div className="h-16 w-16 rounded-2xl bg-accent/8 flex items-center justify-center text-[30px] shrink-0 transition-colors duration-300 group-hover:bg-accent/12">
                  {kat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[18px] font-bold text-gray-900 tracking-tight mb-1.5">{kat.naziv}</p>
                  <p className="text-[13.5px] text-gray-400 leading-relaxed mb-3">{kat.opis}</p>

                  {(ukupnoTrajanjeKategorije(kat) || watched > 0) && (
                    <div className="flex items-center gap-3 text-[12.5px] text-gray-400 mb-3">
                      {ukupnoTrajanjeKategorije(kat) && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {ukupnoTrajanjeKategorije(kat)}
                        </span>
                      )}
                      {ukupnoTrajanjeKategorije(kat) && watched > 0 && <span>·</span>}
                      {watched > 0 && (
                        <span className="font-semibold text-accent">
                          {watched}/{total} odgledano
                        </span>
                      )}
                    </div>
                  )}

                  {watched > 0 && (
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-accent">
                    {total} {total === 1 ? "lekcija" : "lekcije"}
                    <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SearchResults({ results, query }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[15px] text-gray-500 font-medium mb-1">Nema rezultata za "{query}"</p>
        <p className="text-[13.5px] text-gray-400">Probaj drugu reč ili pretraži po kategoriji.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide mb-4">
        {results.length} {results.length === 1 ? "rezultat" : "rezultata"}
      </p>
      <div className="space-y-2.5">
        {results.map(({ kategorija, lekcija }) => (
          <Link
            key={`${kategorija.slug}-${lekcija.slug}`}
            href={`/app/edukacija/${kategorija.slug}/${lekcija.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-accent/25 active:scale-[0.98]"
          >
            <div className="h-12 w-12 rounded-xl bg-accent/8 flex items-center justify-center text-accent shrink-0">
              <PlayCircle size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14.5px] font-semibold text-gray-900 truncate">{lekcija.naslov}</p>
              <p className="text-[12.5px] text-gray-400">
                {kategorija.emoji} {kategorija.naziv} · {lekcija.trajanje}
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
