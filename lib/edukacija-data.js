// 👉 Ovde dodaješ nove kategorije i lekcije. Broj lekcija na kartici
// računa se automatski iz dužine niza — ne treba ga ručno menjati.
//
// Svaka lekcija: naslov, trajanje (mm:ss), opis, ključne tačke (niz
// kratkih rečenica), i video (YouTube link — automatski se prikazuje
// kao ugrađeni plejer; ako je "#", prikazuje se samo placeholder).
//
// Kompletan kurs od 7 modula, 60 lekcija — od prvog ulaska u teretanu
// do samostalnog treninga, ishrane i dugoročne doslednosti.

export const KATEGORIJE = [
  {
    slug: "pocetak-treninga",
    emoji: "🏋️",
    naziv: "Početak treninga",
    opis: "Sve što ti treba da znaš pre nego što zakoračiš u teretanu prvi put — od toga šta da očekuješ, do toga kako da preživiš prve nedelje bez panike i nesigurnosti.",
    lekcije: [
      { slug: "dobrodoslica-pre-prvog-treninga", naslov: "Dobrodošao — šta treba da znaš pre prvog treninga", trajanje: "4:15", opis: "Uvodna lekcija koja smiruje najveći strah početnika — da će izgledati čudno ili da neće znati šta radi. Postavlja ton za ceo kurs.", kljucneTacke: ["Svako je nekad bio početnik — niko ne gleda te onako kako misliš", "Ne moraš da znaš sve vežbe pre prvog dolaska", "Cilj prve nedelje je da se snađeš u prostoru, ne da impresioniraš nekoga"], video: "https://youtube.com/shorts/7-Hcmx3zZnw" },
      { slug: "bonton-pravila-teretane", naslov: "Bonton i pravila ponašanja u teretani", trajanje: "5:30", opis: "Nepisana pravila koja niko ne objašnjava, a svi ih očekuju — od vraćanja tegova do deljenja opreme.", kljucneTacke: ["Uvek vrati tegove i šipke na svoje mesto posle korišćenja", "Pitaj pre nego što se ubaciš u seriju drugoj osobi ('radiš li još?')", "Peškir i brisanje sprava posle znojenja nije opcionalno", "Slušalice ne znače da niko ne postoji oko tebe — ostani svestan/na prostora"], video: "https://youtube.com/shorts/CfMkvLy7bSg" },
      { slug: "prvi-trening-korak-po-korak", naslov: "Kako izgleda prvi trening korak po korak", trajanje: "6:45", opis: "Doslovan hodogram — od ulaska u teretanu do izlaska — da prvi put dođeš sa planom, ne sa haosom u glavi.", kljucneTacke: ["Zagrevanje, zatim glavni deo, zatim istezanje — uvek tim redom", "Ne moraš da uradiš sve mašine prvi put, 4-5 vežbi je dovoljno", "Pauze između serija su deo treninga, ne gubljenje vremena"], video: "https://youtube.com/shorts/Ef578ah0S1U" },
      { slug: "zagrevanje-pre-treninga", naslov: "Zagrevanje pre treninga", trajanje: "5:00", opis: "Zašto zagrevanje nije opcionalno i kako da ga uradiš za 5-10 minuta bez gubljenja energije za glavni trening.", kljucneTacke: ["Cilj je podizanje telesne temperature i pripremanje zglobova, ne zamor", "Lagan kardio + dinamičko istezanje je bolja kombinacija od statičkog istezanja pre treninga", "Prvi set svake vežbe radi sa manjom težinom kao dodatno zagrevanje"], video: "https://youtube.com/shorts/QEQlc9MuBF8" },
      { slug: "koliko-treba-da-traje-trening", naslov: "Koliko dugo treba da traje trening", trajanje: "3:50", opis: "Realno očekivanje trajanja treninga — i zašto duže ne znači bolje.", kljucneTacke: ["45-60 minuta je solidan okvir za većinu ciljeva", "Kvalitet i fokus su bitniji od broja minuta provedenih u teretani", "Predug trening često znači prekratke pauze ili gubljenje fokusa"], video: "https://youtube.com/shorts/lLkvxb4yrv8" },
      { slug: "kako-izabrati-pocetnu-tezinu", naslov: "Kako izabrati početnu težinu", trajanje: "4:40", opis: "Praktičan način da odrediš sa kojom težinom da kreneš kod svake vežbe, bez nagađanja.", kljucneTacke: ["Poslednja 2-3 ponavljanja treba da budu izazovna, ne nemoguća", "Bolje je krenuti lakše i napredovati nego povrediti se prvog dana", "Forma uvek ima prednost nad težinom na šipki"], video: "https://youtube.com/shorts/2YGsglPs-D0" },
      { slug: "odmor-izmedju-serija", naslov: "Odmor između serija", trajanje: "3:35", opis: "Koliko dugo stvarno treba da se odmaraš između serija, i zašto se ovo razlikuje po cilju.", kljucneTacke: ["60-90 sekundi za većinu vežbi kod početnika je solidan okvir", "Teže, složene vežbe (čučanj, mrtvo dizanje) zaslužuju duži odmor", "Skraćivanje odmora radi 'brzine' često vodi u lošiju formu"], video: "https://youtube.com/shorts/q69t3kUfLqQ" },
      { slug: "najcesce-greske-pocetnika", naslov: "Najčešće greške početnika", trajanje: "6:10", opis: "Pregled grešaka koje skoro svaki početnik napravi — da ih ti preskočiš unapred.", kljucneTacke: ["Prevelika težina prerano, na uštrb forme", "Preskakanje nogu i fokus samo na 'vidljive' mišiće", "Menjanje programa svake nedelje pre nego što mu se da vremena da radi", "Poređenje sopstvenog početka sa tuđim mesecima/godinama napretka"], video: "https://youtube.com/shorts/mG5HdAoG7mQ" },
      { slug: "sta-ocekivati-prve-nedelje", naslov: "Šta očekivati u prvim nedeljama treninga", trajanje: "5:20", opis: "Realna vremenska linija — šta ćeš osećati i primetiti u prvih 2-4 nedelje, da ne odustaneš misleći da nešto ne radi.", kljucneTacke: ["Bol u mišićima (DOMS) prve 1-2 nedelje je normalan, ne znak problema", "Snaga raste brže od vidljivih promena na telu u početku", "Najveći rizik za odustajanje je u nedelji 2-3, kad prođe početni entuzijazam"], video: "https://youtube.com/shorts/P6iqLZKybqU" },
    ],
  },
  {
    slug: "tehnika-vezbi",
    emoji: "🎯",
    naziv: "Tehnika vežbi",
    opis: "Pravilno izvođenje osnovnih pokreta na kojima se gradi sve ostalo. Uči te da prepoznaš i ispraviš grešku pre nego što postane povreda ili loša navika.",
    lekcije: [
      { slug: "zasto-je-tehnika-vaznija-od-tezine", naslov: "Zašto je tehnika važnija od težine na šipki", trajanje: "4:20", opis: "Temeljna lekcija pre svih ostalih — zašto forma dolazi pre ega, i šta zapravo gradi rezultat.", kljucneTacke: ["Loša forma sa velikom težinom gradi povredu, ne mišić", "Kontrola pokreta je znak napretka koliko i broj na šipki", "Tehnika se uči sporo i namerno, ne slučajno usput"], video: "https://youtube.com/shorts/gGejzFLnL_0" },
      { slug: "pet-osnovnih-pokreta-tela", naslov: "5 osnovnih pokreta koje svako telo treba da zna", trajanje: "6:00", opis: "Čučanj, savijanje kuka, guranje, povlačenje i nošenje — svaka vežba u teretani je varijacija ovih pet pokreta.", kljucneTacke: ["Squat (čučanj), hinge (savijanje kuka), push, pull, carry", "Razumevanje ovih obrazaca ti pomaže da 'pročitaš' bilo koju novu vežbu", "Svaki trening treba da dodirne većinu ovih pokreta tokom nedelje"], video: "#" },
      { slug: "pravilan-cucanj-vodic", naslov: "Pravilan čučanj — kompletan vodič", trajanje: "7:10", opis: "Tehnika čučnja korak po korak, uz najčešće greške koje ljudi prave i kako da ih ispraviš.", kljucneTacke: ["Kolena prate pravac stopala, ne upadaju unutra", "Težina ravnomerno raspoređena kroz celo stopalo", "Dubina čučnja zavisi od mobilnosti kukova i skočnih zglobova", "Leđa ostaju u neutralnom položaju kroz ceo pokret"], video: "#" },
      { slug: "mrtvo-dizanje-bez-bola", naslov: "Mrtvo dizanje bez bola u leđima", trajanje: "7:45", opis: "Kako da izvodiš mrtvo dizanje bezbedno i efikasno, bez opterećenja donjeg dela leđa.", kljucneTacke: ["Leđa ostaju neutralna kroz ceo pokret, ne zaobljena", "Šipka se kreće što bliže telu tokom celog dizanja", "Pokret počinje iz kukova, ne iz leđa", "Stezanje trbušnih mišića pre podizanja štiti kičmu"], video: "#" },
      { slug: "bench-press-tehnika", naslov: "Bench press — tehnika i najčešće greške", trajanje: "6:30", opis: "Pravilna tehnika potiskivanja sa klupe, uključujući poziciju ramena i stopala koju većina početnika ignoriše.", kljucneTacke: ["Lopatice povučene i 'zaključane' pre prvog ponavljanja", "Stopala čvrsto na podu tokom celog pokreta", "Šipka se spušta ka donjem delu grudi, ne ka vratu"], video: "#" },
      { slug: "veslanje-vezbe-za-ledja", naslov: "Veslanje i vežbe za leđa — tehnika povlačenja", trajanje: "5:50", opis: "Kako da pravilno aktiviraš leđa umesto da ceo pokret radiš rukama.", kljucneTacke: ["Lakat vodi pokret, ne šaka", "Lopatice se približavaju na vrhu pokreta", "Izbegavaj zaljuljivanje celog tela da bi 'prevario/la' težinu"], video: "#" },
      { slug: "izolovane-vezbe-ruke", naslov: "Bicepsi i tricepsi — tehnika izolovanih vežbi", trajanje: "5:15", opis: "Manje vežbe, ali podjednako lako za pogrešiti — kako da ih izvodiš sa kontrolom, ne zamahom.", kljucneTacke: ["Lakat ostaje fiksiran uz telo tokom pregibanja ruku", "Spuštanje težine (negativni deo pokreta) je jednako bitno kao podizanje", "Zamah telom smanjuje efekat vežbe, ne povećava ga"], video: "#" },
      { slug: "vezbe-za-ramena-bezbedno", naslov: "Vežbe za ramena bez rizika od povrede", trajanje: "6:05", opis: "Ramena su osetljiv zglob — kako da ih treniraš efikasno bez nepotrebnog rizika.", kljucneTacke: ["Izbegavaj podizanje tegova iznad linije ramena kod određenih pokreta ako osećaš nelagodu", "Zagrevanje ramena je posebno bitno pre pritiskanja iznad glave", "Kontrolisan opseg pokreta je bezbedniji od maksimalnog na uštrb forme"], video: "#" },
      { slug: "kako-prepoznati-lose-izvodjenje", naslov: "Kako da prepoznaš da radiš vežbu pogrešno", trajanje: "4:50", opis: "Signali tela i ogledala na koje treba da obratiš pažnju da sam/a uočiš grešku pre nego što je neko drugi ispravi.", kljucneTacke: ["Bol (ne napor) tokom pokreta je uvek signal da stani", "Ako ne osećaš ciljani mišić, verovatno kompenzuje neki drugi deo tela", "Snimanje sebe telefonom je jedan od najboljih besplatnih alata za proveru forme"], video: "#" },
    ],
  },
  {
    slug: "ishrana-za-pocetnike",
    emoji: "🍽️",
    naziv: "Ishrana za početnike",
    opis: "Ishrana bez konfuzije — kalorije, makronutrijenti i praktičan plan koji stvarno možeš da ispoštuješ, bez ekstrema i zabrana.",
    lekcije: [
      { slug: "kalorije-objasnjene-jednostavno", naslov: "Kalorije objašnjene jednostavno", trajanje: "5:00", opis: "Šta je kalorija zapravo, i zašto je razumevanje ovoga temelj svake odluke o ishrani koju ćeš doneti.", kljucneTacke: ["Kalorija je jedinica energije, ne 'dobra' ili 'loša' stvar sama po sebi", "Telo troši kalorije čak i u mirovanju (BMR)", "Višak ili manjak kalorija određuje da li dobijaš ili gubiš na težini"], video: "https://youtube.com/shorts/MLvoJtxpFN4" },
      { slug: "sta-su-makronutrijenti", naslov: "Šta su makronutrijenti (proteini, ugljeni hidrati, masti)", trajanje: "5:45", opis: "Osnovna podela hrane na tri makronutrijenta i uloga svakog u tvom telu i napretku.", kljucneTacke: ["Proteini grade i čuvaju mišićnu masu", "Ugljeni hidrati su glavni izvor energije za trening", "Masti su bitne za hormone i dugoročno zdravlje, ne treba ih izbegavati"], video: "#" },
      { slug: "koliko-proteina-ti-treba", naslov: "Koliko proteina ti stvarno treba", trajanje: "4:30", opis: "Praktična formula za dnevni unos proteina, bez komplikovanja i bez potrebe za preciznim vaganjem svakog obroka.", kljucneTacke: ["Otprilike 1.6-2.2g proteina po kg telesne težine je solidan opseg", "Raspoređivanje kroz dan pomaže, ali nije presudno", "Izvor proteina (meso, biljni, prah) je manje bitan od ukupne količine"], video: "#" },
      { slug: "deficit-i-suficit-objasnjeni", naslov: "Kalorijski deficit i suficit — šta znače za tvoje telo", trajanje: "5:20", opis: "Razlika između mršavljenja i dobijanja mišićne mase, objašnjena kroz jednostavan odnos unosa i potrošnje energije.", kljucneTacke: ["Deficit = trošiš više nego što uneseš → mršavljenje", "Suficit = uneseš više nego što trošiš → dobijanje mase", "Umeren pristup radi bolje i duže traje od ekstremnih verzija oba"], video: "#" },
      { slug: "kako-napraviti-prvi-plan-ishrane", naslov: "Kako da napraviš svoj prvi plan ishrane", trajanje: "6:40", opis: "Korak po korak — od procene potreba do konkretnog rasporeda obroka koji odgovara tvom danu.", kljucneTacke: ["Prvo odredi cilj (deficit/suficit/održavanje), pa onda kalorije", "Plan mora biti realan za tvoj raspored, ne savršen na papiru", "Fleksibilnost u izboru namirnica je bitnija od rigidnosti"], video: "#" },
      { slug: "citanje-deklaracija", naslov: "Čitanje deklaracija na hrani", trajanje: "4:55", opis: "Kako da za manje od minuta pročitaš deklaraciju i znaš tačno šta unosiš.", kljucneTacke: ["Prvo pogledaj veličinu porcije — svi ostali brojevi zavise od nje", "Ukupne kalorije i proteini su najbitniji podaci za početak", "'Bez šećera' i slične oznake ne znače automatski da je namirnica dobar izbor"], video: "#" },
      { slug: "primer-jelovnika-za-pocetnike", naslov: "Jelovnik za početnike — primer jednog dana", trajanje: "5:10", opis: "Konkretan, praktičan primer celog dana ishrane koji možeš odmah da prilagodiš sebi.", kljucneTacke: ["Tri glavna obroka + 1-2 užine je održiv okvir za većinu ljudi", "Svaki obrok ima izvor proteina kao polaznu tačku", "Primer nije 'pravilo', nego šablon koji prilagođavaš svojim namirnicama"], video: "#" },
      { slug: "ishrana-van-kuce", naslov: "Ishrana van kuće — kako da ne pokvariš plan", trajanje: "5:35", opis: "Praktični saveti za restorane, poslovne ručkove i druženja, bez osećaja da moraš da biraš između plana i društvenog života.", kljucneTacke: ["Jedan obrok van plana ne uništava nedelju truda", "Biranje pripreme (na žaru/pečeno) umesto prženog je jednostavan pobednički izbor", "Ne moraš da objašnjavaš svoj izbor hrane nikome za stolom"], video: "#" },
      { slug: "mitovi-o-ishrani", naslov: "Najčešći mitovi o ishrani koje treba da zaboraviš", trajanje: "6:15", opis: "Rasklapanje popularnih zabluda koje kruže internetom i teretanama, sa objašnjenjem šta je zapravo tačno.", kljucneTacke: ["'Ugljeni hidrati posle 18h se pretvaraju u mast' — ne postoji naučna osnova za ovo", "Detoks čajevi i sokovi ne 'čiste' telo od toksina", "Jedan obrok ne može ni da pokvari ni da spasi ceo napredak"], video: "#" },
    ],
  },
  {
    slug: "kardio-i-sagorevanje-masti",
    emoji: "🔥",
    naziv: "Kardio i sagorevanje masti",
    opis: "Kako da koristiš kardio pametno — ni previše, ni premalo — i zašto broj na vagi nije jedini pokazatelj da nešto radi.",
    lekcije: [
      { slug: "da-li-ti-je-kardio-potreban", naslov: "Da li ti je kardio zaista potreban", trajanje: "4:45", opis: "Iskren pregled kad kardio pomaže, a kad je opciono — u zavisnosti od tvog cilja.", kljucneTacke: ["Kardio nije obavezan za mršavljenje ako je kalorijski deficit ispoštovan", "Za srce, izdržljivost i opšte zdravlje, ipak ima jasnu vrednost", "Ne mora da bude trčanje — bilo koja aktivnost koja podiže puls računa se"], video: "https://youtube.com/shorts/bzTYQD3rw90" },
      { slug: "liss-vs-hiit", naslov: "Razlika između LISS i HIIT treninga", trajanje: "5:30", opis: "Dva glavna pristupa kardiju objašnjena — kad koristiti koji, i zašto ne moraš da biraš samo jedan.", kljucneTacke: ["LISS (nizak intenzitet, duže trajanje) je lakše za oporavak i doslednost", "HIIT (visok intenzitet, kraće trajanje) štedi vreme ali troši više resursa za oporavak", "Kombinacija oba, prilagođena rasporedu, često daje najbolji realan rezultat"], video: "#" },
      { slug: "koliko-kardija-je-previse", naslov: "Koliko kardija je previše", trajanje: "4:20", opis: "Znaci da si preterao/la sa kardio treningom i da to počinje da šteti tvom napretku u snazi.", kljucneTacke: ["Prekomeran kardio može usporiti oporavak od treninga snage", "Konstantan umor i pad snage u teretani su upozoravajući znaci", "3-4 kardio sesije nedeljno je solidan okvir za većinu ciljeva"], video: "#" },
      { slug: "kardio-na-prazan-stomak", naslov: "Kardio na prazan stomak — mit ili činjenica", trajanje: "4:10", opis: "Popularna tema u fitness zajednici — šta nauka zapravo kaže o kardiju pre doručka.", kljucneTacke: ["Ukupan dnevni kalorijski bilans je bitniji od tajminga kardija", "Neki ljudi se bolje osećaju trenirajući gladni, drugi ne — oboje je u redu", "Nema dokazane 'magične' prednosti sagorevanja masti našte srce"], video: "#" },
      { slug: "kombinovanje-kardija-i-snage", naslov: "Kombinovanje kardija i treninga snage", trajanje: "5:15", opis: "Kako da rasporediš oba tipa treninga u nedelji bez da jedan šteti drugom.", kljucneTacke: ["Ako radiš oba istog dana, trening snage prvo čuva energiju za težinu", "Razmak od nekoliko sati ili odvojeni dani su idealni ako je moguće", "Slušaj telo — hronični umor je znak da treba prilagoditi raspored"], video: "#" },
      { slug: "koraci-dnevno-potcenjeni-alat", naslov: "Koraci dnevno — najpotcenjeniji alat za mršavljenje", trajanje: "4:50", opis: "Zašto obična dnevna aktivnost (NEAT) često pravi veću razliku od formalnog kardio treninga.", kljucneTacke: ["8.000-10.000 koraka dnevno je realan i efikasan cilj za većinu ljudi", "Ovo troši kalorije bez dodatnog zamora koji ometa trening snage", "Lakše je dosledno hodati svaki dan nego dosledno trčati svaki dan"], video: "#" },
      { slug: "kardio-kod-kuce-bez-opreme", naslov: "Kardio kod kuće bez opreme", trajanje: "5:00", opis: "Praktične opcije za dane kad ne stigneš do teretane, bez ijednog komada opreme.", kljucneTacke: ["Skakanje konopca (ili imitacija pokreta) je efikasno i brzo", "Kružni trening telesnom težinom podiže puls koliko i mašina", "20 minuta doslednog kardija kod kuće > propušten trening"], video: "#" },
      { slug: "pracenje-napretka-bez-vage", naslov: "Kako da pratiš napredak kad vaga ne pokazuje pomak", trajanje: "5:40", opis: "Vaga je samo jedan od pokazatelja — ovde su ostali koji često otkriju napredak pre nje.", kljucneTacke: ["Obimi tela (struk, kukovi) se često menjaju pre nego što se promeni broj na vagi", "Fotografije svake 2-4 nedelje otkrivaju promene koje oko u ogledalu propušta", "Energija, san i snaga u teretani su isto tako validni pokazatelji napretka"], video: "#" },
    ],
  },
  {
    slug: "napredak-u-treningu",
    emoji: "📈",
    naziv: "Napredak u treningu",
    opis: "Kad savladaš osnove, ovde učiš kako da nastaviš da napreduješ meseci i godine unapred, umesto da stagniraš posle prvih nekoliko nedelja.",
    lekcije: [
      { slug: "sta-je-progresivno-preopterecenje", naslov: "Šta je progresivno preopterećenje", trajanje: "5:05", opis: "Princip bez kog nema dugoročnog napretka — objašnjen jednostavno, bez žargona.", kljucneTacke: ["Telo se prilagođava — mora dobijati malo veći izazov vremenom", "Napredak može biti u težini, ponavljanjima ili kontroli pokreta", "Ne mora se dešavati svaki trening, ali mora postojati trend kroz nedelje"], video: "#" },
      { slug: "kako-voditi-dnevnik-treninga", naslov: "Kako da vodiš dnevnik treninga", trajanje: "4:30", opis: "Praktičan sistem beleženja koji ti pokazuje crno na belo da li stvarno napreduješ.", kljucneTacke: ["Beleži težinu, serije i ponavljanja za svaku vežbu, svaki put", "Bez beleški, napredak postaje nagađanje umesto podataka", "Aplikacija ili obična sveska — bitno je da bude dosledno, ne savršeno"], video: "#" },
      { slug: "tezina-ili-ponavljanja", naslov: "Kada da povećaš težinu, a kada ponavljanja", trajanje: "4:45", opis: "Praktično pravilo odlučivanja kad si spreman/na za sledeći korak napretka.", kljucneTacke: ["Ako lako završiš gornju granicu ponavljanja sa dobrom formom, vreme je za veću težinu", "Manji koraci u težini su bezbedniji i održiviji od velikih skokova", "Ponekad je napredak samo bolja kontrola iste težine — i to se računa"], video: "#" },
      { slug: "platoi-kako-ih-probiti", naslov: "Platoi — zašto se dešavaju i kako da ih probiješ", trajanje: "5:50", opis: "Period bez vidljivog napretka je normalan deo procesa — evo kako da ga prepoznaš i rešiš.", kljucneTacke: ["Plato često znači da telu treba nova vrsta izazova, ne više istog", "Nedovoljan oporavak (san, ishrana) je čest skriveni uzrok", "Mala izmena programa posle nekoliko nedelja stagnacije je normalna, ne poraz"], video: "#" },
      { slug: "periodizacija-jednostavno", naslov: "Periodizacija objašnjena jednostavno", trajanje: "6:20", opis: "Kako profesionalci planiraju mesece unapred — pojednostavljeno za nekoga ko trenira rekreativno.", kljucneTacke: ["Periodizacija znači smišljeno menjanje intenziteta i obima kroz vreme", "Ne moraš komplikovan sistem — čak i osnovno planiranje po mesecima pomaže", "Faze fokusa (snaga, izdržljivost, oporavak) sprečavaju stagnaciju i pregorevanje"], video: "#" },
      { slug: "napredovanje-prvih-sest-meseci", naslov: "Kako izgleda napredovanje kroz prvih 6 meseci", trajanje: "5:35", opis: "Realna vremenska linija očekivanog napretka, da imaš merilo umesto nagađanja.", kljucneTacke: ["Prva 2-3 meseca donose najbrži vidljiv napredak (efekat početnika)", "Posle toga, napredak usporava — to je normalno, ne znak da nešto ne valja", "Konzistentnost kroz ovih 6 meseci je najbolji prediktor dugoročnog uspeha"], video: "#" },
      { slug: "deload-nedelja", naslov: "Deload nedelja — šta je i zašto je potrebna", trajanje: "4:15", opis: "Namerno smanjenje intenziteta koje sprečava pregorevanje i povrede od preopterećenja.", kljucneTacke: ["Deload nije lenjost — to je strateška pauza za oporavak tela", "Preporučuje se otprilike svakih 6-8 nedelja intenzivnog treninga", "Smanjena težina ili obim, ne potpuno izostajanje iz teretane"], video: "#" },
      { slug: "kad-si-spreman-za-napredne-programe", naslov: "Napredni programi treninga — kada si spreman/na za njih", trajanje: "5:00", opis: "Kako da prepoznaš da si prerastao/la početnički program i da ti treba nešto strukturiranije.", kljucneTacke: ["Solidna tehnika u osnovnim pokretima je preduslov, ne opcija", "Ako napredak sa jednostavnim programom stane, to je signal za promenu", "Napredniji ne znači komplikovaniji — često znači samo pametnije strukturiran"], video: "#" },
    ],
  },
  {
    slug: "oporavak-i-suplementi",
    emoji: "😴",
    naziv: "Oporavak i suplementi",
    opis: "Ono što radiš van teretane često određuje da li će ono što radiš unutar nje uopšte doneti rezultat — san, odmor i pošten pregled suplemenata.",
    lekcije: [
      { slug: "zasto-je-san-bitniji-od-treninga", naslov: "Zašto je san bitniji od dodatnog treninga", trajanje: "4:44", opis: "Veza između sna i napretka koju većina početnika ignoriše dok ne udari u zid.", kljucneTacke: ["Mišić raste dok se odmara, ne dok se vežba", "Loš san direktno utiče na apetit i odluke o ishrani sledećeg dana", "7-9 sati sna je realan cilj za većinu odraslih"], video: "https://youtube.com/shorts/_Cwmhr60yQY" },
      { slug: "prepoznavanje-overtraininga", naslov: "Kako da prepoznaš prekomeran trening (overtraining)", trajanje: "5:10", opis: "Znaci da telu treba pauza pre nego što povreda ili potpuno pregorevanje to odluče umesto tebe.", kljucneTacke: ["Konstantan umor, loš san i pad raspoloženja su rani signali", "Pad snage uprkos doslednom treningu je crvena zastavica", "Jedan ili dva dana potpunog odmora više nedeljno nisu gubitak vremena"], video: "#" },
      { slug: "istezanje-i-mobilnost", naslov: "Istezanje i mobilnost — šta stvarno pomaže", trajanje: "5:25", opis: "Razlika između istezanja koje stvarno poboljšava pokretljivost i onog koje je samo rutina bez efekta.", kljucneTacke: ["Dinamičko istezanje pre treninga, statičko posle — ne obrnuto", "Mobilnost zglobova (kukovi, skočni zglobovi) direktno utiče na tehniku vežbi", "10 minuta dosledne mobilnosti nedeljno prevazilazi povremeno satno istezanje"], video: "#" },
      { slug: "doms-bol-u-misicima", naslov: "Bol u mišićima (DOMS) — kada je normalan, kada nije", trajanje: "4:35", opis: "Kako da napraviš razliku između normalnog bola od treninga i signala da nešto nije u redu.", kljucneTacke: ["DOMS se obično javlja 24-48h posle treninga i prolazi sam", "Oštar, lokalizovan bol tokom pokreta nije DOMS — to je signal za pauzu", "Lagana aktivnost često ubrzava oporavak od DOMS-a više nego potpuno mirovanje"], video: "#" },
      { slug: "koji-suplementi-vrede", naslov: "Koji suplementi zaista vrede novca", trajanje: "6:12", opis: "Pošten pregled — šta ima naučnu podlogu, a šta je uglavnom marketing.", kljucneTacke: ["Kreatin i protein prah imaju najviše dokaza iza sebe", "Nijedan suplement ne zamenjuje osnove — ishranu, san, trening", "'Fat burner' proizvodi retko rade ono što obećavaju na etiketi"], video: "#" },
      { slug: "kreatin-najveci-mit", naslov: "Kreatin — najveći mit razjašnjen", trajanje: "4:50", opis: "Jedan od najproučavanijih i najviše pogrešno shvaćenih suplemenata u fitness svetu.", kljucneTacke: ["Kreatin ne oštećuje bubrege kod zdravih osoba — to je dugogodišnji mit", "Zadržavanje vode je normalno i nije 'loše' zadebljanje", "Efekat je postepen, ne trenutan — treba nedelje doslednog korišćenja"], video: "#" },
      { slug: "da-li-ti-treba-protein-prah", naslov: "Da li ti je protein prah zaista potreban", trajanje: "4:05", opis: "Kad protein prah ima smisla, a kad je samo skuplja verzija hrane koju već imaš kod kuće.", kljucneTacke: ["Protein prah je hrana u prahu, ne magičan proizvod", "Koristan je kad ti je teško da dostigneš dnevni unos proteina hranom", "Nije obavezan — mnogi ljudi postižu cilj isključivo kroz obroke"], video: "#" },
      { slug: "aktivni-oporavak", naslov: "Aktivni oporavak — dani odmora koji nisu potpuno besposleni", trajanje: "4:20", opis: "Kako da iskoristiš dan odmora da ubrzaš oporavak, umesto da samo sediš ili treniraš puni intenzitet.", kljucneTacke: ["Lagana šetnja ili istezanje ubrzavaju cirkulaciju i oporavak", "Aktivni oporavak ≠ trening — intenzitet ostaje nizak", "Ovo je razlika između 'dana odmora' i 'dana bez ičega'"], video: "#" },
    ],
  },
  {
    slug: "mindset-i-doslednost",
    emoji: "🧠",
    naziv: "Mindset i doslednost",
    opis: "Tehnika i plan su beskorisni bez doslednosti da ih sprovedeš. Ovo je ono što stvarno određuje da li ćeš uspeti — glavom, ne mišićima.",
    lekcije: [
      { slug: "zasto-motivacija-nije-dovoljna", naslov: "Zašto motivacija nije dovoljna", trajanje: "5:00", opis: "Motivacija dolazi i odlazi — ovde učiš na šta da se osloniš kad je nema.", kljucneTacke: ["Motivacija je osećaj, disciplina je odluka — oslanjaj se na drugo", "Čekanje na motivaciju da 'dođe' je najčešći razlog odustajanja", "Akcija često dolazi pre motivacije, ne posle nje"], video: "https://youtube.com/shorts/Y06CguV1hmQ" },
      { slug: "izgradnja-navike-treninga", naslov: "Kako da izgradiš naviku treninga koja traje", trajanje: "5:40", opis: "Praktičan pristup pretvaranju treninga iz 'napora' u automatski deo rutine.", kljucneTacke: ["Isti dani i vreme treninga grade naviku brže od 'kad stignem'", "Mala, održiva verzija navike pobeđuje ambicioznu verziju koju odustaneš", "Prvih 2-3 nedelje su najteže — posle toga postaje lakše, ne teže"], video: "#" },
      { slug: "postavljanje-realnih-ciljeva", naslov: "Postavljanje realnih ciljeva", trajanje: "4:45", opis: "Kako da postaviš cilj koji te gura napred umesto da te obeshrabri posle mesec dana.", kljucneTacke: ["Konkretni, merljivi ciljevi rade bolje od uopštenih ('biti fit')", "Kratkoročni ciljevi (nedelja/mesec) grade momentum ka dugoročnim", "Cilj treba da bude izazovan, ali dostižan — ne fantazija"], video: "#" },
      { slug: "sta-raditi-kad-izgubis-volju", naslov: "Šta da radiš kad izgubiš volju", trajanje: "5:15", opis: "Konkretne strategije za dane kad ništa u tebi ne želi da ode na trening.", kljucneTacke: ["Pravilo '10 minuta' — dozvoli sebi da odeš samo na kratko, često se produži samo", "Podseti se zašto si počeo/la, ne samo gde želiš da stigneš", "Jedan propušten trening nije neuspeh — obrazac propuštanja jeste"], video: "#" },
      { slug: "kako-se-ne-porediti-sa-drugima", naslov: "Kako da se ne porediš sa drugima", trajanje: "4:30", opis: "Poređenje je jedan od najvećih ubica motivacije u fitnesu — evo kako da ga preusmeriš.", kljucneTacke: ["Svako telo napreduje drugačijom brzinom, iz drugačije tačke", "Poredi sebe sa sobom od pre mesec dana, ne sa nekim drugim danas", "Ono što vidiš na društvenim mrežama retko je cela slika tuđeg puta"], video: "#" },
      { slug: "perfekcionizam-koci-napredak", naslov: "Da li ti savršenstvo zapravo koči napredak?", trajanje: "4:55", opis: "Zašto insistiranje na savršenom planu često vodi u potpuno odustajanje.", kljucneTacke: ["80% doslednosti kroz godinu pobeđuje 100% doslednosti kroz dve nedelje", "Sve ili ništa razmišljanje je čest uzrok odustajanja posle jednog 'lošeg' dana", "Napredak nije linija — ima uspone i padove, i to je normalno"], video: "#" },
      { slug: "dugorocno-razmisljanje-o-telu", naslov: "Kako izgleda dugoročno razmišljanje o telu", trajanje: "5:20", opis: "Pomeranje fokusa sa 'brzog rezultata' na trajnu promenu koja se ne gubi za mesec dana.", kljucneTacke: ["Pitanje nije 'kako da smršam brzo' nego 'kako da ovo održim godinama'", "Navike koje grade tvoj rezultat treba da budu iste one koje ga održavaju", "Kratkoročne žrtve (ekstremne dijete) retko donose dugoročne rezultate"], video: "#" },
      { slug: "proslavljanje-malih-pobeda", naslov: "Proslavljanje malih pobeda — zašto je bitno", trajanje: "4:10", opis: "Kako prepoznavanje sitnog napretka usput gradi motivaciju za ono što dolazi.", kljucneTacke: ["Dodatno ponavljanje, bolja forma, lakši uspon uz stepenice — sve se računa", "Čekanje samo na 'veliki' rezultat čini put dužim nego što jeste", "Vođenje beleške malih pobeda gradi dokaz napretka kad motivacija padne"], video: "#" },
    ],
  },
];

export function getKategorija(slug) {
  return KATEGORIJE.find((k) => k.slug === slug) || null;
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

export function jeNovo(lekcija) {
  if (!lekcija.dodato) return false;
  const dodatoDatum = new Date(lekcija.dodato);
  if (isNaN(dodatoDatum)) return false;
  const razlikaDana = (Date.now() - dodatoDatum.getTime()) / (1000 * 60 * 60 * 24);
  return razlikaDana >= 0 && razlikaDana <= 7;
}
