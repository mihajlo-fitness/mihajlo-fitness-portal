"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, TrendingUp, BookOpen, MessageCircle, Heart, ClipboardList } from "lucide-react";
import { storageGet, storageList } from "@/lib/storage";
import { formatDateSr } from "@/lib/helpers";
import { ACCENT } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useEduProgress } from "@/lib/progress";

const DAN_MS = 24 * 60 * 60 * 1000;

export default function PortalDashboard() {
  const { user, profile, ready } = useAuth();
  const { ready: progressReady, lastWatched } = useEduProgress();
  const [lastCheckin, setLastCheckin] = useState(undefined);
  const [feedback, setFeedback] = useState(null);
  const [plan, setPlan] = useState(undefined);
  const [hasOnboarded, setHasOnboarded] = useState(undefined); // undefined = loading, true/false = known

  useEffect(() => {
    if (!ready || !user) return;
    (async () => {
      const client = await storageGet(`client:${user.id}`);
      setHasOnboarded(!!client);
      const keys = await storageList(`checkin:${user.id}:`);
      if (keys.length === 0) {
        setLastCheckin(null);
      } else {
        const timestamps = keys.map((k) => Number(k.split(":")[2])).sort((a, b) => b - a);
        setLastCheckin(timestamps[0]);
      }
      const fb = await storageGet(`feedback:${user.id}`);
      setFeedback(fb);
      const p = await storageGet(`plan:${user.id}`);
      setPlan(p || null);
    })();
  }, [ready, user]);

  const nastaviLekcija = progressReady ? lastWatched() : null;
  const danaOdCheckina = lastCheckin ? Math.floor((Date.now() - lastCheckin) / DAN_MS) : null;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Tvoj prostor</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-8">
        {profile?.ime ? `Zdravo, ${profile.ime} 👋` : "Zdravo 👋"}
      </h1>

      {/* Ako klijent JOŠ NIJE popunio početni upitnik, to je jedina stvar
          koju treba da uradi — istaknuto na vrhu, umesto check-in kartice
          koja mu ionako ništa ne znači dok upitnik nije popunjen. */}
      {hasOnboarded === false && (
        <Link
          href="/onboarding"
          className="block rounded-3xl p-5 mb-4 transition-transform active:scale-[0.98]"
          style={{ background: ACCENT }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white/70 uppercase tracking-wide mb-1">Prvi korak</p>
              <p className="text-[16px] font-bold text-white">Popuni početni upitnik</p>
              <p className="text-[12.5px] text-white/70 mt-0.5">Traje oko 3 minuta — samo jednom</p>
            </div>
            <ClipboardList size={22} className="text-white/80 shrink-0" />
          </div>
        </Link>
      )}

      {/* Status sledećeg check-ina — najistaknutije, prvo pitanje "šta danas treba da uradim" */}
      {hasOnboarded && (
        <Link
          href="/checkin"
          className="block rounded-3xl p-5 mb-4 transition-transform active:scale-[0.98]"
          style={{ background: ACCENT }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white/70 uppercase tracking-wide mb-1">
                {danaOdCheckina === null ? "Nedeljni check-in" : danaOdCheckina >= 7 ? "Check-in je na redu" : "Sledeći check-in"}
              </p>
              <p className="text-[16px] font-bold text-white">
                {lastCheckin === null && "Popuni svoj prvi check-in"}
                {lastCheckin === undefined && "Učitavanje..."}
                {typeof lastCheckin === "number" &&
                  (danaOdCheckina >= 7
                    ? "Vreme je za novi check-in"
                    : `Poslednji check-in pre ${danaOdCheckina}${danaOdCheckina === 1 ? " dan" : " dana"}`)}
              </p>
            </div>
            <ClipboardCheck size={22} className="text-white/80 shrink-0" />
          </div>
        </Link>
      )}

      {/* Poslednji feedback trenera — pretvara portal iz formulara u razgovor */}
      {feedback?.tekst && (
        <div className="rounded-2xl border border-accent/15 bg-accent/[0.03] p-4 mb-4">
          <p className="text-[11.5px] font-semibold text-accent uppercase tracking-wide mb-1.5">Poslednji feedback trenera</p>
          <p className="text-[13.5px] text-gray-700 leading-relaxed">{feedback.tekst}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link href="/moj-plan" className="rounded-2xl border border-gray-100 p-4 hover:border-accent/30 transition-colors">
          <Heart size={18} className="text-accent mb-2" />
          <p className="text-[13.5px] font-semibold text-gray-900 mb-0.5">Moj plan</p>
          <p className="text-[11.5px] text-gray-400">{plan === undefined ? "..." : plan ? "Spreman" : "Priprema se"}</p>
        </Link>
        <Link href="/napredak" className="rounded-2xl border border-gray-100 p-4 hover:border-accent/30 transition-colors">
          <TrendingUp size={18} className="text-accent mb-2" />
          <p className="text-[13.5px] font-semibold text-gray-900 mb-0.5">Napredak</p>
          <p className="text-[11.5px] text-gray-400">Vidi istoriju</p>
        </Link>
      </div>

      {nastaviLekcija && (
        <Link
          href={`/app/edukacija/${nastaviLekcija.katSlug}/${nastaviLekcija.lekSlug}`}
          className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4 mb-4 hover:border-accent/30 transition-colors"
        >
          <div className="h-9 w-9 rounded-lg bg-accent/8 text-accent flex items-center justify-center shrink-0">
            <BookOpen size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900">Nastavi edukaciju</p>
            <p className="text-[11.5px] text-gray-400">Tamo gde si stao/la</p>
          </div>
          <ArrowRight size={15} className="text-gray-300 shrink-0" />
        </Link>
      )}

      <Link href="/app/kontakt" className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4 hover:border-accent/30 transition-colors">
        <div className="h-9 w-9 rounded-lg bg-accent/8 text-accent flex items-center justify-center shrink-0">
          <MessageCircle size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900">Imaš pitanje?</p>
          <p className="text-[11.5px] text-gray-400">Javi mi se direktno</p>
        </div>
        <ArrowRight size={15} className="text-gray-300 shrink-0" />
      </Link>
    </div>
  );
}
