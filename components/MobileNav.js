"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Home } from "lucide-react";
import { PORTAL_NAV, COACH_ITEM } from "@/lib/navigation";
import { useAuth } from "@/lib/auth";

const PRIMARY = PORTAL_NAV.slice(0, 3); // Početna, Check-in, Napredak
const MORE = PORTAL_NAV.slice(3);
// Poseban link nazad na javni sajt — namerno drugačiji label od portal
// "Početna" (koja vodi na /app) da ne bude zabune šta je šta.
const SAJT_ITEM = { href: "/", label: "Javni sajt", icon: Home };

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCoach, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 max-w-md mx-auto">
          {PRIMARY.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 py-2.5"
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 1.9} color={active ? "#5170ff" : "#a3a3a3"} />
                <span className={"text-[10.5px] font-medium " + (active ? "text-accent" : "text-gray-350")}>
                  {item.label.split(" ")[0]}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2.5"
          >
            <Menu size={19} strokeWidth={1.9} color="#a3a3a3" />
            <span className="text-[10.5px] font-medium text-gray-350">Više</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+24px)] animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[15px] font-semibold text-gray-900">Sve sekcije</p>
              <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[...MORE, ...(isCoach ? [COACH_ITEM] : []), SAJT_ITEM].map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={
                      "flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-colors " +
                      (active ? "border-accent/40 bg-accent/5" : "border-gray-100")
                    }
                  >
                    <Icon size={19} color={active ? "#5170ff" : "#525252"} />
                    <span className="text-[11.5px] font-medium text-gray-700 leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-100 py-3 text-[13px] font-medium text-gray-500"
            >
              <LogOut size={15} /> Odjava
            </button>
          </div>
        </div>
      )}
    </>
  );
}
