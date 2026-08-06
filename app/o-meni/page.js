import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function OMeniPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 md:py-14 animate-fade-in">
      <ProfilePhoto className="h-28 w-28 rounded-3xl mb-6" />

      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">O meni</p>
      <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 tracking-tight mb-6">Ćao, ja sam Mihajlo 👋</h1>

      <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed mb-10">
        <p>
          Pre nekoliko godina i sam sam se borio sa viškom kilograma. Skinuo sam 25 kg — bez ekstremnih dijeta i
          brzih rešenja, već kroz kalorijski deficit, trening, strpljenje i navike koje mogu da se održe dugoročno.
        </p>
        <p>
          Danas sam sertifikovani personalni trener i pomažem ljudima da smršaju, izgrade bolje navike i nauče kako
          da rezultate zadrže dugoročno.
        </p>
        <p>Ne verujem u prečice. Verujem u dobar plan, doslednost i prilagođavanje plana stvarnom životu.</p>
        <p>
          Napravio sam ovaj portal da klijentima pružim ono što je meni najviše nedostajalo kada sam počinjao —
          jasan plan, praćenje napretka i trenera koji je tu i kada stvari ne idu savršeno.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 p-6">
        <p className="text-[15px] font-bold text-gray-900 mb-2">Spreman/na da krenemo?</p>
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5">
          Pogledaj pakete i pošalji zahtev — javljam se lično, obično isti ili sledeći dan.
        </p>
        <Link
          href="/coaching"
          className="inline-flex items-center gap-2 h-[48px] px-6 rounded-2xl text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98]"
          style={{ background: "#5170ff" }}
        >
          Pogledaj pakete <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
