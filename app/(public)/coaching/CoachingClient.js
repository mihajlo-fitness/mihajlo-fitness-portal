"use client";

import { useState } from "react";
import { Send, Check, MessageCircle, FileText, ClipboardCheck } from "lucide-react";
import { Field, TextInput, TextArea, ACCENT } from "@/components/ui";
import { storageSet } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";
import { slugify } from "@/lib/helpers";
import { PAKETI } from "@/lib/paketi";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const KORACI = [
  { icon: MessageCircle, naslov: "Pošalješ zahtev", trajanje: "~2 min", opis: "Biraš paket ispod, javljam ti se lično u roku od 24h da dogovorimo detalje i plaćanje." },
  { icon: FileText, naslov: "Popuniš upitnik", trajanje: "~5 min", opis: "Dobijaš pristup portalu (samo email, bez lozinke) i popunjavaš početni upitnik — cilj, iskustvo, ograničenja." },
  { icon: ClipboardCheck, naslov: "Dobijaš plan i pratimo napredak", trajanje: "Nedeljno", opis: "Tvoj lični plan stiže za 24-48h. Zatim ide nedeljni check-in i korekcije po potrebi." },
];

const PRIGOVORI = [
  { q: "Skupo mi je.", a: "Razumem. Zato postoje i jednokratni planovi (2.500 RSD) ako želiš da prvo probaš kako radim, bez mesečne obaveze." },
  { q: "Nisam siguran/na da li stvarno radi.", a: "Ne mogu da garantujem tačan rezultat — ali mogu da garantujem pažljivo praćenje i plan prilagođen tebi, ne kopiju tuđeg." },
  { q: "Početnik/ca sam, ne znam ni osnove.", a: "Većina klijenata kreće bez iskustva. Plan i objašnjenja su prilagođeni tvom nivou, ne pretpostavljam da već znaš tehniku." },
  { q: "Nemam savršene uslove (teretana, oprema).", a: "Reci mi u upitniku šta imaš na raspolaganju — plan se pravi za tvoje stvarne uslove, ne za idealne." },
];

