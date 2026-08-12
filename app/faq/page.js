"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// 👉 Dodaj/izmeni pitanja ovde. Namerno kratka lista — samo ono što
// klijenti stvarno najčešće pitaju, ne enciklopedija.
const FAQ_ITEMS = [
  { q: "Šta je ovaj portal i za koga je namenjen?", a: "Ovo je klijentski portal Mihajlo Fitness Coach-a — mesto gde popunjavaš nedeljni check-in, pratiš napredak, dobijaš lični plan i imaš pristup besplatnoj edukaciji." },
  { q: "Da li moram da platim da bih koristio portal?", a: "Ne — check-in, fitness kalkulator i edukacija su besplatni. Plaćaš samo ako izabereš neki od coaching paketa." },
  { q: "Koji paketi su dostupni?", a: "Plan ishrane i Plan treninga (jednokratno, 2.500 RSD), i mesečni Online Coaching u dve varijante — Standard (7.000 RSD) i Premium (10.000 RSD). Detalji su na stranici Paketi & Coaching." },
  { q: "Kako se plaća i da li ima obaveze na duži period?", a: "Pošalješ zahtev kroz portal, javljam ti se lično da dogovorimo detalje. Mesečni coaching ide mesec po mesec, bez ugovora koji te vezuje." },
  { q: "Kada treba da pošaljem nedeljni check-in?", a: "Idealno istog dana svake nedelje, da bismo imali doslednu istoriju napretka. Ako propustiš nedelju, nije kraj sveta — samo nastavi sledeću." },
  { q: "Šta se dešava odmah posle prijave za paket?", a: "Javljam ti se lično da dogovorimo detalje i plaćanje, zatim dobijaš pristup portalu i popunjavaš početni upitnik da mogu da napravim tvoj plan." },
  { q: "Koliko brzo dobijam svoj plan?", a: "Obično u roku od 24-48h od popunjenog početnog upitnika." },
  { q: "Koliko brzo mogu da očekujem rezultate?", a: "Zavisi od cilja, ali realno prve promene (energija, snaga, san) se osete za 2-3 nedelje, vidljive fizičke promene obično za 6-8 nedelja doslednog rada." },
  { q: "Da li mi garantujete rezultat?", a: "Ne mogu iskreno da garantujem tačan broj kilograma ili vremenski rok — to zavisi i od tvoje doslednosti. Ono što mogu da garantujem je pažljivo praćenje i plan prilagođen tebi." },
  { q: "Ko vidi moje podatke i fotografije?", a: "Samo ja, kao tvoj trener. Trenerski deo portala je zaštićen lozinkom koju samo ja znam, i ništa se ne deli javno bez tvoje dozvole." },
  { q: "Da li ćete objaviti moje rezultate na Instagramu?", a: "Nikad bez pitanja — objave transformacija klijenata idu isključivo uz tvoju izričitu dozvolu, i uvek te pitam unapred." },
  { q: "Šta ako imam pitanje između check-inova?", a: "Kontakt stranica postoji tačno za to — ne moraš da čekaš sledeći nedeljni check-in da mi nešto javiš." },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">FAQ</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Često postavljana pitanja</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Odgovori na ono što klijenti najčešće pitaju.</p>

      <div className="space-y-2.5">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-[14px] font-medium text-gray-900">{item.q}</span>
                <ChevronDown size={16} className={"text-gray-400 shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180" : "")} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 animate-slide-up">
                  <p className="text-[13.5px] text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
