import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/app";

  // Supabase ponekad sam doda ove parametre u URL ako je link istekao,
  // već iskorišćen, ili je nešto drugo pošlo naopako PRE nego što je
  // uopšte stigao do razmene koda.
  const supabaseError = searchParams.get("error_description") || searchParams.get("error");
  if (supabaseError) {
    return NextResponse.redirect(
      `${origin}/prijava?error=${encodeURIComponent(supabaseError)}`
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!code) {
    // Nema ni "code" ni "error" parametra u URL-u — link nije stigao u
    // očekivanom obliku uopšte.
    return NextResponse.redirect(
      `${origin}/prijava?error=${encodeURIComponent(
        "Link nije sadržao očekivane podatke (nema code parametra)."
      )}`
    );
  }

  if (!url || !anonKey) {
    return NextResponse.redirect(
      `${origin}/prijava?error=${encodeURIComponent("Supabase env promenljive nisu podešene na serveru.")}`
    );
  }

  const cookieStore = cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // OVO je najvažniji deo — sad ćemo VIDETI tačan razlog neuspeha
    // (npr. "code verifier" problem, istekao link, već iskorišćen link).
    return NextResponse.redirect(
      `${origin}/prijava?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
