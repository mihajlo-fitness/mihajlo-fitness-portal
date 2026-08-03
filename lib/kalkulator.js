// Svi proračuni na jednom mestu — čisto matematičke funkcije, bez UI-a.

export const AKTIVNOST_OPCIJE = [
  { id: "sedentaran", naziv: "Sedentaran", opis: "Malo ili nimalo aktivnosti", multiplier: 1.2 },
  { id: "lagano", naziv: "Lagano aktivan", opis: "1–3 treninga nedeljno", multiplier: 1.375 },
  { id: "umereno", naziv: "Umereno aktivan", opis: "3–5 treninga nedeljno", multiplier: 1.55 },
  { id: "veoma", naziv: "Veoma aktivan", opis: "6–7 treninga nedeljno", multiplier: 1.725 },
  { id: "ekstremno", naziv: "Ekstremno aktivan", opis: "Veoma visok nivo aktivnosti", multiplier: 1.9 },
];

export const CILJ_OPCIJE = [
  { id: "mrsavljenje", naziv: "Mršavljenje" },
  { id: "odrzavanje", naziv: "Održavanje težine" },
  { id: "misici", naziv: "Dobijanje mišićne mase" },
];

// Mifflin-St Jeor jednačina
export function izracunajBMR({ pol, godine, visina, tezina }) {
  const osnova = 10 * tezina + 6.25 * visina - 5 * godine;
  return pol === "musko" ? osnova + 5 : osnova - 161;
}

export function izracunajTDEE(bmr, aktivnostId) {
  const opcija = AKTIVNOST_OPCIJE.find((a) => a.id === aktivnostId);
  return bmr * (opcija?.multiplier || 1.2);
}

// Umeren deficit/suficit — nikad ekstreman.
const MODIFIKATOR_CILJA = {
  mrsavljenje: 0.8, // ~20% deficit
  odrzavanje: 1.0,
  misici: 1.1, // ~10% suficit
};

// Bezbednosni pod — nikad ne preporučuj manje od ovoga, bez obzira na proračun.
const MINIMUM_KALORIJA = { musko: 1500, zensko: 1200 };

export function preporuceneKalorije(tdee, ciljId, pol) {
  const sirovaVrednost = tdee * (MODIFIKATOR_CILJA[ciljId] ?? 1.0);
  const minimum = MINIMUM_KALORIJA[pol] ?? 1200;
  const ogranicenoMinimumom = sirovaVrednost < minimum;
  return {
    kalorije: Math.round(Math.max(sirovaVrednost, minimum)),
    ogranicenoMinimumom,
  };
}

// Proteini: 2g/kg telesne težine (solidna, odbranjiva sredina 1.6-2.2g/kg opsega)
// Masti: 25% ukupnih kalorija
// Ugljeni hidrati: ostatak
export function izracunajMakroe(kalorije, tezina) {
  const proteinG = Math.round(tezina * 2);
  const proteinKcal = proteinG * 4;

  const mastiKcal = kalorije * 0.25;
  const mastiG = Math.round(mastiKcal / 9);

  const preostaloKcal = Math.max(0, kalorije - proteinKcal - mastiKcal);
  const ugljeniHidratiG = Math.round(preostaloKcal / 4);

  return { proteinG, mastiG, ugljeniHidratiG };
}

export function izracunajBMI(tezina, visina) {
  const visinaM = visina / 100;
  return tezina / (visinaM * visinaM);
}

export function bmiKategorija(bmi) {
  if (bmi < 18.5) return "Ispod preporučenog opsega";
  if (bmi < 25) return "U preporučenom opsegu";
  if (bmi < 30) return "Iznad preporučenog opsega";
  return "Značajno iznad preporučenog opsega";
}

// Validacija unosa — vraća poruku greške ili null ako je sve u redu.
export function validirajUnos({ godine, visina, tezina }) {
  const g = Number(godine);
  const v = Number(visina);
  const t = Number(tezina);

  if (!godine || isNaN(g) || g < 10 || g > 100) {
    return "Unesi godine između 10 i 100.";
  }
  if (!visina || isNaN(v) || v < 100 || v > 250) {
    return "Unesi visinu između 100 i 250 cm.";
  }
  if (!tezina || isNaN(t) || t < 30 || t > 300) {
    return "Unesi težinu između 30 i 300 kg.";
  }
  return null;
}

export const SAVETI_PO_CILJU = {
  mrsavljenje: [
    "Fokus na kalorijski deficit — ne mora biti drastičan da bi radio.",
    "Dovoljan unos proteina čuva mišićnu masu dok gubiš kilograme.",
    "Trening snage + svakodnevna aktivnost (koraci) čine najveću razliku.",
  ],
  odrzavanje: [
    "Drži se unosa blizu procenjenog TDEE-a, ne mora biti precizno do grama.",
    "Prati težinu kroz vreme (nedeljno, ne dnevno) da uočiš trend na vreme.",
    "Konzistentan trening održava formu i sprečava neprimetno nazadovanje.",
  ],
  misici: [
    "Mali kalorijski suficit — veliki višak vodi više u mast nego u mišiće.",
    "Dovoljno proteina (već uračunato gore) je ključno za rast mišića.",
    "Progresivno opterećenje u teretani je ono što realno gradi mišić, ne samo kalorije.",
  ],
};
