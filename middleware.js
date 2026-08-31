import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const PORTAL_PATHS = [
  "/app",
  "/checkin",
  "/napredak",
  "/moj-plan",
  "/onboarding",
  "/dokumenti",
];

function isPortalPath(pathname) {
  return PORTAL_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

// Simbol koji razlikuje "STVARNO nema sesije" od "nismo stigli da
// proverimo na vreme" — VAŽNO: ovo drugo NE SME da se tretira kao
// odjava. Ako Supabase privremeno kasni, ne želimo da izbacimo
// legitimno ulogovanog korisnika — bolje pustiti zahtev da prođe
// (stranica se ionako oslanja na RLS za stvarnu zaštitu podataka) nego
// pogrešno ga vratiti na /prijava.
const TIMEOUT = Symbol("timeout");

function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(TIMEOUT), ms)),
  ]);
}

export async function middleware(request) {
  const host = request.headers.get("host") || "";
  const isVercelDomain = host.endsWith(".vercel.app");

  // Vercel ne dozvoljava da se ta automatska adresa potpuno ugasi (poznato
  // ograničenje njihove platforme) — ali MOŽE se svako ko je otvori odmah
  // preusmeriti na pravi domen, umesto da ikad vidi sadržaj tamo. Ovo je
  // praktično isto kao da adresa "ne postoji" za posetioca.
  if (isVercelDomain) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://mihajlofitness.fit");
    return NextResponse.redirect(target, 301);
  }

  // Ova funkcija se poziva na SVAKOM izlazu iz middleware-a (ne samo na
  // početku) da to zaglavlje sigurno stoji na svakom odgovoru, čak i
  // kad se response objekat iznova pravi (npr. pri osvežavanju sesije).
  function finish(res) {
    if (isVercelDomain) res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return finish(response);
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { pathname } = request.nextUrl;
  const isTrenerPath = pathname === "/trener" || pathname.startsWith("/trener/");
  const isProtected = isTrenerPath || isPortalPath(pathname);

  // Ako ruta uopšte nije zaštićena, nema potrebe ni da pokušavamo
  // proveru sesije — brže i jednostavnije.
  if (!isProtected) {
    return finish(response);
  }

  const result = await withTimeout(supabase.auth.getUser());

  if (result === TIMEOUT) {
    // Provera sesije nije stigla na vreme — NE tretiramo ovo kao
    // "nije ulogovan". Puštamo zahtev dalje; sama stranica i dalje ne
    // može da pročita tuđe podatke (RLS to garantuje nezavisno od
    // middleware-a), pa nema bezbednosnog rizika u ovom "fail open"
    // pristupu — samo izbegavamo lažno izbacivanje pravog korisnika.
    console.error(`middleware timeout: getUser() nije odgovorio za rutu ${pathname}`);
    return finish(response);
  }

  const {
    data: { user },
  } = result;

  if (isTrenerPath) {
    if (!user) {
      return finish(NextResponse.redirect(new URL(`/prijava?next=${encodeURIComponent(pathname)}`, request.url)));
    }
    const profileResult = await withTimeout(
      supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    );
    if (profileResult === TIMEOUT) {
      // Isto pravilo — ne izbacujemo trenera zbog privremenog kašnjenja.
      console.error(`middleware timeout: profile provera nije odgovorila za /trener`);
      return finish(response);
    }
    if (profileResult.data?.role !== "coach") {
      return finish(NextResponse.redirect(new URL("/app", request.url)));
    }
    return finish(response);
  }

  if (!user) {
    return finish(NextResponse.redirect(new URL(`/prijava?next=${encodeURIComponent(pathname)}`, request.url)));
  }
  return finish(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image.png|dokumenti/.*\\.pdf).*)",
  ],
};
