import Link from "next/link";
import { Instagram, User, Mail } from "lucide-react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, COACH_EMAIL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-md md:max-w-3xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12.5px] text-gray-350">
          © {new Date().getFullYear()} Mihajlo Fitness Coach. Sva prava zadržana.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/o-meni"
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-gray-400 hover:text-accent transition-colors"
          >
            <User size={14} /> O meni
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-gray-400 hover:text-accent transition-colors"
          >
            <Instagram size={14} /> @{INSTAGRAM_HANDLE}
          </a>
          <a
            href={`mailto:${COACH_EMAIL}`}
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-gray-400 hover:text-accent transition-colors"
          >
            <Mail size={14} /> Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
