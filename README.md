# Mihajlo Fitness Coach — javni sajt + klijentski portal

Next.js 14 (App Router) + Tailwind CSS + Supabase (Auth + baza + Storage).
Mobile-first, sa jasno odvojenim javnim sajtom i klijentskim portalom.

## Struktura ruta
Javni sajt (`app/(public)/`, svako ga vidi, bez prijave):
- `/` — Landing page (hero, before/after, paketi, kalkulator, FAQ)
- `/o-meni` — Priča i transformacija
- `/coaching` — Paketi & zahtev za saradnju
- `/kalkulator` — Besplatan fitness kalkulator
- `/faq` — Najčešća pitanja

Klijentski portal (`app/(portal)/`, zahteva prijavu — vidi Auth ispod):
- `/app` — Dashboard (status check-ina, feedback trenera, plan, napredak)
- `/onboarding` — Početni upitnik (jednom)
- `/checkin` — Nedeljni check-in
- `/napredak` — Napredak (samo tvoji podaci)
- `/moj-plan` — Lični plan
- `/edukacija` — Edukacija
- `/dokumenti` — Dokumenti za preuzimanje
- `/kontakt` — Kontakt sa trenerom

Trener (`app/trener/`, zahteva prijavu I ulogu "coach"):
- `/trener` — Dashboard klijenata, zahteva, poruka, plan i feedback po klijentu

## Auth (ko se prijavljuje i kako)
Nema lozinki. Svako (klijent ili trener) se prijavljuje preko **magic link**-a:
1. Ode na `/prijava`, unese email.
2. Dobije mejl sa linkom — klikne, uloguje se, sesija traje dok se ručno ne odjavi.
3. Da li je neko klijent ili trener određuje kolona `role` u tabeli `profiles`
   (podrazumevano `client`, ti ručno postaviš `coach` za sebe — pogledaj
   `supabase/schema.sql`, poslednji komentar u fajlu, tačan SQL za to).

`middleware.js` proverava sesiju na svakom zahtevu ka portal/trener rutama
i preusmerava na `/prijava` ako nema validne sesije.

## Dodavanje nove sekcije
1. Napravi folder u `app/(public)/` (javno) ili `app/(portal)/` (iza prijave), sa `page.js` unutra.
2. Dodaj stavku u `lib/navigation.js` (`PUBLIC_NAV` ili `PORTAL_NAV`).
3. Ako je portal ruta, dodaj njen path u `PORTAL_PATHS` niz u `middleware.js`.

## Baza podataka (Supabase)
Podaci (check-inovi, upitnici, planovi, feedback) čuvaju se preko `lib/storage.js`
u `kv_store` tabeli, zaštićenoj RLS pravilima (svako vidi samo svoje podatke,
trener vidi sve). Ako env promenljive `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`
nisu podešene, aplikacija se vraća na `localStorage` (samo za razvoj/testiranje
— bez prave prijave portal rute tada NISU zaštićene).

### Podešavanje Supabase-a (jednokratno)
1. Napravi nalog na supabase.com i novi projekat.
2. U **SQL Editor**-u pokreni **ceo** sadržaj fajla `supabase/schema.sql`.
3. U **Project Settings → API** kopiraj `Project URL`, `anon public` ključ,
   i `service_role` ključ (klikni "Reveal" da ga vidiš).
4. Lokalno: kopiraj `.env.local.example` u `.env.local` i upiši te vrednosti.
5. Na Vercel-u: Project → Settings → Environment Variables → dodaj ista
   imena i vrednosti, pa ponovo deploy-uj (Redeploy).
6. **Authentication → URL Configuration** — dodaj svoj pravi domen (i
   `/auth/callback` putanju) u "Redirect URLs", inače magic link mejlovi
   neće raditi na produkciji.

