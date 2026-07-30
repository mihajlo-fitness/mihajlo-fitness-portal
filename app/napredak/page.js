"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Ruler } from "lucide-react";
import { storageList, storageGet } from "@/lib/storage";
import { formatDateSr } from "@/lib/helpers";
import { ACCENT, StatChip } from "@/components/ui";

export default function NapredakPage() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const keys = await storageList("checkin:");
      const items = [];
      for (const key of keys) {
        const val = await storageGet(key);
        if (val) items.push(val);
      }
      items.sort((a, b) => a.timestamp - b.timestamp);
      setCheckins(items);
      setLoading(false);
    })();
  }, []);

  const chartData = checkins.map((c) => ({
    label: c.nedelja ? `N${c.nedelja}` : formatDateSr(c.datum),
    tezina: c.tezina ? Number(c.tezina) : null,
  }));
  const last = checkins.at(-1);
  const first = checkins[0];
  const delta = last && first && last.tezina && first.tezina ? (Number(last.tezina) - Number(first.tezina)).toFixed(1) : null;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[13px] font-semibold tracking-widest text-accent uppercase mb-2">Tvoj napredak</p>
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">Težina, mere i fotografije</h1>
      <p className="text-[13.5px] text-gray-400 mb-8">Podaci iz tvojih poslatih nedeljnih check-inova.</p>

      {loading ? (
        <p className="text-gray-300 text-[13.5px]">Učitavanje...</p>
      ) : checkins.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-[14.5px] text-gray-500 font-medium mb-1">Još nema podataka</p>
          <p className="text-[13px] text-gray-400">Popuni svoj prvi nedeljni check-in da bi ovde video/la napredak.</p>
        </div>
      ) : (
        <>
          {delta !== null && (
            <div className="rounded-2xl p-4 mb-5 flex items-center gap-3 bg-accent/5 border border-accent/10">
              <TrendingUp size={17} className="text-accent" />
              <p className="text-[13.5px] text-gray-700">
                Promena težine od prvog check-ina:{" "}
                <span className="font-semibold" style={{ color: ACCENT }}>
                  {delta > 0 ? "+" : ""}
                  {delta} kg
                </span>
              </p>
            </div>
          )}

          {chartData.length > 1 && (
            <div className="rounded-2xl border border-gray-100 p-4 mb-6">
              <p className="text-[12.5px] font-semibold text-gray-500 mb-3">Kretanje težine</p>
              <ResponsiveContainer width="100%" height={160}>
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
              <p className="text-[12.5px] font-semibold text-gray-500 mb-2.5 flex items-center gap-1.5">
                <Ruler size={13} /> Poslednje mere · {formatDateSr(last.datum)}
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {Object.entries(last.merenja || {}).map(([k, v]) =>
                  v ? <StatChip key={k} icon={<Ruler size={15} />} label={k} value={`${v} cm`} /> : null
                )}
              </div>
            </>
          )}

          <p className="text-[12.5px] font-semibold text-gray-500 mb-2.5">Istorija check-inova</p>
          <div className="space-y-2">
            {checkins
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
          </div>
        </>
      )}
    </div>
  );
}
