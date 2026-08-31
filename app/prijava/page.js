"use client";

import { useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, KeyRound } from "lucide-react";
import { ACCENT } from "@/components/ui";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { notifyCoach } from "@/lib/notify";

// Ista zaštita kao svuda drugde u projektu — ako Supabase ne odgovori u
// razumnom roku, ne čekamo zauvek nego pokažemo grešku.
function withTimeout(promise, fallback, ms = 12000) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function PrijavaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/app";
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  // step: "email" -> "code" -> (redirect on success)
  const [step, setStep] = useState("email");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");
  const supabaseRef = useRef(null);

  function getSupabase() {
    if (!supabaseRef.current) supabaseRef.current = createSupabaseBrowserClient();
    return supabaseRef.current;
  }

  const handleSendCode = async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      setError("Prijava trenutno nije podešena. Javi se treneru direktno.");
      return;
    }
    setStatus("sending");
    setError("");
    // shouldCreateUser: true — prvi put kad neko unese svoj email, nalog
    // se automatski pravi (klijent), bez posebnog registracionog koraka.
    const { error: err } = await withTimeout(
      supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      }),
      { error: { message: "Isteklo je vreme čekanja na server. Proveri internet i pokušaj ponovo." } }
    );
    if (err) {
      setStatus("error");
      setError(err.message || "Nešto nije u redu, proveri email adresu i pokušaj ponovo.");
      return;
    }
    setStatus("idle");
    setStep("code");
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setStatus("sending");
    setError("");
    // KLJUČNA RAZLIKA od magic link-a: ovo se dešava OVDE, u istom
    // prozoru/tabu gde je korisnik već prisutan — nema klika na link u
    // mejlu, nema prebacivanja u drugi browser/aplikaciju, pa nema ni
    // "code verifier" greške koja je nastajala kad se link otvori u
    // drugom kontekstu od onog gde je prijava započeta.
    const verifyResult = await withTimeout(
      supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      }),
      { error: { message: "Isteklo je vreme čekanja na server. Proveri internet i pokušaj ponovo." } }
    );
    const err = verifyResult.error;
    if (err) {
      setStatus("error");
      setError(
        err.message === "Token has expired or is invalid"
          ? "Kod nije tačan ili je istekao. Proveri da li si prekucao/la poslednji kod koji ti je stigao."
          : err.message || "Nešto nije u redu, proveri kod i pokušaj ponovo."
      );
      return;
    }

    // Obaveštenje treneru SAMO pri PRVOJ, novoj prijavi — ne svaki put
    // kad se neko vrati. Nalog star manje od minut vremena znači da je
    // upravo napravljen (znak da je ovo prvi put da neko ulazi), ne
    // postojeći klijent koji se ponovo prijavljuje.
    try {
      const createdAt = new Date(verifyResult?.data?.user?.created_at || 0).getTime();
      const isNoviNalog = createdAt && Date.now() - createdAt < 60000;
      if (isNoviNalog) {
        notifyCoach(
          `Nova prijava na portal: ${email}`,
          `${email} se upravo prvi put prijavio/la na portal. Još nije popunio/la početni upitnik — proveri Trenerski pregled za detalje kad ga popuni.`
        );
      }
    } catch (e) {
      // Obaveštenje je "nice to have", ne sme da spreči prijavu ako
      // nešto ovde pukne.
      console.error("notify on signup failed", e);
    }

    router.push(next);
    router.refresh();
  };

  if (step === "code") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
          <div className="h-12 w-12 rounded-2xl bg-accent/8 text-accent flex items-center justify-center mb-5">
            <KeyRound size={20} />
          </div>
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">Unesi kod</h1>
          <p className="text-[13.5px] text-gray-400 mb-6">
            Poslali smo kod od 6 cifara na <span className="text-gray-700 font-medium">{email}</span>. Prekucaj ga
            ispod.
          </p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            autoFocus
            className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-[22px] tracking-[6px] text-center font-semibold outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 mb-3"
          />
          {error && <p className="text-[13px] text-red-500 mb-3 break-words">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending" || code.length < 4}
            className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 mb-3"
            style={{ background: ACCENT }}
          >
            {status === "sending" ? "Proveravam..." : "Potvrdi i uđi"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
              setStatus("idle");
            }}
            className="w-full h-[44px] rounded-2xl text-gray-400 font-medium text-[13.5px]"
          >
            Pošalji drugi email
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <form onSubmit={handleSendCode} className="w-full max-w-xs">
        <div className="h-12 w-12 rounded-2xl bg-accent/8 text-accent flex items-center justify-center mb-5">
          <Mail size={20} />
        </div>
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">Prijava</h1>
        <p className="text-[13.5px] text-gray-400 mb-6">
          Unesi email koji si dao/la treneru — poslaćemo ti kod od 6 cifara, bez lozinke.
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tvoj@email.com"
          autoFocus
          className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-[15px] outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 mb-3"
        />
        {error && <p className="text-[13px] text-red-500 mb-3 break-words">{error}</p>}
        <button
          type="submit"
          disabled={status === "sending" || !email}
          className="w-full h-[52px] rounded-2xl text-white font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          {status === "sending" ? "Šaljem..." : "Pošalji kod za prijavu"}
        </button>
      </form>
    </div>
  );
}

export default function PrijavaPage() {
  return (
    <Suspense fallback={null}>
      <PrijavaForm />
    </Suspense>
  );
}
