"use client";

import { useState } from "react";
import { PlayCircle, BookOpen, X } from "lucide-react";
import { useIgUnlocked, IgGate } from "@/components/IgGate";

// 👉 Dodaj svoje lekcije ovde. "link" može biti:
//   - YouTube link (npr. https://youtu.be/XXXXXXXXXXX ili
//     https://www.youtube.com/watch?v=XXXXXXXXXXX) — automatski se
//     prikazuje kao ugrađeni video plejer unutar aplikacije.
//   - Bilo koji drugi URL (članak, Google Drive PDF...) — otvara se
//     u novom tabu.
const LEKCIJE = [
  { naslov: "Kako pravilno raditi čučanj", kategorija: "Tehnika", link: "https://youtu.be/dQw4w9WgXcQ" },
  { naslov: "Zašto je san ključan za napredak", kategorija: "Regeneracija", link: "https://youtu.be/dQw4w9WgXcQ" },
  { naslov: "Osnove flexible dieting-a", kategorija: "Ishrana", link: "https://youtu.be/dQw4w9WgXcQ" },
  { naslov: "Progresivno preopterećenje objašnjeno", kategorija: "Trening", link: "https://youtu.be/dQw4w9WgXcQ" },
];

function getYouTubeId(url = "") {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function EdukacijaPage() {
  const { unlocked, checked, unlock } = useIgUnlocked();
  const [open, setOpen] = useState(null);

  if (!checked) return null;
  if (!unlocked) return <IgGate onUnlock={unlock} />;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Edukacija</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Lekcije i saveti</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Kratki video i tekstualni materijali koji ti pomažu da napreduješ pametnije.</p>

      <div className="grid gap-3 md:grid-cols-2">
        {LEKCIJE.map((l) => {
          const ytId = getYouTubeId(l.link);
          const isOpen = open === l.naslov;
          return (
            <div key={l.naslov} className="rounded-2xl border border-gray-100 overflow-hidden">
              {isOpen && ytId ? (
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    title={l.naslov}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <button
                    onClick={() => setOpen(null)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => (ytId ? setOpen(l.naslov) : window.open(l.link, "_blank"))}
                  className="w-full text-left p-4 transition-all duration-200 hover:border-accent/30 active:scale-[0.98]"
                >
                  <div className="h-28 rounded-xl bg-accent/6 flex items-center justify-center mb-3">
                    <PlayCircle size={28} className="text-accent" />
                  </div>
                  <p className="text-[11px] font-semibold text-accent uppercase tracking-wide mb-1">{l.kategorija}</p>
                  <p className="text-[14px] font-semibold text-gray-900 leading-snug">{l.naslov}</p>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-gray-50/70 p-4 mt-6 flex items-center gap-3">
        <BookOpen size={17} className="text-gray-400 shrink-0" />
        <p className="text-[12.5px] text-gray-500">Nove lekcije se dodaju redovno — proveri ponovo uskoro.</p>
      </div>
    </div>
  );
}
