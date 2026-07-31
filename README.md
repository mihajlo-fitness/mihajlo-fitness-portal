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

## Edukacija — Instagram "otključavanje" i video lekcije
`/edukacija` je zaključana dok klijent ne klikne "Zapratio/la sam, otključaj"
(na časnu reč — Instagram ne dozvoljava aplikacijama da automatski provere
da li je neko zaista zapratio nalog). Otključavanje se pamti u tom
pregledaču preko `localStorage`, pa ne mora ponovo svaki put.

- Instagram korisničko ime se menja na jednom mestu: `lib/config.js`
- Lekcije se dodaju u `LEKCIJE` niz u `app/edukacija/page.js`. Ako je
  `link` YouTube URL (`youtu.be/...` ili `youtube.com/watch?v=...`),
  video se automatski prikazuje kao ugrađeni plejer unutar aplikacije
  (klijent ne napušta portal). Bilo koji drugi link se otvara u novom tabu.

## Kako da menjaš sadržaj bez terminala (preko GitHub sajta)
Za ovakve male izmene (dodavanje lekcije, menjanje linka, dodavanje PDF-a)
ne moraš da koristiš Command Prompt/git komande — može sve direktno na
github.com u pregledaču:

1. Otvori svoj repozitorijum na github.com
2. Klikni kroz foldere do fajla koji menjaš (npr. `app` → `edukacija` → `page.js`)
3. Klikni na ikonicu **olovke** (Edit this file) gore desno
4. Izmeni tekst direktno u browseru
5. Skroluj dole, ukucaj kratak opis izmene, klikni **Commit changes**
6. Vercel automatski napravi novi deploy za 1-2 minuta — gotovo

## Dokumenti — kako da postaviš prave PDF-ove
`/dokumenti` je (kao i Edukacija) zaključana istim Instagram "otključavanjem"
— kad neko otključa jednu stranicu, otključana mu je i druga (isti kolačić/localStorage).

U `app/dokumenti/page.js` je niz `DOCS` sa placeholder linkovima (`#`).
Da dodaš pravi PDF preko GitHub sajta (bez terminala):
1. Otvori svoj repozitorijum na github.com
2. Uđi u folder `public` → `dokumenti`
3. Klikni **Add file → Upload files**, prevuci svoj PDF, pa **Commit changes**
4. Vrati se u `app/dokumenti/page.js` (Edit preko olovke), i u `DOCS` nizu
   promeni `url: "#"` u `url: "/dokumenti/tacno-ime-fajla.pdf"` za taj dokument
5. Commit changes — gotovo, Vercel će automatski objaviti novu verziju

Alternativa bez upload-a fajla u projekat: otpremi PDF na Google Drive,
Share → "Anyone with the link", pa taj link nalepi direktno kao `url`.

## Novo: keep-alive, čuvanje fotografija, statusi, CSV izvoz

**Keep-alive (sprečava pauziranje besplatne Supabase baze)**
`vercel.json` sadrži cron koji jednom dnevno pogodi `/api/keep-alive` i
napravi mali upit ka bazi. Ne treba ništa dodatno da podesiš — počinje
da radi čim se ovo objavi na Vercel-u (Vercel cron radi samo na
Production deployment-u).

**Prave fotografije (Supabase Storage)**
Fotografije koje klijenti otpreme sada se trajno čuvaju (ranije su se
samo privremeno prikazivale). Potrebno je jednokratno podešavanje:
1. Supabase dashboard → **Storage** → **New bucket**
2. Naziv **tačno**: `photos`, uključi **Public bucket**, **Create**
3. U **SQL Editor**-u pokreni deo `supabase/schema.sql` ispod "FOTOGRAFIJE"
   (ako si već pokrenuo/la ceo fajl ranije, samo dodaj taj novi deo)

Ako bucket nije podešen, aplikacija se automatski vraća na stari
fallback (samo naziv fajla, bez trajnog čuvanja) — ništa se ne kvari.

**Statusi na zahtevima**
U Trenerskom pregledu → tab Zahtevi, klikni na pilulu (Novo/Kontaktiran/Rešeno)
da promeniš status — kruži kroz tri stanja pri svakom kliku.

**Izvoz u CSV**
U tabu Klijenti, dugme "Izvezi sve check-inove (CSV)" preuzima tabelu
svih check-inova svih klijenata — otvara se u Excel-u/Google Sheets-u.

## Email obaveštenja (novi check-in / zahtev / poruka)
Koristi se **Resend** (resend.com) — besplatan nalog:
1. Napravi nalog na resend.com
2. **API Keys** → Create API Key → kopiraj ključ (počinje sa `re_...`)
3. Dodaj env promenljivu `RESEND_API_KEY` (lokalno u `.env.local` i na
   Vercel-u u Environment Variables)
4. Bez verifikacije sopstvenog domena, email stiže sa adrese
   `onboarding@resend.dev` — to je u redu za početak; kasnije se može
   podesiti da stiže sa tvog domena ako ga budeš imao
5. Adresa na koju stižu obaveštenja je u `lib/config.js` (`COACH_EMAIL`)

Ako `RESEND_API_KEY` nije podešen, aplikacija normalno radi dalje —
samo bez slanja email-ova (forme se i dalje čuvaju u bazi kao i pre).

## Lični plan po klijentu
U Trenerskom pregledu → klikni na klijenta → na vrhu je polje
"Lični plan za [ime]" gde upišeš link ka PDF-u (npr. iz
`public/dokumenti/` ili Google Drive) i/ili kratak tekst, pa
"Sačuvaj plan". Klijent ga vidi na `/moj-plan` kad unese svoje ime
(tačno onako kako ga je uneo/la u check-in formi).

## Nedeljni podsetnik klijentima
Ako je `RESEND_API_KEY` podešen, svake nedelje ujutru (cron u
`vercel.json`) svi klijenti koji su u početnom upitniku ostavili email
dobijaju kratak podsetnik da popune check-in. Klijenti bez unetog
email-a se preskaču (email polje u upitniku je opciono).

## Pokretanje lokalno
```bash
npm install
npm run dev
```
