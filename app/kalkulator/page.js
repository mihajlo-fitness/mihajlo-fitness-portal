"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Flame, Target, Info, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Field, TextInput, ChipGroup, ACCENT } from "@/components/ui";
import {
  AKTIVNOST_OPCIJE,
  CILJ_OPCIJE,
  izracunajBMR,
  izracunajTDEE,
  preporuceneKalorije,
  izracunajMakroe,
  izracunajBMI,
  bmiKategorija,
  validirajUnos,
  SAVETI_PO_CILJU,
} from "@/lib/kalkulator";

const emptyForm = () => ({
  pol: "musko",
  godine: "",
  visina: "",
  tezina: "",
  aktivnost: "",
  cilj: "",
});

export default function KalkulatorPage() {
  const [data, setData] = useState(emptyForm());
  const [greska, setGreska] = useState(null);
  const [rezultat, setRezultat] = useState(null);

  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  const handleSubmit = () => {
    const validacija = validirajUnos(data);
    if (validacija) {
      setGreska(validacija);
      return;
    }
    if (!data.aktivnost) {
      setGreska("Izaberi nivo aktivnosti.");
      return;
    }
    if (!data.cilj) {
      setGreska("Izaberi svoj cilj.");
      return;
    }
    setGreska(null);

    const godine = Number(data.godine);
    const visina = Number(data.visina);
    const tezina = Number(data.tezina);

    const bmr = izracunajBMR({ pol: data.pol, godine, visina, tezina });
    const tdee = izracunajTDEE(bmr, data.aktivnost);
    const { kalorije, ogranicenoMinimumom } = preporuceneKalorije(tdee, data.cilj, data.pol);
    const makroi = izracunajMakroe(kalorije, tezina);
    const bmi = izracunajBMI(tezina, visina);

    setRezultat({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      kalorije,
      ogranicenoMinimumom,
      makroi,
      bmi: Math.round(bmi * 10) / 10,
      cilj: data.cilj,
    });
  };

  const handleReset = () => {
    setRezultat(null);
    setGreska(null);
  };

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 md:py-14 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-11 w-11 rounded-2xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
          <Calculator size={20} />
        </div>
        <h1 className="text-[26px] md:text-[32px] font-bold text-gray-900 tracking-tight">Besplatni fitness kalkulator</h1>
      </div>
      <p className="text-[14.5px] text-gray-400 leading-relaxed mb-9 max-w-lg">
        Proceni svoje dnevne kalorijske potrebe, makronutrijente i BMI na osnovu tvojih podataka — za manje od minuta.
      </p>

      {!rezultat ? (
        <div className="animate-slide-up">
          <Field label="Pol">
            <ChipGroup options={["Muško", "Žensko"]} value={data.pol === "musko" ? "Muško" : "Žensko"} onChange={(v) => set({ pol: v === "Muško" ? "musko" : "zensko" })} />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Godine">
              <TextInput type="number" inputMode="numeric" value={data.godine} onChange={(e) => set({ godine: e.target.value })} placeholder="28" />
            </Field>
            <Field label="Visina (cm)">
              <TextInput type="number" inputMode="numeric" value={data.visina} onChange={(e) => set({ visina: e.target.value })} placeholder="175" />
            </Field>
            <Field label="Težina (kg)">
              <TextInput type="number" inputMode="decimal" value={data.tezina} onChange={(e) => set({ tezina: e.target.value })} placeholder="75" />
            </Field>
          </div>

          <Field label="Nivo aktivnosti">
            <div className="space-y-2.5">
              {AKTIVNOST_OPCIJE.map((opt) => {
                const active = data.aktivnost === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => set({ aktivnost: opt.id })}
                    className={
                      "w-full text-left rounded-2xl border p-4 transition-all duration-200 active:scale-[0.98] " +
                      (active ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300")
                    }
                  >
                    <p className={"text-[14.5px] font-semibold " + (active ? "text-accent" : "text-gray-900")}>{opt.naziv}</p>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">{opt.opis}</p>
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Cilj">
            <ChipGroup
              options={CILJ_OPCIJE.map((c) => c.naziv)}
              value={CILJ_OPCIJE.find((c) => c.id === data.cilj)?.naziv || ""}
              onChange={(naziv) => set({ cilj: CILJ_OPCIJE.find((c) => c.naziv === naziv)?.id || "" })}
            />
          </Field>

          {greska && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 mb-6">
              <p className="text-[13.5px] text-red-600 font-medium">{greska}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full h-[54px] rounded-2xl text-white font-semibold text-[15.5px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
            style={{ background: ACCENT, boxShadow: "0 10px 24px rgba(81,112,255,0.3)" }}
          >
            IZRAČUNAJ <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <Rezultati rezultat={rezultat} onReset={handleReset} />
      )}
    </div>
  );
}

function StatCard({ label, value, unit }) {
  return (
    <div className="rounded-2xl bg-gray-50/70 p-5 flex-1">
      <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</p>
      <p className="text-[26px] font-bold text-gray-900 tracking-tight">
        {value} <span className="text-[14px] font-medium text-gray-400">{unit}</span>
      </p>
    </div>
  );
}

function Rezultati({ rezultat, onReset }) {
  const { bmr, tdee, kalorije, ogranicenoMinimumom, makroi, bmi, cilj } = rezultat;
  const saveti = SAVETI_PO_CILJU[cilj] || [];

  return (
    <div className="animate-slide-up">
      <div className="flex gap-3 mb-4">
        <StatCard label="BMR" value={bmr} unit="kcal" />
        <StatCard label="TDEE" value={tdee} unit="kcal" />
      </div>

      <div className="rounded-3xl p-6 mb-4 text-white" style={{ background: ACCENT, boxShadow: "0 14px 30px rgba(81,112,255,0.3)" }}>
        <p className="text-[12.5px] font-semibold uppercase tracking-wide text-white/75 mb-1.5 flex items-center gap-1.5">
          <Flame size={13} /> Preporučen dnevni unos
        </p>
        <p className="text-[42px] font-bold tracking-tight leading-none">
          {kalorije} <span className="text-[18px] font-medium text-white/75">kcal / dan</span>
        </p>
        {ogranicenoMinimumom && (
          <p className="text-[12.5px] text-white/80 mt-3 leading-relaxed">
            Napomena: proračunata vrednost bila je ispod bezbednog minimuma, pa je ovde prikazana najniža preporučena vrednost umesto nje.
          </p>
        )}
      </div>

      <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Makronutrijenti</p>
      <div className="grid grid-cols-3 gap-3 mb-2.5">
        <div className="rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-[20px] font-bold text-gray-900">{makroi.proteinG}g</p>
          <p className="text-[11.5px] text-gray-400 font-medium mt-0.5">Proteini</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-[20px] font-bold text-gray-900">{makroi.mastiG}g</p>
          <p className="text-[11.5px] text-gray-400 font-medium mt-0.5">Masti</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-[20px] font-bold text-gray-900">{makroi.ugljeniHidratiG}g</p>
          <p className="text-[11.5px] text-gray-400 font-medium mt-0.5">Ugljeni hidrati</p>
        </div>
      </div>
      <p className="text-[12.5px] text-gray-400 leading-relaxed mb-8">
        Ovo su procene i početna tačka za podešavanje — ne magičan, fiksan broj. Prilagođavaj ih na osnovu toga kako se telo ponaša kroz nedelje.
      </p>

      <div className="rounded-2xl bg-gray-50/70 p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">BMI</p>
          <p className="text-[20px] font-bold text-gray-900">{bmi}</p>
        </div>
        <p className="text-[13px] font-medium text-gray-600 mb-3">{bmiKategorija(bmi)}</p>
        <div className="flex items-start gap-2.5 pt-3 border-t border-gray-200">
          <Info size={15} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-gray-500 leading-relaxed">
            BMI je samo statistički pokazatelj i ne uzima u obzir mišićnu masu, procenat telesne masti ili sastav tela.
            Zbog toga ga ne treba koristiti kao jedini pokazatelj fizičke forme, niti kao osnovu za zaključak da li neko
            treba da smrša ili se ugoji.
          </p>
        </div>
      </div>

      {saveti.length > 0 && (
        <div className="mb-8">
          <p className="text-[15px] font-bold text-gray-900 mb-4">Šta dalje?</p>
          <div className="space-y-2.5">
            {saveti.map((savet, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Target size={11} />
                </div>
                <p className="text-[13.5px] text-gray-600 leading-relaxed">{savet}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-accent" />
          <p className="text-[15px] font-bold text-gray-900">Želiš plan napravljen baš za tebe?</p>
        </div>
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5">
          Kalkulator ti daje procenu. Ja ti mogu pomoći da napraviš konkretan plan ishrane i treninga koji se prilagođava tvom napretku.
        </p>
        <Link
          href="/coaching"
          className="w-full h-[50px] rounded-2xl text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{ background: ACCENT }}
        >
          POGLEDAJ ONLINE COACHING <ArrowRight size={16} />
        </Link>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-[13.5px] font-medium text-gray-400 hover:text-gray-600 py-2"
      >
        <RotateCcw size={13} /> Izračunaj ponovo
      </button>
    </div>
  );
}
