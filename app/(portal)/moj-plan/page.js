"use client";

import { useEffect, useState, useCallback } from "react";
import { FileText, Download, RotateCw } from "lucide-react";
import { storageGetSafe } from "@/lib/storage";
import { useAuth } from "@/lib/auth";
import { ACCENT } from "@/components/ui";

export default function MojPlanPage() {
  const { user, ready } = useAuth();
  // status: "loading" | "ok" | "error"
  const [status, setStatus] = useState("loading");
  const [plan, setPlan] = useState(null);

  const load = useCallback(async () => {
    if (!user) return;
    setStatus("loading");
    const { value, ok } = await storageGetSafe(`plan:${user.id}`);
    if (!ok) {
      setStatus("error");
      return;
    }
    setPlan(value || null);
    setStatus("ok");
  }, [user]);

  useEffect(() => {
    if (!ready || !user) return;
    load();
  }, [ready, user, load]);

  return (
    <div className="max-w-md mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Moj plan</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Tvoj lični plan</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Plan koji ti je trener pripremio, na osnovu tvog upitnika i check-inova.</p>

      {status === "loading" && <p className="text-[13.5px] text-gray-300">Učitavanje...</p>}

      {status === "error" && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-[14px] text-red-500 font-medium mb-3">Nije uspelo učitavanje plana</p>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 h-[42px] px-5 rounded-xl text-white font-semibold text-[13.5px]"
            style={{ background: ACCENT }}
          >
            <RotateCw size={15} /> Pokušaj ponovo
          </button>
        </div>
      )}

      {status === "ok" && plan === null && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center">
          <p className="text-[14px] text-gray-500 font-medium mb-1">Trener priprema tvoj plan</p>
          <p className="text-[13px] text-gray-400">
            Obično je spreman u roku od 24-48h nakon što popuniš početni upitnik. Javi se na Kontakt stranici ako
            misliš da je prošlo duže.
          </p>
        </div>
      )}

      {status === "ok" && plan && (
        <div className="rounded-2xl border border-gray-100 p-5 animate-slide-up">
          {plan.link && (
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 mb-4 hover:border-accent/30"
            >
              <div className="h-9 w-9 rounded-lg bg-accent/8 text-accent flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <span className="text-[13.5px] font-medium text-gray-800 flex-1">Preuzmi svoj plan</span>
              <Download size={15} className="text-gray-300" />
            </a>
          )}
          {plan.tekst && <p className="text-[13.5px] text-gray-700 leading-relaxed whitespace-pre-line">{plan.tekst}</p>}
        </div>
      )}
    </div>
  );
}
