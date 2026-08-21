"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { KATEGORIJE } from "@/lib/edukacija-data";
import { useIgUnlocked, IgGate } from "@/components/IgGate";
import { ACCENT } from "@/components/ui";

function imaVideo(lekcija) {
  return Boolean(lekcija.video && lekcija.video !== "#");
}

export default function JavnaEdukacijaPage() {
  const { unlocked, unlock } = useIgUnlocked();
  if (!unlocked) return <IgGate onUnlock={unlock} />;

  const ukupnoLekcija = KATEGORIJE.reduce((sum, k) => sum + k.lekcije.length, 0);
  const snimljenoLekcija = KATEGORIJE.reduce((sum, k) => sum + k.lekcije.filter(imaVideo).length, 0);

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Edukacija</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Besplatne lekcije</h1>
      <p className="text-[13.5px] text-gray-400 mb-5">
        {snimljenoLekcija} video lekcija već dostupno, plan je da ih ukupno bude {ukupnoLekcija} kroz {KATEGORIJE.length}{" "}
        modula — od prvog treninga do dosledne ishrane i navika.
      </p>

      <div className="flex items-center gap-2.5 rounded-2xl bg-accent/5 border border-accent/10 px-4 py-3 mb-8">
        <Sparkles size={16} className="text-accent shrink-0" />
        <p className="text-[12.5px] text-gray-600">
          Nove lekcije se dodaju <span className="font-semibold text-gray-900">svake nedelje</span> — prati da ne
          propustiš sledeću.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 mb-10">
        {KATEGORIJE.map((kat) => {
          const snimljeno = kat.lekcije.filter(imaVideo).length;
          return (
            <Link
              key={kat.slug}
              href={`/edukacija/${kat.slug}`}
              className="rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-accent/30 hover:shadow-[0_8px_22px_rgba(81,112,255,0.08)] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[20px]">{kat.emoji}</span>
                <p className="text-[14.5px] font-semibold text-gray-900">{kat.naziv}</p>
              </div>
              <p className="text-[12.5px] text-gray-400 leading-relaxed mb-2">{kat.opis}</p>
              <p className="text-[11.5px] font-medium text-accent">
                {snimljeno > 0
                  ? `${snimljeno} od ${kat.lekcije.length} lekcija dostupno`
                  : `${kat.lekcije.length} lekcija u pripremi`}
              </p>
            </Link>
          );
        })}
      </div>

      <div
        className="rounded-[28px] p-7 md:p-9 text-center"
        style={{ background: "#050506" }}
      >
        <div className="h-11 w-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto mb-4">
          <BookOpen size={19} />
        </div>
        <h2 className="text-[19px] font-bold text-white tracking-tight mb-2">Želiš pun pristup i lični plan?</h2>
        <p className="text-[13px] text-white/50 mb-6 max-w-xs mx-auto">
          Kao klijent dobijaš pristup celoj biblioteci lekcija u svom portalu, plus individualni plan i nedeljno
          praćenje napretka.
        </p>
        <Link
          href="/coaching"
          className="inline-flex items-center gap-2 h-[48px] px-6 rounded-2xl text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98]"
          style={{ background: ACCENT }}
        >
          Pogledaj pakete <ArrowRight size={15} />
        </Link>
        <p className="text-[12px] text-white/30 mt-4">
          Već si klijent?{" "}
          <Link href="/prijava" className="underline text-white/50">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}
