"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// 👉 Dodaj nova pitanja/odgovore ovde po potrebi.
const FAQ_ITEMS = [
  { q: "Kada treba da pošaljem nedeljni check-in?", a: "Idealno istog dana svake nedelje, npr. svake nedelje ujutru, da bismo imali doslednu istoriju napretka." },
  { q: "Šta ako propustim trening?", a: "Nije kraj sveta — samo to napiši u check-inu pod 'Šta ti je bilo najteže', pa prilagođavamo plan." },
  { q: "Kako se mere obimi tela?", a: "Krojačkim metrom, ujutru na prazan stomak, uvek na istim tačkama. Detaljno uputstvo dobijaš od trenera." },
  { q: "Da li moram da šaljem fotografije svake nedelje?", a: "Preporučeno je, ali ako preskočiš jednu nedelju nije problem — samo nastavi sledeće nedelje." },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">FAQ</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Često postavljana pitanja</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Odgovori na najčešće nedoumice klijenata.</p>

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