## Fotografije (Supabase Storage) — privatan bucket
Fotografije koje klijenti otpreme (onboarding, check-in) čuvaju se u
Supabase Storage bucket-u `photos`, koji mora biti **PRIVATAN** (ne "Public
bucket") — RLS politike u `supabase/schema.sql` garantuju da svaki klijent
vidi samo svoje fotografije, a trener vidi sve. Aplikacija generiše signed
URL (važi godinu dana) za prikaz, umesto trajnog javnog linka.

Podešavanje:
1. Supabase dashboard → **Storage** → **New bucket**
2. Naziv **tačno**: `photos`, **NE** uključuj "Public bucket", **Create**
3. `supabase/schema.sql` (već pokrenut u koraku iznad) postavlja politike
   koje ograničavaju pristup na vlasnika fotografije i trenera.

Ako bucket nije podešen, aplikacija se automatski vraća na fallback (samo
naziv fajla, bez trajnog čuvanja) — ništa se ne kvari, samo fotografije
neće ostati sačuvane.

**Statusi na zahtevima**
U Trenerskom pregledu → tab Zahtevi, klikni na pilulu (Novo/Kontaktiran/Rešeno)
da promeniš status — kruži kroz tri stanja pri svakom kliku.

**Izvoz u CSV**
U tabu Klijenti, dugme "Izvezi sve check-inove (CSV)" preuzima tabelu
svih check-inova svih klijenata — otvara se u Excel-u/Google Sheets-u.

## Edukacija — nova struktura (kategorije → lekcije → pojedinačna lekcija)
Edukacija više nije ravna lista — sada ima tri nivoa:
1. `/edukacija` — pregled kategorija (sa pretragom)
2. `/edukacija/[kategorija]` — lista lekcija u toj kategoriji
3. `/edukacija/[kategorija]/[lekcija]` — pojedinačna lekcija (video, ključne tačke, prethodna/sledeća, slične lekcije)

**Sve se menja na jednom mestu:** `lib/edukacija-data.js`

Da dodaš **novu lekciju** u postojeću kategoriju: nađi tu kategoriju u
`KATEGORIJE` nizu, dodaj novi objekat u njen `lekcije` niz:
```javascript
{
  slug: "jedinstven-slug-lekcije",   // koristi se u URL-u
  naslov: "Naslov lekcije",
  trajanje: "5:12",                  // mm:ss
  opis: "Kratak opis lekcije.",
  kljucneTacke: ["Tačka 1", "Tačka 2", "Tačka 3"],
  video: "https://youtu.be/TVOJ-VIDEO-ID",  // ili "#" bez videa
}
```

Da dodaš **potpuno novu kategoriju**, dodaj novi objekat u `KATEGORIJE`
niz sa istom strukturom (`slug`, `emoji`, `naziv`, `opis`, `lekcije`).

Broj lekcija na kartici kategorije se **računa automatski** iz dužine
niza — nikad ga ne menjaš ručno, ne može da bude netačan.

### Cover (sličica) na kartici lekcije
Trenutno kartice lekcija prikazuju jednostavan plavi placeholder (bez
prave sličice) — ovo je namerna odluka, ne nedostatak. Funkcija za
automatsko povlačenje YouTube sličice postoji u `lib/helpers.js`
(`getYouTubeThumbnail`) ako je ikad budeš želeo da uključiš.

### Ne mora da bude YouTube
Polje `video` prepoznaje automatski:
- **YouTube** link (`youtu.be/...` ili `youtube.com/watch?v=...`) — ugrađeni plejer
- **Vimeo** link (`vimeo.com/123456789`) — ugrađeni plejer
- **Direktan video fajl** (link koji se završava na `.mp4`, `.webm` ili `.mov`) — ugrađeni HTML5 plejer sa kontrolama
- **Bilo koji drugi link** (npr. Google Drive, Dropbox share link) — prikazuje se dugme "Otvori video" koje ga otvara u novom tabu (ne može svaki link da se ugradi direktno)

Preporuka: **YouTube kao "Unlisted"** (nije javno na YouTube pretrazi/kanalu,
ali radi normalno kad se ugradi na sajt) je najjednostavnija i besplatna
opcija bez ograničenja veličine fajla. Direktno otpremanje video fajlova
u sam projekat/GitHub se ne preporučuje — video fajlovi su preveliki za
git i usporavaju/limitiraju ceo repozitorijum.

I ova sekcija je i dalje iza Instagram "otključavanja" (isto kao
Dokumenti) — nema potrebe za dodatnim podešavanjem, radi automatski.

### Dodatne funkcije (progres, "Novo", nivo)
- **Praćenje napretka** — svaka odgledana lekcija se pamti po klijentu
  (localStorage), prikazuje se kao "3/12 odgledano" + traka napretka na
  kartici kategorije, kvačica na kartici lekcije, i kartica
  "Nastavi gde si stao/la" na vrhu glavne Edukacija strane. Ne treba
  ništa da podešavaš — radi automatski čim neko odgleda lekciju.
- **"Novo" bedž** — dodaj lekciji opciono polje `dodato: "2026-08-01"`
  (format GGGG-MM-DD) u `lib/edukacija-data.js`; bedž se sam prikazuje
  7 dana od tog datuma, pa nestaje. Lekcije bez ovog polja nikad ne
  pokazuju bedž — ne moraš ga popunjavati ako ne želiš.
- **Nivo (Početnik/Srednji/Napredan)** — dodaj lekciji opciono polje
  `nivo: "Početnik"` u istom fajlu. Takođe potpuno opciono.
- **Ukupno trajanje po kategoriji** — računa se samo automatski iz
  zbira `trajanje` polja svih lekcija, ne treba ga ručno unositi.

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

U `app/(portal)/dokumenti/page.js` je niz `DOCS` sa placeholder linkovima (`#`).
Da dodaš pravi PDF preko GitHub sajta (bez terminala):
1. Otvori svoj repozitorijum na github.com
2. Uđi u folder `public` → `dokumenti`
3. Klikni **Add file → Upload files**, prevuci svoj PDF, pa **Commit changes**
4. Vrati se u `app/(portal)/dokumenti/page.js` (Edit preko olovke), i u `DOCS` nizu
   promeni `url: "#"` u `url: "/dokumenti/tacno-ime-fajla.pdf"` za taj dokument
5. Commit changes — gotovo, Vercel će automatski objaviti novu verziju

Alternativa bez upload-a fajla u projekat: otpremi PDF na Google Drive,
Share → "Anyone with the link", pa taj link nalepi direktno kao `url`.

## Novo: keep-alive, čuvanje fotografija, statusi, CSV izvoz

**Keep-alive (sprečava pauziranje besplatne Supabase baze)**
`vercel.json` sadrži cron koji jednom dnevno pogodi `/api/keep-alive` i
napravi mali upit ka bazi (preko service role ključa, ne treba ulogovanog
korisnika). Ne treba ništa dodatno da podesiš — počinje da radi čim se
ovo objavi na Vercel-u (Vercel cron radi samo na Production deployment-u).

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

## Lični plan i feedback po klijentu
U Trenerskom pregledu → klikni na klijenta → na vrhu je polje
"Lični plan za [ime]" gde upišeš link ka PDF-u i/ili kratak tekst, i
polje "Feedback na poslednji check-in" za kratku poruku klijentu — oba
se čuvaju posebnim dugmetom. Klijent oboje vidi automatski na `/moj-plan`
i `/napredak` (i na dashboard-u `/app`) — nema više ručnog unosa imena,
vezano je za njegov nalog.

## Nedeljni podsetnik klijentima
Ako je `RESEND_API_KEY` podešen, svake nedelje ujutru (cron u
`vercel.json`) svi klijenti koji su u početnom upitniku ostavili email
dobijaju kratak podsetnik da popune check-in. Klijenti bez unetog
email-a se preskaču (email polje u upitniku je opciono).

## Vidljivost na Google pretrazi (SEO)

**Šta je već urađeno u kodu:**
- Naslov, opis i ključne reči u `app/layout.js` (metadata)
- `app/sitemap.js` — automatska mapa sajta na `/sitemap.xml`
- `app/robots.js` — govori Google-u koje strane da indeksira (početna,
  paketi, edukacija, kontakt, FAQ), a koje da preskoči (check-in forme,
  trenerski pregled — to su privatne/funkcionalne strane, ne sadržaj za
  pretragu)

**VAŽNO — pre nego što se objavi:** postavi `NEXT_PUBLIC_SITE_URL` env
promenljivu (na Vercel-u) na tvoj **stvarni** domen — `app/sitemap.js` i
`app/robots.js` je automatski koriste (proveri tačan link na Vercel
dashboard-u ako još nemaš sopstveni domen).

**Koraci koje uradiš na Google strani (jednokratno, ~10 minuta):**
1. Idi na **search.google.com/search-console**
2. **Add property** → unesi svoj sajt (URL prefix opcija, nalepi pun link, npr. `https://mihajlo-fitness-portal.vercel.app`)
3. Google nudi nekoliko načina verifikacije — najlakši je **HTML tag**:
   kopiraj samo vrednost iz `content="..."` koju ti Google da, i nalepi
   je u `app/layout.js` u `verification: { google: "OVDE" }`
4. Pošalji izmenu na GitHub (`git add . && git commit -m "seo" && git push`), sačekaj deploy
5. Vrati se u Search Console, klikni **Verify**
6. Kad je verifikovano: levi meni → **Sitemaps** → unesi `sitemap.xml` → **Submit**

Posle ovoga, Google počinje da indeksira sajt — obično traje **nekoliko
dana do par nedelja** da se stranice stvarno pojave u pretrazi, to je
normalno i ne može se ubrzati.

**Realno očekivanje:** portal će se brzo pojaviti kad neko pretraži tačno
tvoje ime/brend ("Mihajlo Fitness Coach"). Da bi se pojavio za generičke
pretrage ("fitness trener Beograd" i slično) trebalo bi vremenom dodati
i sadržaj koji ljudi zapravo guglaju (npr. blog/članci) — to je veći,
odvojeni poduhvat ako ti ikad zatreba.

## Besplatni fitness kalkulator
`/kalkulator` — javno dostupna stranica (nije iza Instagram gate-a, za
razliku od Edukacije/Dokumenata — namerno, jer služi kao alat za
privlačenje novih posetilaca).

- Proračuni (BMR, TDEE, kalorije, makroi, BMI) su u `lib/kalkulator.js`,
  odvojeno od UI-a — čista matematika, lako proverljiva i izmenljiva
- BMR: Mifflin-St Jeor jednačina
- Cilj (mršavljenje/održavanje/mišićna masa) koristi umeren
  deficit/suficit (20%/0%/10%), nikad ekstreman, sa bezbednosnim
  minimumom kalorija ispod kog preporuka nikad ne ide
- BMI se prikazuje sa obaveznim upozorenjem da ne uzima u obzir sastav
  tela i ne treba da bude jedini pokazatelj forme
- Na dnu rezultata je CTA ka `/coaching` (postojeća stranica paketa)

## Vizuelno dovršavanje (favicon, OG slika, fotografija, footer, 404)

**Favicon i ikonica** — `app/icon.png` i `app/apple-icon.png`, prepoznaje
ih Next.js automatski, ne treba ništa dodatno da podešavaš.

**Slika za deljenje linka (Open Graph)** — `app/opengraph-image.png`,
prikazuje se automatski kad neko podeli link sajta na Instagramu,
WhatsApp-u, itd. Next.js je automatski prepoznaje, bez dodatnog koda.

**Tvoja fotografija na Početnoj** — trenutno se prikazuje lep placeholder
(ikonica) dok ne dodaš pravu sliku. Da je dodaš:
1. Otpremi svoju fotografiju preko GitHub sajta (isti postupak kao PDF-ovi
   ranije) u folder `public/`
2. Nazovi je **tačno** `mihajlo-photo.jpg` (ako je `.png`, promeni u
   `components/ProfilePhoto.js` putanju `/mihajlo-photo.jpg` u
   `/mihajlo-photo.png`)
3. Čim se objavi, slika se automatski pojavljuje na Početnoj — ne
   treba dalje menjanje koda

**Footer** — `components/Footer.js`, prikazuje se na dnu svake strane,
sa linkom ka Instagramu i email kontaktu (povlači iz `lib/config.js`,
isti podaci koji se koriste svuda drugde).

**Prilagođena 404 strana** — `app/not-found.js`, prikazuje se automatski
kad neko otvori link koji ne postoji na sajtu, u istom vizuelnom stilu
kao ostatak portala.

## "O meni" — redizajnirana, tamna premium sekcija
Ova jedna stranica namerno koristi **drugu paletu** od ostatka sajta
(crna pozadina, plava `#2563eb`, glassmorphism kartice) — cilj joj je
da odmah izgradi poverenje kroz interaktivni before/after prikaz, ne
da prati identičan izgled kao ostale, svetle stranice.

**Interaktivni before/after slider** (`components/BeforeAfterSlider.js`)
— korisnik prevlači da uporedi fotografije. Očekuje dve fotografije:
- `public/mihajlo-pre.jpeg`
- `public/mihajlo-posle.jpeg`

Isti postupak kao za ostale fotografije/PDF-ove — otpremiš preko GitHub
sajta u `public` folder, tačno pod ta dva imena. Dok ih nema, prikazuje
se uredan placeholder umesto polomljene slike.

Tekst priče i highlight box (4 stavke) menjaš direktno u
`app/(public)/o-meni/page.js` — sve je čist tekst, lako za izmenu.

## Pokretanje lokalno
```bash
npm install
npm run dev
```