export default function CoachingPage() {
  const [odabran, setOdabran] = useState(null);
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const paket = PAKETI.find((p) => p.id === odabran);

  const handleSubmit = async () => {
    setSubmitting(true);
    const slug = slugify(ime) || "klijent";
    await storageSet(`zahtev:${slug}:${Date.now()}`, {
      ime,
      paket: paket?.naziv,
      cena: paket ? `${paket.cena} / ${paket.period}` : null,
      poruka,
      timestamp: Date.now(),
    });
    notifyCoach(
      `Novi zahtev za paket: ${paket?.naziv}`,
      `${ime} želi paket "${paket?.naziv}" (${paket?.cena} / ${paket?.period}).\n\nNapomena: ${poruka || "—"}\n\nJavi se klijentu oko plaćanja i detalja.`
    );
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-md mx-auto px-8 text-center animate-fade-in">
        <div
          className="h-16 w-16 rounded-3xl flex items-center justify-center text-white mb-7"
          style={{ background: ACCENT, boxShadow: "0 14px 30px rgba(81,112,255,0.35)" }}
        >
          <Check size={28} strokeWidth={2.5} />
        </div>
        <h2 className="text-[22px] font-bold text-gray-900 tracking-tight mb-3">Zahtev je poslat!</h2>
        <p className="text-[15px] text-gray-400 leading-relaxed max-w-xs">
          Javljam se u roku od 24h da dogovorimo plaćanje i sledeći korak — bez ugovora, mesec po mesec.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <div className="mb-10 max-w-[220px] md:max-w-[260px]">
        <BeforeAfterSlider badge="-25 KG" />
      </div>

      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Paketi</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Izaberi svoj coaching</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">
        Izaberi paket koji ti odgovara, pošalji zahtev, a ja ti se javljam da dogovorimo detalje i plaćanje.
      </p>

      <div
        className="rounded-[28px] mb-10 relative overflow-hidden grid md:grid-cols-[1fr_240px]"
        style={{ background: "#050506" }}
      >
        <div
          className="absolute -top-24 -right-24 w-[260px] h-[260px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563eb2e 0%, transparent 70%)" }}
        />
        <div className="relative p-6 md:p-8 order-2 md:order-1">
          <p className="text-[11.5px] font-bold tracking-[3px] uppercase mb-4" style={{ color: "#5b8dff" }}>
            Kako izgleda saradnja
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {KORACI.map((k, i) => {
              const Icon = k.icon;
              return (
                <div key={k.naslov} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px] font-bold text-white/10 leading-none">{String(i + 1).padStart(2, "0")}</span>
                      <Icon size={15} className="text-accent" />
                    </div>
                    <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wide">{k.trajanje}</span>
                  </div>
                  <p className="text-[13.5px] font-semibold text-white mb-0.5">{k.naslov}</p>
                  <p className="text-[12px] text-white/40 leading-relaxed">{k.opis}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative order-1 md:order-2 h-[180px] md:h-auto">
          <img src="/mihajlo-hero.jpg" alt="Mihajlo u treningu" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #050506 0%, transparent 30%), linear-gradient(90deg, #050506 0%, transparent 25%)",
            }}
          />
        </div>
      </div>

      <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5 max-w-lg">
        Jednokratan plan ti daje početnu tačku. Coaching ti daje nekog ko tu tačku prilagođava iz nedelje u
        nedelju — kad telo prestane da reaguje na isti plan, tu je i korekcija.
      </p>

      <div className="grid gap-3 md:grid-cols-2 mb-8">
        {PAKETI.map((p) => {
          const Icon = p.icon;
          const active = odabran === p.id;
          const isPremium = p.id === "premium";
          return (
            <button
              key={p.id}
              onClick={() => setOdabran(p.id)}
              className={
                "text-left rounded-3xl border p-5 transition-all duration-200 active:scale-[0.98] " +
                (active
                  ? "border-accent bg-accent/5 shadow-[0_8px_24px_rgba(81,112,255,0.12)]"
                  : "border-gray-100 hover:border-accent/30")
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div className={"h-10 w-10 rounded-xl flex items-center justify-center shrink-0 " + (active ? "bg-accent text-white" : "bg-accent/8 text-accent")}>
                  <Icon size={18} />
                </div>
                {p.istaknuto && (
                  <span className="text-[10.5px] font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Najpopularnije</span>
                )}
                {isPremium && (
                  <span className="text-[10.5px] font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Najviši nivo</span>
                )}
              </div>
              <p className="text-[15px] font-semibold text-gray-900">{p.naziv}</p>
              <p className="text-[13px] text-gray-400 mb-1">
                <span className="text-[16px] font-bold text-gray-900">{p.cena}</span> / {p.period}
              </p>
              {p.period === "mesečno" && (
                <p className="text-[11px] font-medium text-accent mb-2">Mesec po mesec — bez ugovora.</p>
              )}
              {p.zaKoga && <p className="text-[11.5px] text-gray-400 italic mb-3">{p.zaKoga}</p>}
              <ul className="space-y-1.5">
                {p.stavke.map((s) => (
                  <li key={s} className="text-[12.5px] text-gray-500 flex items-start gap-1.5">
                    <Check size={13} className="text-accent shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {odabran && (
        <div className="rounded-3xl border border-gray-100 p-5 animate-slide-up">
          <p className="text-[14.5px] font-semibold text-gray-900 mb-1">Pošalji zahtev — {paket.naziv}</p>
          <p className="text-[12.5px] text-gray-400 mb-5">Javljam ti se čim vidim zahtev, obično isti ili sledeći dan.</p>

          <Field label="Ime i prezime">
            <TextInput value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Tvoje ime" />
          </Field>
          <Field label="Napomena / cilj (opciono)">
            <TextArea rows={3} value={poruka} onChange={(e) => setPoruka(e.target.value)} placeholder="Npr. želim da smršam 5kg do leta..." />
          </Field>

          <button
            onClick={handleSubmit}
            disabled={!ime.trim() || submitting}
            className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            style={{ background: ACCENT }}
          >
            {submitting ? "Slanje..." : "Pošalji zahtev"} <Send size={16} />
          </button>
        </div>
      )}

      <div className="mt-10">
        <p className="text-[12.5px] font-semibold text-gray-500 mb-3">Najčešće nedoumice</p>
        <div className="space-y-2">
          {PRIGOVORI.map((p) => (
            <div key={p.q} className="rounded-2xl bg-gray-50/70 p-4">
              <p className="text-[13.5px] font-medium text-gray-800 mb-1">{p.q}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{p.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
