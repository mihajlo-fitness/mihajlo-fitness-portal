"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dumbbell, LogOut } from "lucide-react";
import { PORTAL_NAV, COACH_ITEM } from "@/lib/navigation";
import { useAuth } from "@/lib/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, isCoach, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 border-r border-gray-100 px-4 py-6">
      <Link href="/" className="flex items-center gap-2.5 px-2 mb-8 rounded-xl -mx-2 py-1 hover:bg-gray-50 transition-colors">
        <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white bg-accent shrink-0">
          <Dumbbell size={17} />
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-gray-900 leading-tight">Mihajlo Fitness Coach</p>
          <p className="text-[11px] text-gray-400">{profile?.ime ? `Zdravo, ${profile.ime}` : "Tvoj prostor"}</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {PORTAL_NAV.map((item) => {
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

      <div className="border-t border-gray-100 pt-4 mt-4 space-y-1">
        {isCoach && (
          <Link
            href={COACH_ITEM.href}
            className={
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium " +
              (pathname === COACH_ITEM.href ? "text-accent" : "text-gray-400 hover:text-gray-700")
            }
          >
            <COACH_ITEM.icon size={16} />
            {COACH_ITEM.label}
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-400 hover:text-gray-700"
        >
          <LogOut size={16} />
          Odjava
        </button>
      </div>
    </aside>
  );
}
