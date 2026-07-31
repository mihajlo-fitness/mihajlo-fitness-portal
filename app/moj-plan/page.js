"use client";

import { useState } from "react";
import { FileText, Search, Download } from "lucide-react";
import { Field, TextInput, ACCENT } from "@/components/ui";
import { storageGet } from "@/lib/storage";
import { slugify } from "@/lib/helpers";

export default function MojPlanPage() {
  const [ime, setIme] = useState("");
  const [plan, setPlan] = useState(undefined); // undefined = još nije traženo, null = nema plana
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ime.trim()) return;
    setLoading(true);
    const slug = slugify(ime);
    const val = await storageGet(`plan:${slug}`);
    setPlan(val || null);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Moj plan</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Tvoj lični plan</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Unesi svoje ime tačno kao u check-in formi da vidiš plan koji ti je trener okačio.</p>

      <Field label="Ime i prezime">
        <TextInput value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Npr. Ana Anić" onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
      </Field>
      <button
        onClick={handleSearch}
        disabled={!ime.trim() || loading}
        className="w-full h-[50px] rounded-2xl text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 mb-6 disabled:opacity-40"
        style={{ background: ACCENT }}
      >
        {loading ? "Tražim..." : "Prikaži moj plan"} <Search size={16} />
      </button>

      {plan === null && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center">
          <p className="text-[14px] text-gray-500 font-medium mb-1">Nema još okačenog plana</p>
          <p className="text-[13px] text-gray-400">Trener još nije dodao tvoj lični plan — javi mu se ako misliš da bi već trebalo da bude tu.</p>
        </div>
      )}

      {plan && (
        <div className="rounded-2xl border border-gray-100 p-5 animate-slide-up">
          {plan.link && (
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 mb-4 hover:border-accent/30"
            >
              <div className="h-9 w-9 rounded-lg bg-accent/8 text-accent flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <span className="text-[13.5px] font-medium text-gray-800 flex-1">Preuzmi svoj plan</span>
              <Download size={15} className="text-gray-300" />
            </a>
          )}
          {plan.tekst && <p className="text-[13.5px] text-gray-700 leading-relaxed whitespace-pre-line">{plan.tekst}</p>}
        </div>
      )}
    </div>
  );
}
