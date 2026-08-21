"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, Check } from "lucide-react";
import { Field, TextInput, TextArea, ACCENT } from "@/components/ui";
import { storageSet } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";
import { slugify } from "@/lib/helpers";
import { COACH_CONTACT_EMAIL } from "@/lib/config";

const KONTAKT = {
  telefonPrikaz: "+381 60 471 2485",
  telefonLink: "+381604712485",
  email: COACH_CONTACT_EMAIL,
};

export default function JavniKontaktPage() {
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const slug = slugify(ime) || "posetilac";
    await storageSet(`zahtev:${slug}:${Date.now()}`, {
      ime,
      paket: "Opšte pitanje (Kontakt)",
      cena: null,
      poruka,
      timestamp: Date.now(),
    });
    notifyCoach(
      `Novo pitanje sa sajta: ${ime}`,
      `${ime} je poslao/la pitanje preko Kontakt stranice.\n\nPoruka: ${poruka || "—"}`
    );
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10 animate-fade-in">
      <div
        className="rounded-[32px] p-6 md:p-10 relative overflow-hidden"
        style={{ background: "#050506" }}
      >
        <div
          className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563eb2e 0%, transparent 70%)" }}
        />
        <div className="relative">
          <p className="text-[12.5px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#5b8dff" }}>
            Kontakt
          </p>
          <h1 className="text-[22px] md:text-[26px] font-bold text-white tracking-tight mb-1">Javi mi se</h1>
          <p className="text-[13.5px] text-white/40 mb-8">
            Pitanje pre nego što se odlučiš, ili nešto konkretno u vezi saradnje — piši direktno ili pošalji
            poruku ispod.
          </p>

          <div className="grid grid-cols-1 gap-2.5 mb-8">
            <a
              href={`mailto:${KONTAKT.email}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <Mail size={17} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-white">Email</p>
                <p className="text-[12px] text-white/40">{KONTAKT.email}</p>
              </div>
            </a>
            <a
              href={`tel:${KONTAKT.telefonLink}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <Phone size={17} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-white">Telefon</p>
                <p className="text-[12px] text-white/40">{KONTAKT.telefonPrikaz}</p>
              </div>
            </a>
            <a
              href={`https://wa.me/${KONTAKT.telefonLink.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <MessageCircle size={17} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-white">WhatsApp</p>
                <p className="text-[12px] text-white/40">Brz odgovor u toku dana</p>
              </div>
            </a>
          </div>

          {sent ? (
            <div className="rounded-2xl bg-white/[0.03] border border-accent/20 p-6 text-center">
              <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-white mx-auto mb-3" style={{ background: ACCENT }}>
                <Check size={18} strokeWidth={2.5} />
              </div>
              <p className="text-[14.5px] font-semibold text-white mb-1">Poruka je poslata</p>
              <p className="text-[13px] text-white/40">Javljam se čim stignem da pogledam.</p>
            </div>
          ) : (
            <div>
              <p className="text-[12.5px] font-semibold text-white/50 mb-3">Ili pošalji poruku direktno</p>
              <div className="[&_input]:bg-white/[0.03] [&_input]:border-white/10 [&_input]:text-white [&_textarea]:bg-white/[0.03] [&_textarea]:border-white/10 [&_textarea]:text-white [&_label]:text-white/50">
                <Field label="Ime">
                  <TextInput value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Tvoje ime" />
                </Field>
                <Field label="Poruka">
                  <TextArea rows={4} value={poruka} onChange={(e) => setPoruka(e.target.value)} placeholder="Šta te zanima?" />
                </Field>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!ime.trim() || !poruka.trim() || submitting}
                className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
                style={{ background: ACCENT }}
              >
                {submitting ? "Slanje..." : "Pošalji poruku"} <Send size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
