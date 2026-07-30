import { Salad, Flame } from "lucide-react";

// 👉 Kad budeš imao/la konkretan plan ishrane za klijenta, samo dodaj
// nove objekte u ovaj niz — kartice se generišu automatski.
const MEALS = [
  {
    naziv: "Doručak",
    opis: "Ovsena kaša sa voćem i orasima, ili omlet od 3 jaja sa povrćem.",
    kalorije: "~450 kcal",
  },
  {
    naziv: "Ručak",
    opis: "150g piletine/ribe, 150g pirinča ili krompira, salata po želji.",
    kalorije: "~650 kcal",
  },
  {
    naziv: "Užina",
    opis: "Grčki jogurt sa medom i bademima, ili proteinski šejk.",
    kalorije: "~250 kcal",
  },
  {
    naziv: "Večera",
    opis: "150g nemasnog mesa ili tofua, povrće na pari ili salata.",
    kalorije: "~500 kcal",
  },
];

export default function IshranaPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Plan ishrane</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Tvoj nedeljni plan</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Orijentacioni raspored obroka. Trener ga prilagođava tvom napretku.</p>

      <div className="space-y-3">
        {MEALS.map((m) => (
          <div key={m.naziv} className="rounded-2xl border border-gray-100 p-4 flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
              <Salad size={17} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[14.5px] font-semibold text-gray-900">{m.naziv}</p>
                <span className="text-[11.5px] font-medium text-gray-400 flex items-center gap-1">
                  <Flame size={11} /> {m.kalorije}
                </span>
              </div>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{m.opis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
