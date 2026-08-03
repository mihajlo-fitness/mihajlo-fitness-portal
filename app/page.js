import Link from "next/link";
import {
  Sparkles,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  Calculator,
  ChevronRight,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "/checkin", label: "Nedeljni check-in", desc: "Popuni formu za ovu nedelju", icon: ClipboardCheck, filled: true },
  { href: "/napredak", label: "Napredak", desc: "Težina, mere i fotografije kroz vreme", icon: TrendingUp },
  { href: "/kalkulator", label: "Fitness kalkulator", desc: "Besplatna procena kalorija i makroa", icon: Calculator },
  { href: "/coaching", label: "Paketi & Coaching", desc: "Plan ishrane, treninga ili puni coaching", icon: Sparkles },
  { href: "/edukacija", label: "Edukacija", desc: "Video lekcije i korisni saveti", icon: BookOpen },
];

export default function HomePage() {
  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 py-10 md:py-14 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-3">
        Klijentski portal
      </p>
      <h1 className="text-[32px] md:text-[40px] leading-[1.15] font-bold text-gray-900 tracking-tight mb-4">
        Dobrodošao/la 👋
      </h1>
      <p className="text-[15px] text-gray-400 leading-relaxed mb-10 max-w-md">
        Ovde pratiš svoj napredak, popunjavaš nedeljni check-in i imaš pristup planovima i edukaciji.
      </p>

      <Link
        href="/onboarding"
        className="flex items-center gap-3 rounded-2xl border border-dashed border-accent/30 bg-accent/5 px-4 py-3.5 mb-8 group"
      >
        <Sparkles size={17} className="text-accent shrink-0" />
        <span className="text-[13.5px] text-gray-700 flex-1">
          Nov/a si? Popuni <span className="font-semibold">početni upitnik</span> pre prvog check-ina.
        </span>
        <ChevronRight size={16} className="text-accent shrink-0" />
      </Link>

      <div className="grid gap-3 md:grid-cols-2">
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-4 rounded-3xl border p-5 transition-all duration-200 active:scale-[0.98] group " +
                (item.filled
                  ? "border-transparent text-white"
                  : "border-gray-100 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(81,112,255,0.08)]")
              }
              style={item.filled ? { background: "#5170ff", boxShadow: "0 10px 24px rgba(81,112,255,0.3)" } : {}}
            >
              <div
                className={
                  "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 " +
                  (item.filled ? "bg-white/15 text-white" : "bg-accent/8 text-accent")
                }
              >
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className={"text-[15.5px] font-semibold " + (item.filled ? "text-white" : "text-gray-900")}>
                  {item.label}
                </p>
                <p className={"text-[13px] mt-0.5 " + (item.filled ? "text-white/75" : "text-gray-400")}>
                  {item.desc}
                </p>
              </div>
              <ChevronRight
                size={18}
                className={item.filled ? "text-white/70" : "text-gray-300 group-hover:text-accent transition-colors"}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
