"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Search, ChevronRight, ArrowLeft, TrendingUp, Dumbbell, Salad, Droplet, Moon, HeartPulse, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { storageList, storageGet } from "@/lib/storage";
import { formatDateSr } from "@/lib/helpers";
import { ACCENT, StatChip } from "@/components/ui";

export default function TrenerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState({});
  const [zahtevi, setZahtevi] = useState([]);
  const [poruke, setPoruke] = useState([]);
  const [tab, setTab] = useState("klijenti"); // klijenti | zahtevi | poruke
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const handleLogout = async () => {
    await fetch("/api/trener-logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const map = {};

      const onboardingKeys = await storageList("client:");
      for (const key of onboardingKeys) {
        const val = await storageGet(key);
        if (!val) continue;
        const slug = key.split(":")[1];
        map[slug] = map[slug] || { slug, name: val.ime || slug, onboarding: null, checkins: [] };
        map[slug].onboarding = val;
        map[slug].name = val.ime || slug;
      }

      const checkinKeys = await storageList("checkin:");
      for (const key of checkinKeys) {
        const val = await storageGet(key);
        if (!val) continue;
        const slug = key.split(":")[1];
        map[slug] = map[slug] || { slug, name: val.ime || slug, onboarding: null, checkins: [] };
        map[slug].checkins.push(val);
        map[slug].name = val.ime || map[slug].name;
      }

      Object.values(map).forEach((c) => c.checkins.sort((a, b) => a.timestamp - b.timestamp));
      setClients(map);

      const zahtevKeys = await storageList("zahtev:");
      const zItems = [];
      for (const key of zahtevKeys) {
        const val = await storageGet(key);
        if (val) zItems.push(val);
      }
      zItems.sort((a, b) => b.timestamp - a.timestamp);
      setZahtevi(zItems);

      const porukaKeys = await storageList("poruka:");
      const pItems = [];
      for (const key of porukaKeys) {
        const val = await storageGet(key);
        if (val) pItems.push(val);
      }
      pItems.sort((a, b) => b.timestamp - a.timestamp);
      setPoruke(pItems);

      setLoading(false);
    })();
  }, []);

  const list = useMemo(
    () =>
      Object.values(clients)
        .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          const la = a.checkins.at(-1)?.timestamp || a.onboarding?.timestamp || 0;
          const lb = b.checkins.at(-1)?.timestamp || b.onboarding?.timestamp || 0;
          return lb - la;
        }),
    [clients, query]
  );

  if (selected) {
    return <ClientDetail client={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11.5px] font-medium text-gray-350 tracking-wide">TRENERSKI PREGLED</p>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-gray-700">
          <LogOut size={13} /> Odjava
        </button>
      </div>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Klijenti</h1>
      <p className="text-[13.5px] text-gray-400 mb-6">
        {Object.keys(clients).length} {Object.keys(clients).length === 1 ? "klijent" : "klijenata"} sa podacima
      </p>

      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {[
          { id: "klijenti", label: "Klijenti" },
          { id: "zahtevi", label: `Zahtevi${zahtevi.length ? ` (${zahtevi.length})` : ""}` },
          { id: "poruke", label: `Poruke${poruke.length ? ` (${poruke.length})` : ""}` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "px-3 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors " +
              (tab === t.id ? "border-accent text-accent" : "border-transparent text-gray-400 hover:text-gray-600")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "zahtevi" && (
        <div className="space-y-2.5">
          {loading ? (
            <p className="text-center text-gray-300 text-[13.5px] mt-10">Učitavanje...</p>
          ) : zahtevi.length === 0 ? (
            <p className="text-center text-gray-400 text-[14px] mt-10">Još nema zahteva za pakete.</p>
          ) : (
            zahtevi.map((z, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[14.5px] font-semibold text-gray-900">{z.ime}</p>
                  <span className="text-[11.5px] text-gray-400">{formatDateSr(new Date(z.timestamp).toISOString())}</span>
                </div>
                <p className="text-[13px] font-medium text-accent mb-1">
                  {z.paket} {z.cena ? `· ${z.cena}` : ""}
                </p>
                {z.poruka && <p className="text-[13px] text-gray-500 leading-relaxed">{z.poruka}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {tab === "poruke" && (
        <div className="space-y-2.5">
          {loading ? (
            <p className="text-center text-gray-300 text-[13.5px] mt-10">Učitavanje...</p>
          ) : poruke.length === 0 ? (
            <p className="text-center text-gray-400 text-[14px] mt-10">Još nema poruka.</p>
          ) : (
            poruke.map((p, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[14.5px] font-semibold text-gray-900">{p.ime}</p>
                  <span className="text-[11.5px] text-gray-400">{formatDateSr(new Date(p.timestamp).toISOString())}</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">{p.poruka}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "klijenti" && (
        <>
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretraži klijente..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 pl-11 pr-4 py-3 text-[14px] outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-300 text-[13.5px] mt-16">Učitavanje...</p>
      ) : list.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-[14.5px] text-gray-400">Još nema poslatih check-inova.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {list.map((c) => {
            const last = c.checkins.at(-1);
            const w = last?.tezina || c.onboarding?.tezina;
            return (
              <button
                key={c.slug}
                onClick={() => setSelected(c)}
                className="w-full text-left rounded-2xl border border-gray-100 p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-accent/30 hover:shadow-[0_6px_18px_rgba(81,112,255,0.08)] active:scale-[0.98]"
              >
                <div className="h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold text-[14px] shrink-0 bg-accent">
                  {c.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14.5px] font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-[12.5px] text-gray-400">
                    {c.checkins.length} check-in{c.checkins.length === 1 ? "" : "a"}
                    {w ? ` · ${w} kg` : ""}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            );
          })}
        </div>
      )}
        </>
      )}
    </div>
  );
}

function ClientDetail({ client, onBack }) {
  const chartData = client.checkins.map((c) => ({
    label: c.nedelja ? `N${c.nedelja}` : formatDateSr(c.datum),
    tezina: c.tezina ? Number(c.tezina) : null,
  }));
  const last = client.checkins.at(-1);

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <button onClick={onBack} className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 -ml-2 mb-4">
        <ArrowLeft size={18} />
      </button>

      <div className="flex items-center gap-3.5 mb-7">
        <div className="h-14 w-14 rounded-full flex items-center justify-center text-white font-semibold text-[18px] shrink-0 bg-accent">
          {client.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">{client.name}</h1>
          <p className="text-[13px] text-gray-400">
            {client.onboarding ? `Cilj: ${client.onboarding.ciljChip || client.onboarding.cilj || "—"}` : "Bez početnog upitnika"}
          </p>
        </div>
      </div>

      {client.onboarding && (
        <div className="mb-6">
          <p className="text-[12.5px] font-semibold text-gray-500 mb-2.5">Početni upitnik</p>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <StatChip icon={<HeartPulse size={16} />} label="Godine" value={client.onboarding.godine} />
            <StatChip icon={<Ruler size={16} />} label="Visina" value={client.onboarding.visina ? `${client.onboarding.visina} cm` : null} />
            <StatChip icon={<TrendingUp size={16} />} label="Početna težina" value={client.onboarding.tezina ? `${client.onboarding.tezina} kg` : null} />
            <StatChip icon={<Dumbbell size={16} />} label="Iskustvo" value={client.onboarding.iskustvo} />
          </div>

          <div className="rounded-2xl bg-gray-50/70 p-4 space-y-3">
            <div>
              <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Cilj</p>
              <p className="text-[13.5px] text-gray-700">
                {client.onboarding.ciljChip}
                {client.onboarding.cilj ? ` — ${client.onboarding.cilj}` : ""}
                {!client.onboarding.ciljChip && !client.onboarding.cilj && "—"}
              </p>
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Povrede / ograničenja</p>
              <p className="text-[13.5px] text-gray-700">
                {client.onboarding.povredeNema ? "Nema povreda ni ograničenja" : client.onboarding.povrede || "—"}
              </p>
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Ishrana — navike i restrikcije</p>
              <p className="text-[13.5px] text-gray-700">{client.onboarding.ishrana || "—"}</p>
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Životne navike</p>
              <p className="text-[13.5px] text-gray-700">
                San {client.onboarding.san ? `${client.onboarding.san}h` : "—"} · Stres {client.onboarding.stres}/10 ·{" "}
                {client.onboarding.posao || "—"} · Pušenje: {client.onboarding.pusenje || "—"} · Alkohol: {client.onboarding.alkohol || "—"}
              </p>
            </div>
          </div>

          {client.onboarding.merenja && Object.values(client.onboarding.merenja).some(Boolean) && (
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {Object.entries(client.onboarding.merenja).map(([k, v]) =>
                v ? <StatChip key={k} icon={<Ruler size={15} />} label={k} value={`${v} cm`} /> : null
              )}
            </div>
          )}
        </div>
      )}

      {chartData.length > 1 && (
        <div className="rounded-2xl border border-gray-100 p-4 mb-6">
          <p className="text-[12.5px] font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
            <TrendingUp size={13} className="text-accent" /> Kretanje težine
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#f1f1f1" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#b0b0b0" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#b0b0b0" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
              <Line type="monotone" dataKey="tezina" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 3, fill: ACCENT }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {last && (
        <>
          <p className="text-[12.5px] font-semibold text-gray-500 mb-2.5">Poslednji check-in · {formatDateSr(last.datum)}</p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <StatChip icon={<TrendingUp size={16} />} label="Težina" value={last.tezina ? `${last.tezina} kg` : null} />
            <StatChip icon={<Dumbbell size={16} />} label="Treninzi" value={last.treninzi} />
            <StatChip icon={<Salad size={16} />} label="Ishrana" value={last.ishranaPlan} />
            <StatChip icon={<Droplet size={16} />} label="Voda" value={last.voda ? `${last.voda} L` : null} />
            <StatChip icon={<Moon size={16} />} label="San" value={last.san ? `${last.san} h` : null} />
            <StatChip icon={<HeartPulse size={16} />} label="Osećaj" value={last.osecaj ? `${last.osecaj}/10` : null} />
          </div>

          {(last.najteze || last.bolovi || last.pitanje) && (
            <div className="rounded-2xl bg-gray-50/70 p-4 space-y-3 mb-6">
              {last.najteze && (
                <div>
                  <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Najteže ove nedelje</p>
                  <p className="text-[13.5px] text-gray-700">{last.najteze}</p>
                </div>
              )}
              {last.bolovi && (
                <div>
                  <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Bolovi</p>
                  <p className="text-[13.5px] text-gray-700">{last.bolovi}</p>
                </div>
              )}
              {last.pitanje && (
                <div>
                  <p className="text-[11.5px] font-semibold text-gray-400 mb-0.5">Pitanje za trenera</p>
                  <p className="text-[13.5px] text-gray-700">{last.pitanje}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <p className="text-[12.5px] font-semibold text-gray-500 mb-2.5">Istorija check-inova</p>
      <div className="space-y-2">
        {client.checkins
          .slice()
          .reverse()
          .map((c, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-3.5 flex items-center justify-between">
              <div>
                <p className="text-[13.5px] font-medium text-gray-800">{c.nedelja ? `Nedelja ${c.nedelja}` : "Check-in"}</p>
                <p className="text-[12px] text-gray-400">{formatDateSr(c.datum)}</p>
              </div>
              <p className="text-[13.5px] font-semibold text-gray-900">{c.tezina ? `${c.tezina} kg` : "—"}</p>
            </div>
          ))}
        {client.checkins.length === 0 && <p className="text-[13px] text-gray-300">Nema poslatih nedeljnih check-inova.</p>}
      </div>
    </div>
  );
}
