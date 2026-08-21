"use client";

import { FileText, Download } from "lucide-react";

// 👉 KAKO DA DODAŠ PRAVI PDF (detaljno objašnjeno u README.md):
// 1. Otpremi PDF u public/dokumenti/ folder (preko GitHub sajta: taj folder
//    → "Add file" → "Upload files" → prevuci PDF → Commit).
// 2. Ovde dodaj red sa "url" koji vodi na taj fajl, npr:
//    { naziv: "Vodič za merenje obima tela", tip: "PDF", url: "/dokumenti/vodic-merenje.pdf" }
const DOCS = [
  { naziv: "Vodič za mršavljenje", tip: "PDF", url: "/dokumenti/ebook-mrsavljenje.pdf" },
  { naziv: "Zbirka zdravih recepata", tip: "PDF", url: "/dokumenti/ebook-recepti.pdf" },
  { naziv: "Vodič za tehniku treninga", tip: "PDF", url: "/dokumenti/ebook-trening-vodic.pdf" },
];

export default function DokumentiPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Dokumenti</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Materijali za preuzimanje</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">PDF-ovi, recepti i vodiči koje ti je trener podelio.</p>

      <div className="space-y-2.5">
        {DOCS.map((d) => {
          const dostupno = d.url && d.url !== "#";
          const Wrapper = dostupno ? "a" : "div";
          return (
            <Wrapper
              key={d.naziv}
              {...(dostupno ? { href: d.url, target: "_blank", rel: "noopener noreferrer" } : {})}
              className={
                "flex items-center gap-3.5 rounded-2xl border p-4 transition-all duration-200 " +
                (dostupno
                  ? "border-gray-100 hover:border-accent/30 active:scale-[0.98]"
                  : "border-dashed border-gray-200 opacity-60")
              }
            >
              <div className="h-10 w-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
                <FileText size={17} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-gray-900">{d.naziv}</p>
                <p className="text-[12px] text-gray-400">{dostupno ? d.tip : "Uskoro dostupno"}</p>
              </div>
              {dostupno && <Download size={16} className="text-gray-300 shrink-0" />}
            </Wrapper>
          );
        })}
      </div>
      <p className="text-[12px] text-gray-350 mt-6">Dodajem materijale postepeno — javi mi ako ti nešto konkretno treba pre nego što stigne ovde.</p>
    </div>
  );
}
