import {
  Home,
  ClipboardCheck,
  TrendingUp,
  Heart,
  BookOpen,
  MessageCircle,
  FileText,
  BarChart3,
} from "lucide-react";

// PORTAL_NAV = navigacija za ULOGOVANOG KLIJENTA (unutar (portal) grupe ruta).
// Namerno NE sadrži javne marketing stranice (kalkulator, coaching, faq) —
// klijent koji je već unutra ne treba ponovo da mu se "prodaje" coaching,
// i ne treba da vidi Trenerski pregled (to je posebna, coach-only ruta).
export const PORTAL_NAV = [
  { href: "/app", label: "Početna", icon: Home },
  { href: "/checkin", label: "Nedeljni Check-in", icon: ClipboardCheck },
  { href: "/napredak", label: "Napredak", icon: TrendingUp },
  { href: "/moj-plan", label: "Moj plan", icon: Heart },
  { href: "/app/edukacija", label: "Edukacija", icon: BookOpen },
  { href: "/dokumenti", label: "Dokumenti", icon: FileText },
  { href: "/app/kontakt", label: "Kontakt sa trenerom", icon: MessageCircle },
];

// Prikazuje se samo korisniku čiji je profil role === "coach"
// (proverava se u Sidebar/MobileNav preko useAuth().profile).
export const COACH_ITEM = { href: "/trener", label: "Trenerski pregled", icon: BarChart3 };

// PUBLIC_NAV = navigacija za javni sajt (nova (public) layout grupa).
// Edukacija i Kontakt su namerno tu — obe imaju svoju JAVNU verziju
// (edukacija: teaser sa Instagram otključavanjem; kontakt: forma za
// opšta pitanja) koja radi bez prijave. Klijenti nakon prijave koriste
// svoje, punije verzije unutar portala (/app/edukacija, /app/kontakt).
export const PUBLIC_NAV = [
  { href: "/", label: "Početna" },
  { href: "/o-meni", label: "O meni" },
  { href: "/coaching", label: "Paketi" },
  { href: "/edukacija", label: "Edukacija" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];
