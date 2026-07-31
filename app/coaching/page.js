"use client";

import { useState } from "react";
import { Salad, Dumbbell, Star, Crown, Check, Send } from "lucide-react";
import { Field, TextInput, TextArea, ACCENT } from "@/components/ui";
import { storageSet } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";
import { slugify } from "@/lib/helpers";

// 👉 Kad menjaš cene ili opis paketa, sve se menja ovde na jednom mestu.
const PAKETI = [
  {
    id: "ishrana",
    naziv: "Plan ishrane",
    cena: "2.500 RSD",
    period: "jednokratno",
    icon: Salad,
    stavke: [
      "Individualni plan ishrane prema tvom cilju",
      "Izračunate kalorije i makronutrijenti",
      "Zamene za namirnice",
      "PDF plan koji ostaje zauvek",
    ],
  },
  {
    id: "trening",
    naziv: "Plan treninga",
    cena: "2.500 RSD",
    period: "jednokratno",
    icon: Dumbbell,
    stavke: [
      "Individualni plan treninga prema tvom cilju",
      "Broj serija i ponavljanja",
      "Video objašnjenja vežbi",
      "PDF plan koji ostaje zauvek",
    ],
  },
  {
    id: "standard",
    naziv: "Online Coaching Standard",
    cena: "7.000 RSD",
    period: "mesečno",
    icon: Star,
    istaknuto: true,
    stavke: [
      "Individualni plan treninga",
      "Individualni plan ishrane",
      "Nedeljna provera napretka",
      "Korekcije plana po potrebi",
      "Podrška putem WhatsApp-a",
    ],
  },
  {
    id: "premium",
    naziv: "Online Coaching Premium",
    cena: "10.000 RSD",
    period: "mesečno",
    icon: Crown,
    stavke: [
      "Sve iz Standard paketa",
      "Neograničena podrška putem WhatsApp-a",
      "Prioritetni odgovori",
      "Detaljna analiza forme i tehnike putem video snimaka",
      "Češće izmene plana po potrebi",
      "Individualni pristup tokom cele saradnje",
    ],
  },
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
          Javiću ti se uskoro na dogovoreni kontakt da se dogovorimo oko plaćanja i detalja.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Paketi</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Izaberi svoj coaching</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">
        Izaberi paket koji ti odgovara, pošalji zahtev, a ja ti se javljam da dogovorimo detalje i plaćanje.
      </p>

      <div className="grid gap-3 md:grid-cols-2 mb-8">
        {PAKETI.map((p) => {
          const Icon = p.icon;
          const active = odabran === p.id;
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
              </div>
              <p className="text-[15px] font-semibold text-gray-900">{p.naziv}</p>
              <p className="text-[13px] text-gray-400 mb-3">
                <span className="text-[16px] font-bold text-gray-900">{p.cena}</span> / {p.period}
              </p>
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
    </div>
  );
}
