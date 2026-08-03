import {
  Home,
  ClipboardCheck,
  TrendingUp,
  Sparkles,
  Heart,
  BookOpen,
  MessageCircle,
  HelpCircle,
  FileText,
  BarChart3,
  Calculator,
} from "lucide-react";

// Da dodaš novu sekciju portala kasnije: dodaj jedan objekat ovde
// i napravi odgovarajući folder u app/ sa page.js fajlom. Navigacija
// (i mobilna i desktop) će je automatski prikazati.
export const NAV_ITEMS = [
  { href: "/", label: "Početna", icon: Home },
  { href: "/checkin", label: "Nedeljni Check-in", icon: ClipboardCheck },
  { href: "/napredak", label: "Napredak", icon: TrendingUp },
  { href: "/moj-plan", label: "Moj plan", icon: Heart },
  { href: "/kalkulator", label: "Fitness kalkulator", icon: Calculator },
  { href: "/coaching", label: "Paketi & Coaching", icon: Sparkles },
  { href: "/edukacija", label: "Edukacija", icon: BookOpen },
  { href: "/kontakt", label: "Kontakt sa trenerom", icon: MessageCircle },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dokumenti", label: "Dokumenti", icon: FileText },
];

export const COACH_ITEM = { href: "/trener", label: "Trenerski pregled", icon: BarChart3 };
