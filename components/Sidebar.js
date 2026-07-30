"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { NAV_ITEMS, COACH_ITEM } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 border-r border-gray-100 px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white bg-accent">
          <Dumbbell size={17} />
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-gray-900 leading-tight">Mihajlo Fitness Coach</p>
          <p className="text-[11px] text-gray-400">Klijentski portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors duration-150 " +
                (active ? "bg-accent/8 text-accent" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800")
              }
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href={COACH_ITEM.href}
        className={
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium mt-4 border-t border-gray-100 pt-5 " +
          (pathname === COACH_ITEM.href ? "text-accent" : "text-gray-400 hover:text-gray-700")
        }
      >
        <COACH_ITEM.icon size={16} />
        {COACH_ITEM.label}
      </Link>
    </aside>
  );
}
