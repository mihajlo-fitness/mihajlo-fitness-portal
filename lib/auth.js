"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { createSupabaseBrowserClient } from "./supabase/browserClient";

const AuthContext = createContext({
  ready: false,
  user: null,
  profile: null, // { role: "client" | "coach", ime: string }
  isCoach: false,
  signOut: async () => {},
});

// KLJUČNA POPRAVKA: getUser() poziv ka Supabase-u nema svoj rok — ako
// mreža (npr. antivirus/firewall koji tiho guši konekciju, umesto da je
// jasno odbije) nikad ne vrati odgovor, taj poziv bi zauvek "visio", a
// sa njim i ceo AuthProvider (ready nikad ne postane true, sve portal
// stranice ostaju na "Učitavanje..." zauvek). Ovo mu daje rok od 8
// sekundi — posle toga se tretira kao "nema sesije", ne kao večna pauza.
function withAuthTimeout(promise, ms = 8000) {
  return Promise.race([
    promise,
    new Promise((resolve) =>
      setTimeout(() => {
        console.error(`auth timeout: getUser() nije odgovorio za ${ms}ms`);
        resolve({ data: { user: null }, error: { message: "timeout" } });
      }, ms)
    ),
  ]);
}

export function AuthProvider({ children }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!supabase) {
      // Supabase nije podešen (nema env promenljivih) — auth se ne
      // može koristiti. Ostatak aplikacije i dalje treba da radi za
      // javne stranice.
      setReady(true);
      return;
    }

    let active = true;

    async function loadProfile(currentUser) {
      if (!currentUser) {
        if (active) setProfile(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role, ime")
          .eq("id", currentUser.id)
          .maybeSingle();
        if (!active) return;
        if (error) {
          console.error("loadProfile error", error);
          // Ne blokiramo prijavu ako profil ne uspe da se učita —
          // korisnik je i dalje ulogovan, samo bez uloge (tretira se
          // kao obični klijent dok se ne osveži).
          setProfile({ role: "client", ime: currentUser.email });
          return;
        }
        setProfile(data || { role: "client", ime: currentUser.email });
      } catch (e) {
        console.error("loadProfile threw", e);
        if (active) setProfile({ role: "client", ime: currentUser.email });
      }
    }

    async function init() {
      try {
        const { data, error } = await withAuthTimeout(supabase.auth.getUser());
        if (!active) return;
        if (error) {
          console.error("getUser error", error);
          setUser(null);
        } else {
          setUser(data?.user || null);
          await loadProfile(data?.user || null);
        }
      } catch (e) {
        // Zaštita i dalje ostaje kao druga linija odbrane, ako nešto
        // baci grešku umesto da samo visi.
        console.error("auth init threw", e);
        if (active) setUser(null);
      } finally {
        if (active) setReady(true);
      }
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      setUser(session?.user || null);
      await loadProfile(session?.user || null);
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    // STVARNI UZROK prethodnog problema: signOut() poziv ka Supabase-u
    // preko mreže ("global" scope) briše sesiju kad god konačno završi
    // — a ako to potraje, može se desiti DA SE TO ZAVRŠI POSLE što se
    // korisnik već ponovo prijavio, brišući baš tu novu, ispravnu
    // sesiju bez ikakvog vidljivog znaka da se to desilo.
    //
    // Rešenje: "local" scope čisti sesiju SAMO na ovom uređaju, bez
    // mrežnog poziva koji bi mogao da kasni i pomeša se sa sledećom
    // prijavom. Nema više "zaboravljenog" zahteva koji radi u pozadini.
    setUser(null);
    setProfile(null);
    if (!supabase) return;
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch (e) {
      console.error("signOut threw", e);
    }
  };

  const value = {
    ready,
    user,
    profile,
    isCoach: profile?.role === "coach",
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
