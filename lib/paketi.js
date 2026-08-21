import { Salad, Dumbbell, Star, Crown } from "lucide-react";

// 👉 Kad menjaš cene ili opis paketa, sve se menja ovde na jednom mestu.
export const PAKETI = [
  {
    id: "ishrana",
    naziv: "Plan ishrane",
    cena: "2.500 RSD",
    period: "jednokratno",
    icon: Salad,
    zaKoga: "Ako želiš da prvo probaš kako radim, bez mesečne obaveze.",
    stavke: [
      "Individualni plan ishrane prema tvom cilju",
      "Izračunate kalorije i makronutrijenti",
      "Zamene za namirnice",
      "PDF plan koji ostaje zauvek",
    ],
  },
  {
    id: "trening",
    naziv: "Plan treninga",
    cena: "2.500 RSD",
    period: "jednokratno",
    icon: Dumbbell,
    zaKoga: "Ako imaš svoju ishranu pod kontrolom, ali ti treba struktura treninga.",
    stavke: [
      "Individualni plan treninga prema tvom cilju",
      "Broj serija i ponavljanja",
      "Video objašnjenja vežbi",
      "PDF plan koji ostaje zauvek",
    ],
  },
  {
    id: "standard",
    naziv: "Online Coaching Standard",
    cena: "7.000 RSD",
    period: "mesečno",
    icon: Star,
    istaknuto: true,
    zaKoga: "Ako želiš da neko prati tvoj napredak i prilagođava plan iz nedelje u nedelju.",
    stavke: [
      "Individualni plan treninga",
      "Individualni plan ishrane",
      "Nedeljna provera napretka",
      "Korekcije plana po potrebi",
      "Podrška putem WhatsApp-a",
    ],
  },
  {
    id: "premium",
    naziv: "Online Coaching Premium",
    cena: "10.000 RSD",
    period: "mesečno",
    icon: Crown,
    zaKoga: "Ako želiš maksimalnu blizinu saradnji — brze odgovore i analizu tehnike.",
    stavke: [
      "Detaljna analiza forme i tehnike putem video snimaka",
      "Sve iz Standard paketa",
      "Neograničena podrška putem WhatsApp-a",
      "Prioritetni odgovori",
      "Češće izmene plana po potrebi",
      "Individualni pristup tokom cele saradnje",
    ],
  },
];
