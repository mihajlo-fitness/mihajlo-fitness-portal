"use client";

import { FileText, Download } from "lucide-react";
import { useIgUnlocked, IgGate } from "@/components/IgGate";

// 👉 KAKO DA DODAŠ PRAVI PDF (detaljno objašnjeno u README.md):
// 1. Otpremi PDF u public/dokumenti/ folder (preko GitHub sajta: taj folder
//    → "Add file" → "Upload files" → prevuci PDF → Commit).
// 2. Ovde dodaj red sa "url" koji vodi na taj fajl, npr:
//    { naziv: "Vodič za merenje obima tela", tip: "PDF", url: "/dokumenti/vodic-merenje.pdf" }
const DOCS = [
  { naziv: "Zbirka zdravih recepata", tip: "PDF", url: "/dokumenti/ebook-recepti.pdf" },
  { naziv: "Vodič za mršavljenje", tip: "PDF", url: "/dokumenti/ebook-mrsavljenje.pdf" },
  { naziv: "Vodič za trening", tip: "PDF", url: "/dokumenti/ebook-trening-vodic.pdf" },
];

export default function DokumentiPage() {
  const { unlocked, checked, unlock } = useIgUnlocked();

  if (!checked) return null;
  if (!unlocked) return <IgGate onUnlock={unlock} />;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Dokumenti</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Materijali za preuzimanje</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">PDF-ovi, recepti i vodiči koje ti je trener podelio.</p>

      <div className="space-y-2.5">
        {DOCS.map((d) => (
          <a
            key={d.naziv}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl border border-gray-100 p-4 transition-all duration-200 hover:border-accent/30 active:scale-[0.98]"
          >
            <div className="h-10 w-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
              <FileText size={17} />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-gray-900">{d.naziv}</p>
              <p className="text-[12px] text-gray-400">{d.tip}</p>
            </div>
            <Download size={16} className="text-gray-300 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
