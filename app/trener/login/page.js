"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { ACCENT } from "@/components/ui";

export default function TrenerLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/trener-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push("/trener");
        router.refresh();
      } else {
        setError(data.error || "Pogrešna lozinka.");
      }
    } catch (err) {
      setError("Greška, pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="h-12 w-12 rounded-2xl bg-accent/8 text-accent flex items-center justify-center mb-5">
          <Lock size={20} />
        </div>
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">Trenerski pregled</h1>
        <p className="text-[13.5px] text-gray-400 mb-6">Ova sekcija je zaštićena — unesi lozinku da nastaviš.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          autoFocus
          className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-[15px] outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 mb-3"
        />
        {error && <p className="text-[13px] text-red-500 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          {loading ? "Proveravam..." : "Uđi"}
        </button>
      </form>
    </div>
  );
}
