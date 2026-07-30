import { PlayCircle, BookOpen } from "lucide-react";

// 👉 Dodaj svoje lekcije/video sadržaje ovde. "link" može biti YouTube,
// Vimeo ili bilo koji URL — kad ga imaš, samo ga upiši.
const LEKCIJE = [
  { naslov: "Kako pravilno raditi čučanj", kategorija: "Tehnika", link: "#" },
  { naslov: "Zašto je san ključan za napredak", kategorija: "Regeneracija", link: "#" },
  { naslov: "Osnove flexible dieting-a", kategorija: "Ishrana", link: "#" },
  { naslov: "Progresivno preopterećenje objašnjeno", kategorija: "Trening", link: "#" },
];

export default function EdukacijaPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Edukacija</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Lekcije i saveti</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Kratki video i tekstualni materijali koji ti pomažu da napreduješ pametnije.</p>

      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible">
        {LEKCIJE.map((l) => (
          <a
            key={l.naslov}
            href={l.link}
            className="min-w-[220px] md:min-w-0 rounded-2xl border border-gray-100 p-4 shrink-0 transition-all duration-200 hover:border-accent/30 active:scale-[0.98]"
          >
            <div className="h-28 rounded-xl bg-accent/6 flex items-center justify-center mb-3">
              <PlayCircle size={28} className="text-accent" />
            </div>
            <p className="text-[11px] font-semibold text-accent uppercase tracking-wide mb-1">{l.kategorija}</p>
            <p className="text-[14px] font-semibold text-gray-900 leading-snug">{l.naslov}</p>
          </a>
        ))}
      </div>

      <div className="rounded-2xl bg-gray-50/70 p-4 mt-6 flex items-center gap-3">
        <BookOpen size={17} className="text-gray-400 shrink-0" />
        <p className="text-[12.5px] text-gray-500">Nove lekcije se dodaju redovno — proveri ponovo uskoro.</p>
      </div>
    </div>
  );
}
