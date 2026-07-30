# Mihajlo Fitness Coach — Klijentski portal

Next.js 14 (App Router) + Tailwind CSS. Mobile-first, responzivan portal za klijente.

## Sekcije
- `/` — Početna
- `/onboarding` — Početni upitnik (popunjava se jednom)
- `/checkin` — Nedeljni check-in
- `/napredak` — Napredak klijenta (grafik težine, mere, istorija)
- `/coaching` — Paketi & Coaching (4 paketa + zahtev)
- `/edukacija` — Edukacija
- `/kontakt` — Kontakt sa trenerom
- `/faq` — FAQ
- `/dokumenti` — Dokumenti za preuzimanje
- `/trener` — Trenerski pregled (dashboard klijenata)

## Dodavanje nove sekcije
1. Napravi folder u `app/` (npr. `app/nova-sekcija/`) i u njemu `page.js`.
2. Dodaj stavku u `lib/navigation.js` — automatski se pojavljuje u navigaciji.

## Baza podataka (Supabase)
Podaci (check-inovi, upitnici) se čuvaju preko `lib/storage.js`:
- Ako su podešene env promenljive `NEXT_PUBLIC_SUPABASE_URL` i
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, podaci idu u Supabase — deljeni su
  i vidljivi sa bilo kog uređaja (trener vidi sve klijente).
- Ako te promenljive nisu podešene, aplikacija se automatski vraća na
  `localStorage` (podaci samo na tom uređaju) — korisno za brzo
  testiranje bez podešavanja baze.

### Podešavanje Supabase-a
1. Napravi nalog na supabase.com i novi projekat.
2. U **SQL Editor**-u pokreni sadržaj fajla `supabase/schema.sql`.
3. U **Project Settings → API** kopiraj `Project URL` i `anon public` ključ.
4. Lokalno: kopiraj `.env.local.example` u `.env.local` i upiši te vrednosti.
5. Na Vercel-u: Project → Settings → Environment Variables → dodaj ista
   dva imena i vrednosti, pa ponovo deploy-uj (Redeploy).

## Zaštita Trenerskog pregleda lozinkom
`/trener` je zaštićen jednostavnom lozinkom preko `middleware.js`:
1. Dodaj env promenljivu `COACH_PASSWORD` (i lokalno u `.env.local` i na
   Vercel-u u Environment Variables) sa svojom tajnom lozinkom.
2. Kad neko pokuša da otvori `/trener` bez prijave, biva preusmeren na
   `/trener/login` gde unosi lozinku.
3. Nakon tačne lozinke, postavlja se siguran (httpOnly) kolačić na 30 dana.

Napomena: ovo sakriva stranicu i sprečava klijente da joj slučajno/lako
pristupe, ali `anon` Supabase ključ i dalje dozvoljava čitanje/pisanje
direktno iz baze bilo kome ko bi ga tehnički pronašao i iskoristio izvan
same aplikacije. Za osetljivije podatke bi trebalo dodati pravu
autentifikaciju na nivou baze (Supabase Auth + stroža RLS pravila).

## Pokretanje lokalno
```bash
npm install
npm run dev
```
