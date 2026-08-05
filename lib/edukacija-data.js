// 👉 Ovde dodaješ nove kategorije i lekcije. Broj lekcija na kartici
// računa se automatski iz dužine niza — ne treba ga ručno menjati.
//
// Svaka lekcija: naslov, trajanje (mm:ss), opis, ključne tačke (niz
// kratkih rečenica), i video (YouTube link — automatski se prikazuje
// kao ugrađeni plejer; ako je "#", prikazuje se samo placeholder).

export const KATEGORIJE = [
  {
    slug: "pocetak-treninga",
    emoji: "🏋️",
    naziv: "Početak treninga",
    opis: "Sve što treba da znaš pre prvog treninga.",
    lekcije: [
      {
        slug: "prva-nedelja-u-teretani",
        naslov: "Prva nedelja u teretani — šta očekivati",
        trajanje: "1:19",
        opis: "Šta možeš da očekuješ od edukacije i zašto ne treba da dozvoliš strahu da te spreči da počneš.",
        nivo: "Početnik",
        kljucneTacke: [
          "Većina ljudi u teretani ne obraća pažnju na tebe",
          "Ne moraš da budeš spreman pre nego što počneš",
          "Kroz devet lekcija prolazimo kroz sve što ti treba za prve korake",
          "Svi koji danas znaju šta rade nekada su bili početnici"
        ],
        video: "https://youtube.com/shorts/7-Hcmx3zZnw",
      },
      {
        slug: "kako-izabrati-tezinu",
        naslov: "Kako izabrati početnu težinu",
        trajanje: "4:03",
        opis: "Praktičan način da odrediš sa kojom težinom da kreneš kod svake vežbe.",
        kljucneTacke: [
          "Poslednja 2-3 ponavljanja treba da budu izazovna, ne nemoguća",
          "Bolje je krenuti lakše i napredovati nego povrediti se prvog dana",
          "Forma uvek ima prednost nad težinom",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "tehnika-vezbi",
    emoji: "🎯",
    naziv: "Tehnika vežbi",
    opis: "Pravilno izvođenje svih osnovnih vežbi.",
    lekcije: [
      {
        slug: "pravilan-cucanj",
        naslov: "Pravilan čučanj — kompletan vodič",
        trajanje: "6:40",
        opis: "Tehnika čučnja korak po korak, uz najčešće greške koje ljudi prave.",
        kljucneTacke: [
          "Kolena prate pravac stopala, ne upadaju unutra",
          "Težina ravnomerno raspoređena kroz celo stopalo",
          "Dubina čučnja zavisi od mobilnosti kukova i skočnih zglobova",
        ],
        video: "https://youtu.be/dQw4w9WgXcQ",
      },
      {
        slug: "mrtvo-dizanje-tehnika",
        naslov: "Mrtvo dizanje bez bola u leđima",
        trajanje: "7:15",
        opis: "Kako da izvodiš mrtvo dizanje bezbedno i efikasno, bez opterećenja donjeg dela leđa.",
        nivo: "Srednji",
        kljucneTacke: [
          "Leđa ostaju neutralna kroz ceo pokret, ne zaobljena",
          "Šipka se kreće što bliže telu",
          "Pokret počinje iz kukova, ne iz leđa",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "ishrana",
    emoji: "🍽️",
    naziv: "Ishrana",
    opis: "Kalorije, proteini, recepti i planiranje ishrane.",
    lekcije: [
      {
        slug: "osnove-kalorijskog-deficita",
        naslov: "Osnove kalorijskog deficita",
        trajanje: "5:50",
        opis: "Šta je kalorijski deficit, kako ga izračunati i zašto je jedini pravi uslov za mršavljenje.",
        kljucneTacke: [
          "Deficit = trošiš više energije nego što uneseš",
          "Ne mora biti drastičan da bi radio",
          "Prevelik deficit usporava napredak, ne ubrzava ga",
        ],
        video: "https://youtu.be/dQw4w9WgXcQ",
      },
      {
        slug: "koliko-proteina-mi-treba",
        naslov: "Koliko proteina ti stvarno treba",
        trajanje: "4:28",
        opis: "Praktična formula za dnevni unos proteina, bez komplikovanja.",
        kljucneTacke: [
          "1g proteina po kg telesne težine je solidna polazna tačka",
          "Raspoređivanje kroz dan pomaže, ali nije presudno",
          "Izvor proteina je manje bitan od ukupne količine",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "trening",
    emoji: "💪",
    naziv: "Trening",
    opis: "Programi, progres i izgradnja mišića.",
    lekcije: [
      {
        slug: "progresivno-preopterecenje",
        naslov: "Šta je progresivno preopterećenje",
        trajanje: "5:05",
        opis: "Princip bez kog nema dugoročnog napretka — objašnjen jednostavno.",
        nivo: "Srednji",
        dodato: "2026-07-28",
        kljucneTacke: [
          "Telo se prilagođava — mora dobijati malo veći izazov vremenom",
          "Napredak može biti u težini, ponavljanjima ili kontroli pokreta",
          "Ne mora se dešavati svaki trening, ali mora postojati trend",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "oporavak",
    emoji: "😴",
    naziv: "Oporavak",
    opis: "San, regeneracija i prevencija povreda.",
    lekcije: [
      {
        slug: "zasto-je-san-bitan",
        naslov: "Zašto je san bitniji od dodatnog treninga",
        trajanje: "4:44",
        opis: "Veza između sna i napretka koju većina ljudi ignoriše.",
        kljucneTacke: [
          "Mišić raste dok se odmara, ne dok se vežba",
          "Loš san direktno utiče na apetit i odluke o ishrani",
          "7-9h sna je realan cilj za većinu odraslih",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "mindset",
    emoji: "🧠",
    naziv: "Mindset",
    opis: "Motivacija, disciplina i izgradnja navika.",
    lekcije: [
      {
        slug: "motivacija-vs-disciplina",
        naslov: "Motivacija protiv discipline — šta stvarno radi",
        trajanje: "5:30",
        opis: "Zašto se ne oslanjati na motivaciju, i šta da radiš umesto toga.",
        kljucneTacke: [
          "Motivacija dolazi i odlazi — to je normalno, ne neuspeh",
          "Navika ne traži odluku svaki put — to je njena prednost",
          "Mali, dosledni koraci pobeđuju povremene velike napore",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "suplementi",
    emoji: "💊",
    naziv: "Suplementi",
    opis: "Šta vredi kupiti, a šta ne.",
    lekcije: [
      {
        slug: "koji-suplementi-vrede",
        naslov: "Koji suplementi zaista vrede novca",
        trajanje: "6:12",
        opis: "Pošten pregled — šta ima naučnu podlogu, a šta je marketing.",
        kljucneTacke: [
          "Kreatin i protein prah imaju najviše dokaza iza sebe",
          "Nijedan suplement ne zamenjuje osnove — ishranu, san, trening",
          "'Fat burner' proizvodi retko rade ono što obećavaju",
        ],
        video: "#",
      },
    ],
  },
  {
    slug: "coaching",
    emoji: "👨‍🏫",
    naziv: "Coaching",
    opis: "Kako izgleda saradnja sa mnom.",
    lekcije: [
      {
        slug: "kako-izgleda-saradnja",
        naslov: "Kako izgleda saradnja od prvog dana",
        trajanje: "3:58",
        opis: "Šta se dešava od trenutka kad se prijaviš do prvog rezultata.",
        kljucneTacke: [
          "Prvi korak je uvek kratak razgovor o cilju i situaciji",
          "Nedeljni check-in je srce cele saradnje",
          "Plan se prilagođava tebi, ne obrnuto",
        ],
        video: "#",
      },
    ],
  },
];

export function getKategorija(slug) {
  return KATEGORIJE.find((k) => k.slug === slug) || null;
}

// Sabira sva trajanja (format "mm:ss") lekcija u kategoriji i vraća
// čitljiv tekst, npr. "45 min" ili "1h 12min".
export function ukupnoTrajanjeKategorije(kategorija) {
  let ukupnoSekundi = 0;
  for (const lek of kategorija.lekcije) {
    const [min, sek] = (lek.trajanje || "0:00").split(":").map(Number);
    ukupnoSekundi += (min || 0) * 60 + (sek || 0);
  }
  const ukupnoMinuta = Math.round(ukupnoSekundi / 60);
  if (ukupnoMinuta < 60) return `${ukupnoMinuta} min`;
  const h = Math.floor(ukupnoMinuta / 60);
  const m = ukupnoMinuta % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// Da li je lekcija dodata u poslednjih 7 dana (za "Novo" bedž).
// Lekcije bez "dodato" polja jednostavno nikad ne pokazuju bedž.
export function jeNovo(lekcija) {
  if (!lekcija.dodato) return false;
  const dodatoDatum = new Date(lekcija.dodato);
  if (isNaN(dodatoDatum)) return false;
  const razlikaDana = (Date.now() - dodatoDatum.getTime()) / (1000 * 60 * 60 * 24);
  return razlikaDana >= 0 && razlikaDana <= 7;
}

export function getLekcija(katSlug, lekSlug) {
  const kat = getKategorija(katSlug);
  if (!kat) return null;
  const lekcija = kat.lekcije.find((l) => l.slug === lekSlug) || null;
  return lekcija ? { kategorija: kat, lekcija } : null;
}

export function pretraziLekcije(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const rezultati = [];
  for (const kat of KATEGORIJE) {
    for (const lek of kat.lekcije) {
      if (
        lek.naslov.toLowerCase().includes(q) ||
        lek.opis.toLowerCase().includes(q) ||
        kat.naziv.toLowerCase().includes(q)
      ) {
        rezultati.push({ kategorija: kat, lekcija: lek });
      }
    }
  }
  return rezultati;
}
