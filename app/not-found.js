import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div className="h-16 w-16 rounded-3xl bg-accent/8 text-accent flex items-center justify-center mb-7">
        <Dumbbell size={28} />
      </div>
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-3">Greška 404</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-3">Ova stranica ne postoji</h1>
      <p className="text-[14.5px] text-gray-400 leading-relaxed max-w-xs mb-9">
        Možda je link zastareo ili je došlo do greške u kucanju. Vrati se na početnu i pronađi ono što ti treba.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 h-[50px] px-7 rounded-2xl text-white font-semibold text-[14.5px] transition-all duration-200 active:scale-[0.98]"
        style={{ background: "#5170ff", boxShadow: "0 10px 24px rgba(81,112,255,0.3)" }}
      >
        <ArrowLeft size={16} /> Nazad na početnu
      </Link>
    </div>
  );
}
