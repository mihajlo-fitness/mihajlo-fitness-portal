"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, FileText, ClipboardCheck, Calculator, Check } from "lucide-react";
import { ACCENT } from "@/components/ui";
import { PAKETI } from "@/lib/paketi";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const PROBLEMI = [
  "Treniraš redovno, ali vaga i ogledalo ne pokazuju rezultat",
  "Ne znaš tačno koliko i šta treba da jedeš za svoj cilj",
  "Već si nekoliko puta počinjao/la ispočetka i odustao/la",
  "Imaš plan, ali nema ko da ga prilagodi kad prestane da radi",
];

const KAKO_RADIM = [
  { icon: MessageCircle, naslov: "Upoznajemo se", opis: "Popuniš početni upitnik — cilj, iskustvo, ograničenja, navike." },
  { icon: FileText, naslov: "Praviš plan", opis: "Dobijaš individualni plan treninga i/ili ishrane, prilagođen tebi." },
  { icon: ClipboardCheck, naslov: "Pratimo napredak", opis: "Nedeljni check-in, feedback i korekcije — ne ostaješ sam/a sa planom." },
];

const FAQ_PREVIEW = [
  { q: "Koliko brzo dobijam svoj plan?", a: "Obično u roku od 24-48h od popunjenog početnog upitnika." },
  { q: "Da li ima obaveze na duži period?", a: "Ne — mesečni coaching ide mesec po mesec, bez ugovora koji te vezuje." },
  { q: "Šta ako sam početnik/ca?", a: "Većina klijenata kreće bez iskustva. Plan se prilagođava tvom nivou." },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[13px] font-bold tracking-[3px] uppercase mb-4" style={{ color: ACCENT }}>
              Online fitness coaching
            </p>
            <h1 className="text-[32px] md:text-[42px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Individualni trening i ishrana koji se stvarno drže.
            </h1>
            <p className="text-[15.5px] text-gray-500 leading-relaxed mb-8 max-w-md">
              Prošao sam kroz -25kg sopstvene transformacije, sa svim greškama usput. Danas taj sistem — plan,
              nedeljno praćenje, korekcije — koristim sa klijentima koji žele rezultat koji ostaje.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/coaching"
                className="h-[52px] px-6 rounded-2xl text-white font-semibold text-[14.5px] flex items-center gap-2 transition-all duration-200 active:scale-[0.98]"
                style={{ background: ACCENT, boxShadow: "0 14px 30px rgba(81,112,255,0.25)" }}
              >
                Pogledaj pakete <ArrowRight size={16} />
              </Link>
              <Link
                href="/kalkulator"
                className="h-[52px] px-6 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-[14.5px] flex items-center gap-2 hover:border-accent/30 transition-colors"
              >
                <Calculator size={16} /> Besplatan kalkulator
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[270px] h-[360px] md:w-[330px] md:h-[440px]">
              {/* Plavi akcentni panel iza — pomeren, ne rotiran (sigurniji, čist efekat dubine) */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-[32px]"
                style={{ background: ACCENT }}
              />
              {/* Glavna fotografija */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden border-[3px] border-black shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <img
                  src="/mihajlo-bg-flex.jpg"
                  alt="Mihajlo, sertifikovani fitness coach"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.4) 100%)" }}
                />
              </div>
              <div
                className="absolute -top-3 -left-3 h-[64px] w-[64px] rounded-2xl border-[3px] border-black flex items-center justify-center text-white font-bold text-[13px] shadow-lg"
                style={{ background: "#050506" }}
              >
                -25kg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREPOZNAJEŠ SE? — kratka sekcija problema, pre nego što pređemo na priču/rešenje */}
      <section className="max-w-5xl mx-auto px-6 pb-14 md:pb-20">
        <div className="grid sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
          {PROBLEMI.map((p) => (
            <div key={p} className="flex items-start gap-2.5 rounded-2xl border border-gray-100 px-4 py-3.5">
              <span className="text-[15px] leading-none mt-0.5">🤔</span>
              <p className="text-[13.5px] text-gray-600 leading-snug">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div
          className="rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          style={{ background: "#050506" }}
        >
          <div
            className="absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #2563eb33 0%, transparent 70%)" }}
          />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-[240px] mx-auto md:mx-0">
              <BeforeAfterSlider badge="-25 KG" />
            </div>
            <div>
              <p className="text-[12.5px] font-bold tracking-[3px] uppercase mb-3" style={{ color: "#2563eb" }}>
                Moja transformacija
              </p>
              <h2 className="text-[22px] md:text-[26px] font-bold text-white leading-tight mb-3">Nisam rođen fit.</h2>
              <p className="text-[14px] text-white/60 leading-relaxed mb-5">
                Godinama sam nosio višak kilograma i pokušavao pogrešno — dok nisam našao sistem koji stvarno
                traje. Danas pomažem klijentima da ne izgube godine tražeći ono što sam ja morao sam da otkrijem.
              </p>
              <Link href="/o-meni" className="text-[13.5px] font-semibold inline-flex items-center gap-1.5" style={{ color: "#60a5fa" }}>
                Pročitaj celu priču <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KAKO RADIM — tamna sekcija, prava fotografija sa strane (vidljiva, ne pozadina) */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div
          className="rounded-[32px] relative overflow-hidden grid md:grid-cols-[1fr_280px]"
          style={{ background: "#050506" }}
        >
          <div
            className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #2563eb2e 0%, transparent 70%)" }}
          />
          <div className="relative p-8 md:p-12 order-2 md:order-1">
            <p className="text-[12.5px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#5b8dff" }}>
              Proces
            </p>
            <h2 className="text-[22px] md:text-[26px] font-bold text-white tracking-tight mb-8">
              Sistem, ne PDF koji dobiješ i ostaneš sam/a
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
              {KAKO_RADIM.map((k, i) => {
                const Icon = k.icon;
                return (
                  <div key={k.naslov} className="flex items-start gap-3.5">
                    <span className="text-[22px] font-bold text-white/15 leading-none shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon size={14} className="text-accent" />
                        <p className="text-[14px] font-semibold text-white">{k.naslov}</p>
                      </div>
                      <p className="text-[12.5px] text-white/40 leading-relaxed">{k.opis}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative order-1 md:order-2 h-[220px] md:h-auto">
            <img src="/mihajlo-hero.jpg" alt="Mihajlo u treningu" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 md:bg-gradient-to-l"
              style={{
                background:
                  "linear-gradient(0deg, #050506 0%, transparent 30%), linear-gradient(90deg, #050506 0%, transparent 25%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* PAKETI PREVIEW */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Paketi</p>
            <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">Koliko košta saradnja</h2>
          </div>
          <Link href="/coaching" className="hidden md:flex text-[13.5px] font-semibold text-accent items-center gap-1">
            Svi detalji <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {PAKETI.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href="/coaching"
                className={
                  "rounded-2xl border p-4 transition-colors " +
                  (p.istaknuto ? "border-accent/40 bg-accent/[0.03]" : "border-gray-100 hover:border-accent/30")
                }
              >
                <div className="h-9 w-9 rounded-lg bg-accent/8 text-accent flex items-center justify-center mb-3">
                  <Icon size={16} />
                </div>
                <p className="text-[13.5px] font-semibold text-gray-900 leading-tight mb-1">{p.naziv}</p>
                <p className="text-[13px] text-gray-500">
                  <span className="font-bold text-gray-900">{p.cena}</span> / {p.period}
                </p>
              </Link>
            );
          })}
        </div>
        <Link href="/coaching" className="md:hidden mt-4 flex text-[13.5px] font-semibold text-accent items-center gap-1">
          Svi detalji <ArrowRight size={14} />
        </Link>
      </section>

      {/* KALKULATOR CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div className="rounded-[28px] border border-accent/15 bg-accent/[0.03] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[15px] font-semibold text-gray-900 mb-1">Ne znaš odakle da počneš?</p>
            <p className="text-[13.5px] text-gray-500">Saznaj svoje kalorije i makroe besplatno za 30 sekundi.</p>
          </div>
          <Link
            href="/kalkulator"
            className="h-[48px] px-6 rounded-2xl text-white font-semibold text-[14px] flex items-center gap-2 shrink-0 transition-all duration-200 active:scale-[0.98]"
            style={{ background: ACCENT }}
          >
            Otvori kalkulator <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* FAQ PREVIEW — ista tamna paleta kao "Kako radim" i puna FAQ strana, za doslednost */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div
          className="rounded-[32px] p-8 md:p-12 relative overflow-hidden"
          style={{ background: "#050506" }}
        >
          <div
            className="absolute -bottom-32 -right-32 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #2563eb2e 0%, transparent 70%)" }}
          />
          <div className="relative">
            <p className="text-[12.5px] font-bold tracking-[3px] uppercase mb-2 text-center" style={{ color: "#5b8dff" }}>
              FAQ
            </p>
            <h2 className="text-[22px] md:text-[24px] font-bold text-white tracking-tight mb-8 text-center">Najčešća pitanja</h2>
            <div className="max-w-2xl mx-auto space-y-2.5">
              {FAQ_PREVIEW.map((f) => (
                <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-[13.5px] font-medium text-white mb-1 flex items-start gap-2">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" /> {f.q}
                  </p>
                  <p className="text-[13px] text-white/40 leading-relaxed pl-[22px]">{f.a}</p>
                </div>
              ))}
            </div>
            <Link href="/faq" className="flex justify-center mt-5 text-[13.5px] font-semibold items-center gap-1" style={{ color: "#5b8dff" }}>
              Sva pitanja <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINALNI CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 md:pb-28">
        <div
          className="rounded-[28px] p-8 md:p-12 text-center"
          style={{ background: ACCENT }}
        >
          <h2 className="text-[22px] md:text-[26px] font-bold text-white tracking-tight mb-3">Spreman/na da počneš?</h2>
          <p className="text-[14px] text-white/80 mb-7 max-w-md mx-auto">
            Pošalji zahtev za paket koji ti odgovara — javljam se lično u roku od 24h.
          </p>
          <Link
            href="/coaching"
            className="inline-flex h-[50px] px-7 rounded-2xl bg-white text-gray-900 font-semibold text-[14.5px] items-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            Pošalji zahtev <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
