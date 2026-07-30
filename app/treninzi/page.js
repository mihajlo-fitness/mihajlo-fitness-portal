import { Dumbbell } from "lucide-react";

// 👉 Dodaj svoje treninge ovde — po danu u nedelji.
const WORKOUTS = [
  { dan: "Ponedeljak", fokus: "Gornji deo tela", vezbe: ["Bench press 4x8", "Zavlačenje šipke 4x8", "Ramena mašina 3x12", "Biceps/triceps 3x12"] },
  { dan: "Sreda", fokus: "Donji deo tela", vezbe: ["Čučanj 4x8", "Rumunski mrtvo dizanje 4x10", "Iskoraci 3x12", "Listovi 4x15"] },
  { dan: "Petak", fokus: "Full body / kondicija", vezbe: ["Mrtvo dizanje 4x6", "Veslanje 3x10", "Sklekovi 3x15", "Core kompleks 3 kruga"] },
];

export default function TreninziPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Plan treninga</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Ova nedelja</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Tri treninga nedeljno, prilagođena tvom cilju i iskustvu.</p>

      <div className="space-y-4">
        {WORKOUTS.map((w) => (
          <div key={w.dan} className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white bg-accent shrink-0">
                <Dumbbell size={17} />
              </div>
              <div>
                <p className="text-[14.5px] font-semibold text-gray-900">{w.dan}</p>
                <p className="text-[12.5px] text-gray-400">{w.fokus}</p>
              </div>
            </div>
            <ul className="space-y-1.5 pl-1">
              {w.vezbe.map((v) => (
                <li key={v} className="text-[13.5px] text-gray-600 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gray-300 shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
