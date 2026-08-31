"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { PUBLIC_NAV } from "@/lib/navigation";
import { ACCENT } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function PublicHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white bg-accent">
              <Dumbbell size={15} />
            </div>
            <span className="text-[14px] font-semibold text-gray-900 tracking-tight">Mihajlo Fitness Coach</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {PUBLIC_NAV.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "text-[13.5px] font-medium transition-colors " +
                  (pathname === item.href ? "text-accent" : "text-gray-500 hover:text-gray-900")
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={user ? "/app" : "/prijava"}
              className="h-9 px-4 rounded-full text-white text-[13px] font-semibold flex items-center"
              style={{ background: ACCENT }}
            >
              {user ? "Moj portal" : "Prijava"}
            </Link>
          </nav>

          <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 flex items-center justify-center text-gray-500">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobilni meni je NAMERNO van <header> elementa (koji ima
          backdrop-blur) — na Safari/iPhone-u, backdrop-blur pravi
          "kontejner" koji pokvari fixed pozicioniranje elemenata unutar
          njega, pa bi se meni inače preklapao/pogrešno prikazivao. */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-white px-6 py-6 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[14px] font-semibold text-gray-900">Meni</span>
              <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {PUBLIC_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    "px-3 py-3 rounded-xl text-[14.5px] font-medium " +
                    (pathname === item.href ? "bg-accent/8 text-accent" : "text-gray-600")
                  }
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={user ? "/app" : "/prijava"}
                onClick={() => setOpen(false)}
                className="mt-3 h-11 rounded-xl text-white text-[14px] font-semibold flex items-center justify-center"
                style={{ background: ACCENT }}
              >
                {user ? "Moj portal" : "Prijava"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
