import {
  Home,
  ClipboardCheck,
  TrendingUp,
  Salad,
  Dumbbell,
  BookOpen,
  MessageCircle,
  HelpCircle,
  FileText,
  BarChart3,
} from "lucide-react";

// Da dodaš novu sekciju portala kasnije: dodaj jedan objekat ovde
// i napravi odgovarajući folder u app/ sa page.js fajlom. Navigacija
// (i mobilna i desktop) će je automatski prikazati.
export const NAV_ITEMS = [
  { href: "/", label: "Početna", icon: Home },
  { href: "/checkin", label: "Nedeljni Check-in", icon: ClipboardCheck },
  { href: "/napredak", label: "Napredak", icon: TrendingUp },
  { href: "/ishrana", label: "Plan ishrane", icon: Salad },
  { href: "/treninzi", label: "Plan treninga", icon: Dumbbell },
  { href: "/edukacija", label: "Edukacija", icon: BookOpen },
  { href: "/kontakt", label: "Kontakt sa trenerom", icon: MessageCircle },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dokumenti", label: "Dokumenti", icon: FileText },
];

export const COACH_ITEM = { href: "/trener", label: "Trenerski pregled", icon: BarChart3 };
