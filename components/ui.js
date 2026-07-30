"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react";

export const ACCENT = "#5170ff";

export function Field({ label, hint, children }) {
  return (
    <div className="mb-6">
      <label className="block text-[13px] font-semibold tracking-wide text-gray-900 mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] text-gray-400">{hint}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-[15px] text-gray-900 placeholder:text-gray-350 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10";

export function TextInput(props) {
  return <input {...props} className={inputBase + " " + (props.className || "")} />;
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows || 3}
      className={inputBase + " resize-none " + (props.className || "")}
    />
  );
}

export function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={
              "px-4 py-2.5 rounded-full text-[13.5px] font-medium border transition-all duration-200 active:scale-95 " +
              (active
                ? "bg-accent border-accent text-white shadow-[0_4px_14px_rgba(81,112,255,0.35)]"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300")
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function ScaleTen({ value, onChange, lowLabel, highLabel }) {
  return (
    <div>
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={
                "h-9 w-9 rounded-full text-[13px] font-semibold border transition-all duration-200 active:scale-90 " +
                (active
                  ? "bg-accent border-accent text-white shadow-[0_4px_12px_rgba(81,112,255,0.4)] scale-110"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300")
              }
            >
              {n}
            </button>
          );
        })}
      </div>
      {(lowLabel || highLabel) && (
        <div className="flex justify-between mt-2 text-[11.5px] text-gray-400">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

export function PhotoSlot({ label, file, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center gap-2 overflow-hidden relative group transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.03] active:scale-[0.98]"
      >
        {preview ? (
          <>
            <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-[12px] font-medium transition-opacity">
                Zameni
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X size={13} />
            </button>
          </>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
              <Upload size={16} />
            </div>
            <span className="text-[12.5px] text-gray-400 font-medium">{label}</span>
          </>
        )}
      </button>
      {!preview && <p className="text-center text-[11px] text-gray-300 mt-1.5">Dodirni za upload</p>}
    </div>
  );
}

export function MeasurementsGrid({ values, onChange }) {
  const fields = [
    ["struk", "Struk"],
    ["grudi", "Grudi"],
    ["kukovi", "Kukovi"],
    ["levaRuka", "Leva ruka"],
    ["desnaRuka", "Desna ruka"],
    ["levaButina", "Leva butina"],
    ["desnaButina", "Desna butina"],
    ["list", "List"],
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="block text-[12px] font-medium text-gray-500 mb-1.5">{label}</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={values[key] ?? ""}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-9 text-[14.5px] text-gray-900 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11.5px] text-gray-300">cm</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProgressHeader({ step, total, title, subtitle, onBack, brandLabel }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md">
      <div className="max-w-md mx-auto px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors -ml-2"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-[11.5px] font-medium text-gray-350 tracking-wide">{brandLabel}</span>
          <span className="text-[12px] font-semibold text-gray-400 tabular-nums">
            {step + 1}/{total}
          </span>
        </div>
        <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, background: ACCENT }}
          />
        </div>
        <div key={title} className="mt-5 animate-slide-up">
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-[13.5px] text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export function StepShell({ children, stepKey }) {
  return (
    <div key={stepKey} className="animate-slide-up">
      {children}
    </div>
  );
}

export function FooterNav({ onNext, onBack, isFirst, nextLabel = "Nastavi", nextDisabled }) {
  return (
    <div className="sticky bottom-16 md:bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4">
      <div className="max-w-md mx-auto px-5 flex gap-3">
        {!isFirst && (
          <button
            onClick={onBack}
            className="h-[52px] px-5 rounded-2xl border border-gray-200 text-gray-500 font-medium text-[14.5px] transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
          >
            Nazad
          </button>
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex-1 h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: ACCENT, boxShadow: nextDisabled ? "none" : "0 10px 24px rgba(81,112,255,0.35)" }}
        >
          {nextLabel} <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export function ThankYou({ onSubmit, submitting, done, backHref = "/" }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-md mx-auto px-8 text-center animate-fade-in">
      {!done ? (
        <>
          <div
            className="h-16 w-16 rounded-3xl flex items-center justify-center text-white mb-7"
            style={{ background: ACCENT, boxShadow: "0 14px 30px rgba(81,112,255,0.35)" }}
          >
            <Check size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-[24px] font-bold text-gray-900 tracking-tight leading-snug mb-3">
            Hvala na check-inu!
          </h2>
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-xs mb-10">
            Pregledaću sve i javiću ti se sa povratnim informacijama.
          </p>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="w-full h-[54px] rounded-2xl text-white font-semibold text-[15.5px] transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
            style={{ background: ACCENT, boxShadow: "0 10px 24px rgba(81,112,255,0.35)" }}
          >
            {submitting ? "Slanje..." : "Pošalji check-in"}
          </button>
        </>
      ) : (
        <>
          <div className="h-16 w-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-white mb-7 shadow-[0_14px_30px_rgba(16,185,129,0.3)]">
            <Check size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-[24px] font-bold text-gray-900 tracking-tight mb-3">Uspešno poslato ✓</h2>
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-xs mb-10">
            Tvoji odgovori su sačuvani. Javljam ti se uskoro!
          </p>
          <a href={backHref} className="text-[14px] font-semibold text-accent">
            Nazad na početnu
          </a>
        </>
      )}
    </div>
  );
}

export function StatChip({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-accent/8 text-accent flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11.5px] text-gray-400">{label}</p>
        <p className="text-[14.5px] font-semibold text-gray-900">{value ?? "—"}</p>
      </div>
    </div>
  );
}
