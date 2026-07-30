# Mihajlo Fitness Coach — Klijentski portal

Next.js 14 (App Router) + Tailwind CSS. Mobile-first, responzivan portal za klijente.

## Sekcije
- `/` — Početna
- `/onboarding` — Početni upitnik (popunjava se jednom)
- `/checkin` — Nedeljni check-in
- `/napredak` — Napredak klijenta (grafik težine, mere, istorija)
- `/ishrana` — Plan ishrane
- `/treninzi` — Plan treninga
- `/edukacija` — Edukacija
- `/kontakt` — Kontakt sa trenerom
- `/faq` — FAQ
- `/dokumenti` — Dokumenti za preuzimanje
- `/trener` — Trenerski pregled (dashboard klijenata)

## Dodavanje nove sekcije
1. Napravi folder u `app/` (npr. `app/nova-sekcija/`) i u njemu `page.js`.
2. Dodaj stavku u `lib/navigation.js` — automatski se pojavljuje u navigaciji.

Sadržajne stranice (ishrana, treninzi, edukacija, faq, dokumenti) su građene
oko jednostavnih nizova na vrhu fajla — dodavanje novog obroka, treninga,
lekcije ili pitanja je samo dodavanje jednog objekta u niz.

## Pokretanje lokalno
```bash
npm install
npm run dev
```

## Čuvanje podataka
Trenutno se podaci (check-inovi, upitnici) čuvaju u `localStorage`
pregledača — rade odmah, bez podešavanja, ali su vidljivi samo na uređaju
na kom su uneti. Za pravi deljeni pregled (trener vidi klijente sa svog
uređaja) potrebno je povezati bazu podataka (npr. Supabase, Vercel Postgres).
Sav storage kod je izolovan u `lib/storage.js` — kad budeš spreman/na,
menja se samo taj fajl.
