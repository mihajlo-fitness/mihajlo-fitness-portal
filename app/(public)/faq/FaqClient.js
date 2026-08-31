"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// 👉 Dodaj/izmeni pitanja ovde. Namerno kratka lista — samo ono što
// klijenti stvarno najčešće pitaju, ne enciklopedija.
const FAQ_ITEMS = [
  { q: "Šta je Mihajlo Fitness Coach i za koga je namenjen?", a: "Online fitness coaching za ljude koji žele individualni plan treninga i ishrane sa stvarnim nedeljnim praćenjem, ne generički PDF. Radim sa početnicima i sa ljudima koji su već probali sve i nisu uspeli da održe rezultat." },
  { q: "Da li moram da platim da bih koristio kalkulator ili edukaciju?", a: "Ne — fitness kalkulator je uvek besplatan. Edukacija je besplatna za pratioce na Instagramu." },
  { q: "Koji paketi su dostupni?", a: "Plan ishrane i Plan treninga (jednokratno, 2.500 RSD), i mesečni Online Coaching u dve varijante — Standard (7.000 RSD) i Premium (10.000 RSD). Detalji su na stranici Paketi." },
  { q: "Kako se plaća i da li ima obaveze na duži period?", a: "Pošalješ zahtev sa stranice Paketi, javljam ti se lično da dogovorimo detalje. Mesečni coaching ide mesec po mesec, bez ugovora koji te vezuje." },
  { q: "Kada treba da pošaljem nedeljni check-in?", a: "Idealno istog dana svake nedelje, da bismo imali doslednu istoriju napretka. Ako propustiš nedelju, nije kraj sveta — samo nastavi sledeću." },
  { q: "Šta se dešava odmah posle prijave za paket?", a: "Javljam ti se lično da dogovorimo detalje i plaćanje. Zatim ti šaljem link za prijavu u portal (bez lozinke — samo email) i popunjavaš početni upitnik da mogu da napravim tvoj plan." },
  { q: "Koliko brzo dobijam svoj plan?", a: "Obično u roku od 24-48h od popunjenog početnog upitnika." },
  { q: "Koliko brzo mogu da očekujem rezultate?", a: "Zavisi od cilja, ali realno prve promene (energija, snaga, san) se osete za 2-3 nedelje, vidljive fizičke promene obično za 6-8 nedelja doslednog rada." },
  { q: "Da li mi garantujete rezultat?", a: "Ne mogu iskreno da garantujem tačan broj kilograma ili vremenski rok — to zavisi i od tvoje doslednosti. Ono što mogu da garantujem je pažljivo praćenje i plan prilagođen tebi." },
  { q: "Ko vidi moje podatke i fotografije?", a: "Samo ja, kao tvoj trener, i samo ti. Prijavljuješ se preko svog email-a (bez lozinke koju bi neko mogao da pogodi), a tvoji podaci i fotografije su tehnički vezani za tvoj nalog — niko drugi, uključujući ostale klijente, ne može da im pristupi." },
  { q: "Da li ćete objaviti moje rezultate na Instagramu?", a: "Nikad bez pitanja — objave transformacija klijenata idu isključivo uz tvoju izričitu dozvolu, i uvek te pitam unapred." },
  { q: "Šta ako kilaža stane (plato)?", a: "Tačno zato postoji nedeljni check-in — kad napredak stane, tu se pravi korekcija (kalorije, treninzi, ili oboje), umesto da se čeka da 'samo prođe' samo od sebe." },
  { q: "Da li se ishrana prilagođava mojim navikama i restrikcijama?", a: "Da — početni upitnik pita tačno to (alergije, namirnice koje ne jedeš, restrikcije poput vegan/keto), i plan se pravi oko toga, ne uopšteno." },
  { q: "Šta ako imam pitanje između check-inova?", a: "Kontakt stranica u portalu postoji tačno za to — ne moraš da čekaš sledeći nedeljni check-in da mi nešto javiš." },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <div
        className="rounded-[32px] p-6 md:p-12 relative overflow-hidden"
        style={{ background: "#050506" }}
      >
        <div
          className="absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563eb2e 0%, transparent 70%)" }}
        />
        <div className="relative">
          <p className="text-[12.5px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#5b8dff" }}>
            FAQ
          </p>
          <h1 className="text-[22px] md:text-[26px] font-bold text-white tracking-tight mb-1">Često postavljana pitanja</h1>
          <p className="text-[13.5px] text-white/40 mb-8">Odgovori na ono što klijenti najčešće pitaju.</p>

          <div className="space-y-2.5">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="text-[14px] font-medium text-white">{item.q}</span>
                    <ChevronDown size={16} className={"text-white/40 shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180" : "")} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 animate-slide-up">
                      <p className="text-[13.5px] text-white/50 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
