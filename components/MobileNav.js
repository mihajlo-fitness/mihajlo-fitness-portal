"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, COACH_ITEM } from "@/lib/navigation";

const PRIMARY = NAV_ITEMS.slice(0, 3); // Početna, Check-in, Napredak
const MORE = [...NAV_ITEMS.slice(3), COACH_ITEM];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            <div className="grid grid-cols-3 gap-3">
              {[...NAV_ITEMS, COACH_ITEM].map((item) => {
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
          </div>
        </div>
      )}
    </>
  );
}
