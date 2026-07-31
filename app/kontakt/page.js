"use client";

import { useState } from "react";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { Field, TextArea, TextInput, ACCENT } from "@/components/ui";
import { storageSet } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";

// 👉 Kontakt podaci trenera — menjaj ovde po potrebi.
const COACH_CONTACT = {
  telefonPrikaz: "+381 60 471 2485",
  telefonLink: "+381604712485", // format bez razmaka/nula za tel: i wa.me linkove
  email: "mihajlo.trener@gmail.com",
};

export default function KontaktPage() {
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    await storageSet(`poruka:${Date.now()}`, { ime, poruka, timestamp: Date.now() });
    notifyCoach(`Nova poruka od ${ime}`, poruka);
    setSent(true);
    setIme("");
    setPoruka("");
  };

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Kontakt</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Piši mi direktno</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Za sve što ne može da sačeka nedeljni check-in.</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <a href={`mailto:${COACH_CONTACT.email}`} className="rounded-2xl border border-gray-100 p-4 flex flex-col gap-2">
          <Mail size={18} className="text-accent" />
          <span className="text-[13px] font-medium text-gray-700">Email</span>
          <span className="text-[11.5px] text-gray-400 truncate">{COACH_CONTACT.email}</span>
        </a>
        <a href={`tel:${COACH_CONTACT.telefonLink}`} className="rounded-2xl border border-gray-100 p-4 flex flex-col gap-2">
          <Phone size={18} className="text-accent" />
          <span className="text-[13px] font-medium text-gray-700">Poziv</span>
          <span className="text-[11.5px] text-gray-400">{COACH_CONTACT.telefonPrikaz}</span>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <a
          href={`https://wa.me/${COACH_CONTACT.telefonLink.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-gray-100 p-4 flex items-center gap-2.5"
        >
          <MessageCircle size={18} className="text-emerald-500" />
          <span className="text-[13px] font-medium text-gray-700">WhatsApp</span>
        </a>
        <a
          href={`viber://chat?number=%2B${COACH_CONTACT.telefonLink.replace("+", "")}`}
          className="rounded-2xl border border-gray-100 p-4 flex items-center gap-2.5"
        >
          <MessageCircle size={18} className="text-purple-500" />
          <span className="text-[13px] font-medium text-gray-700">Viber</span>
        </a>
      </div>

      {!sent ? (
        <>
          <Field label="Ime i prezime">
            <TextInput value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Tvoje ime" />
          </Field>
          <Field label="Poruka">
            <TextArea rows={5} value={poruka} onChange={(e) => setPoruka(e.target.value)} placeholder="Napiši poruku treneru..." />
          </Field>
          <button
            onClick={handleSend}
            disabled={!ime.trim() || !poruka.trim()}
            className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            style={{ background: ACCENT }}
          >
            Pošalji poruku <Send size={16} />
          </button>
        </>
      ) : (
        <div className="rounded-2xl bg-accent/5 border border-accent/10 p-6 text-center">
          <MessageCircle size={24} className="text-accent mx-auto mb-3" />
          <p className="text-[14.5px] font-semibold text-gray-900 mb-1">Poruka je poslata</p>
          <p className="text-[13px] text-gray-500">Javiću ti se čim pročitam.</p>
        </div>
      )}
    </div>
  );
}
