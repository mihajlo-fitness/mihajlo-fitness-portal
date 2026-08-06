import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function OMeniPage() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 md:py-14 animate-fade-in">
      <ProfilePhoto className="h-28 w-28 rounded-3xl mb-6" />

      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">O meni</p>
      <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 tracking-tight mb-6">Ćao, ja sam Mihajlo 👋</h1>

      {/* 👉 Zameni ovaj tekst svojom pravom pričom — ostavi ga da zvuči
         kao ti, ne kao generički marketing tekst. */}
      <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed mb-10">
        <p>
          Pre nekoliko godina, borio sam se sa sopstvenom težinom kao i mnogi ljudi koje danas treniram. Skinuo sam
          25 kg — ne kroz restriktivne dijete ili brza rešenja, već kroz sistem, strpljenje i navike koje traju.
        </p>
        <p>
          Danas sam sertifikovani personalni trener, fokusiran na održivo mršavljenje i izgradnju navika koje
          ostaju i posle poslednjeg treninga u planu. Ne verujem u prečice — verujem u dobar sistem i doslednost.
        </p>
        <p>
          Napravio sam ovaj portal da klijentima olakšam tačno ono što je meni nedostajalo kad sam počinjao: jasan
          uvid u napredak, plan kome mogu da veruju, i trenera koji je stvarno tu, ne samo u prvoj nedelji.
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
