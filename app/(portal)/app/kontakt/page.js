"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { Field, TextArea, ACCENT } from "@/components/ui";
import { storageSet, storageGet } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";
import { COACH_CONTACT_EMAIL } from "@/lib/config";
import { useAuth } from "@/lib/auth";

// 👉 Telefon trenera — menjaj ovde po potrebi. Email dolazi iz
// lib/config.js (COACH_CONTACT_EMAIL) da bude isti svuda na sajtu.
const COACH_CONTACT = {
  telefonPrikaz: "+381 60 471 2485",
  telefonLink: "+381604712485",
  email: COACH_CONTACT_EMAIL,
};

export default function KontaktPage() {
  const { user } = useAuth();
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Automatski povuci ime iz VEĆ poznatog upitnika — ne oslanjamo se na
  // slobodan unos koji bi se mogao razlikovati od onoga što trener već
  // ima zapisano za tog klijenta (nadimak, drugačiji pravopis, itd).
  useEffect(() => {
    if (!user) return;
    (async () => {
      const client = await storageGet(`client:${user.id}`);
      if (client?.ime) setIme(client.ime);
    })();
  }, [user]);

  const handleSend = async () => {
    if (!user) return;
    setSending(true);
    // KLJUČNO: ključ sadrži user.id, isti obrazac kao check-in/upitnik —
    // trener sad može pouzdano da poveže poruku sa TAČNIM klijentom (i
    // njegovim email-om iz upitnika), bez obzira šta je ovde upisano
    // kao ime.
    await storageSet(`poruka:${user.id}:${Date.now()}`, {
      ime: ime || user.email,
      email: user.email,
      poruka,
      timestamp: Date.now(),
    });
    notifyCoach(`Nova poruka od ${ime || user.email}`, `${poruka}\n\nEmail: ${user.email}`);
    setSending(false);
    setSent(true);
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
            <input
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              placeholder="Tvoje ime"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-[15px] text-gray-900 placeholder:text-gray-350 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
          </Field>
          <Field label="Poruka">
            <TextArea rows={5} value={poruka} onChange={(e) => setPoruka(e.target.value)} placeholder="Napiši poruku treneru..." />
          </Field>
          <button
            onClick={handleSend}
            disabled={!poruka.trim() || sending}
            className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            style={{ background: ACCENT }}
          >
            {sending ? "Slanje..." : "Pošalji poruku"} <Send size={16} />
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
