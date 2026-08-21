"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  TextInput,
  TextArea,
  ChipGroup,
  ScaleTen,
  PhotoSlot,
  MeasurementsGrid,
  ProgressHeader,
  StepShell,
  FooterNav,
  ThankYou,
} from "@/components/ui";
import { storageSet, storageGet, uploadPhoto } from "@/lib/storage";
import { notifyCoach } from "@/lib/notify";
import { todayISO } from "@/lib/helpers";
import { useAuth } from "@/lib/auth";

const emptyCheckin = () => ({
  ime: "",
  datum: todayISO(),
  nedelja: "",
  tezina: "",
  koraci: "",
  treninzi: "",
  ishranaPlan: "",
  voda: "",
  san: "",
  merenja: {},
  slike: { front: null, ledja: null, profil: null },
  osecaj: 7,
  energija: 7,
  glad: 5,
  stres: 4,
  motivacija: 7,
  najlakse: "",
  najteze: "",
  bolovi: "",
  promene: "",
  pitanje: "",
});

export default function CheckinPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyCheckin());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [checkingOnboard, setCheckingOnboard] = useState(true);
  const totalSteps = 6;

  // Ako klijent nije popunio početni upitnik, ovde nema šta da radi —
  // vraćamo ga tamo prvo, umesto da mu dozvolimo da popuni check-in
  // "iz vazduha", bez ijednog osnovnog podatka o njemu.
  useEffect(() => {
    if (!ready || !user) return;
    (async () => {
      const client = await storageGet(`client:${user.id}`);
      if (!client) {
        router.replace("/onboarding");
        return;
      }
      setCheckingOnboard(false);
    })();
  }, [ready, user, router]);

  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  const steps = [
    {
      title: "Lični podaci",
      subtitle: "Za koju nedelju je ovaj check-in?",
      valid: data.ime.trim() && data.datum && data.nedelja,
      body: (
        <>
          <Field label="Ime i prezime">
            <TextInput value={data.ime} onChange={(e) => set({ ime: e.target.value })} placeholder="Npr. Ana Anić" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Datum">
              <TextInput type="date" value={data.datum} onChange={(e) => set({ datum: e.target.value })} />
            </Field>
            <Field label="Nedelja programa">
              <TextInput type="number" inputMode="numeric" value={data.nedelja} onChange={(e) => set({ nedelja: e.target.value })} placeholder="Npr. 6" />
            </Field>
          </div>
        </>
      ),
    },
    {
      title: "Napredak",
      subtitle: "Kako je prošla nedelja u brojkama",
      valid: data.tezina,
      body: (
        <>
          <Field label="Trenutna težina (kg)">
            <TextInput type="number" inputMode="decimal" value={data.tezina} onChange={(e) => set({ tezina: e.target.value })} placeholder="64.5" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prosečan broj koraka">
              <TextInput type="number" inputMode="numeric" value={data.koraci} onChange={(e) => set({ koraci: e.target.value })} placeholder="8000" />
            </Field>
            <Field label="Odrađeni treninzi">
              <TextInput type="number" inputMode="numeric" value={data.treninzi} onChange={(e) => set({ treninzi: e.target.value })} placeholder="4" />
            </Field>
          </div>
          <Field label="Koliko si puta ispoštovao/la plan ishrane?">
            <ChipGroup options={["0-2 puta", "3-4 puta", "5-6 puta", "Svaki dan"]} value={data.ishranaPlan} onChange={(v) => set({ ishranaPlan: v })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Unos vode (L/dan)">
              <TextInput type="number" inputMode="decimal" value={data.voda} onChange={(e) => set({ voda: e.target.value })} placeholder="2.5" />
            </Field>
            <Field label="Prosečan san (h)">
              <TextInput type="number" inputMode="decimal" value={data.san} onChange={(e) => set({ san: e.target.value })} placeholder="7" />
            </Field>
          </div>
        </>
      ),
    },
    {
      title: "Mere",
      subtitle: "Unesi u centimetrima",
      valid: true,
      body: <MeasurementsGrid values={data.merenja} onChange={(m) => set({ merenja: m })} />,
    },
    {
      title: "Fotografije",
      subtitle: "Front, leđa i profil",
      valid: true,
      body: (
        <>
          <div className="grid grid-cols-3 gap-3">
            <PhotoSlot label="Front" file={data.slike.front} onChange={(f) => set({ slike: { ...data.slike, front: f } })} />
            <PhotoSlot label="Leđa" file={data.slike.ledja} onChange={(f) => set({ slike: { ...data.slike, ledja: f } })} />
            <PhotoSlot label="Profil" file={data.slike.profil} onChange={(f) => set({ slike: { ...data.slike, profil: f } })} />
          </div>
          <p className="text-[12px] text-gray-350 mt-4 leading-relaxed">
            Fotografije se bezbedno čuvaju i vidljive su treneru u Trenerskom pregledu.
          </p>
        </>
      ),
    },
    {
      title: "Ocena",
      subtitle: "Kako si se osećao/la ove nedelje?",
      valid: true,
      body: (
        <>
          <Field label={`Kako se osećaš: ${data.osecaj}/10`}>
            <ScaleTen value={data.osecaj} onChange={(v) => set({ osecaj: v })} lowLabel="Loše" highLabel="Odlično" />
          </Field>
          <Field label={`Nivo energije: ${data.energija}/10`}>
            <ScaleTen value={data.energija} onChange={(v) => set({ energija: v })} lowLabel="Bez energije" highLabel="Pun energije" />
          </Field>
          <Field label={`Glad: ${data.glad}/10`}>
            <ScaleTen value={data.glad} onChange={(v) => set({ glad: v })} lowLabel="Nimalo gladan" highLabel="Veoma gladan" />
          </Field>
          <Field label={`Stres: ${data.stres}/10`}>
            <ScaleTen value={data.stres} onChange={(v) => set({ stres: v })} lowLabel="Opušten" highLabel="Pod stresom" />
          </Field>
          <Field label={`Motivacija: ${data.motivacija}/10`}>
            <ScaleTen value={data.motivacija} onChange={(v) => set({ motivacija: v })} lowLabel="Nizak nivo" highLabel="Visok nivo" />
          </Field>
        </>
      ),
    },
    {
      title: "Pitanja",
      subtitle: "Nekoliko rečenica su dovoljne",
      valid: true,
      body: (
        <>
          <Field label="Šta ti je ove nedelje bilo najlakše?">
            <TextArea value={data.najlakse} onChange={(e) => set({ najlakse: e.target.value })} />
          </Field>
          <Field label="Šta ti je bilo najteže?">
            <TextArea value={data.najteze} onChange={(e) => set({ najteze: e.target.value })} />
          </Field>
          <Field label="Da li imaš bolove?">
            <TextArea value={data.bolovi} onChange={(e) => set({ bolovi: e.target.value })} placeholder="Ako nemaš, samo napiši 'ne'" />
          </Field>
          <Field label="Da li želiš nešto da promenimo?">
            <TextArea value={data.promene} onChange={(e) => set({ promene: e.target.value })} />
          </Field>
          <Field label="Imaš li pitanje za mene?">
            <TextArea value={data.pitanje} onChange={(e) => set({ pitanje: e.target.value })} />
          </Field>
        </>
      ),
    },
  ];

  const isLast = step === totalSteps - 1;
  const cur = steps[step];

  const handleNext = () => {
    if (isLast) {
      setStep(totalSteps);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      setSubmitError("Sesija još nije spremna — sačekaj par sekundi i pokušaj ponovo.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const uid = user.id;
    const [frontUrl, ledjaUrl, profilUrl] = await Promise.all([
      uploadPhoto(data.slike.front, `checkin/${uid}/front`),
      uploadPhoto(data.slike.ledja, `checkin/${uid}/ledja`),
      uploadPhoto(data.slike.profil, `checkin/${uid}/profil`),
    ]);
    const payload = {
      ...data,
      slike: {
        front: frontUrl || data.slike.front?.name || null,
        ledja: ledjaUrl || data.slike.ledja?.name || null,
        profil: profilUrl || data.slike.profil?.name || null,
      },
      timestamp: Date.now(),
    };
    // Ključ sada koristi auth.uid(), ne ime — svaki check-in ostaje
    // vezan za pravi identitet, a owner_id (automatski = auth.uid())
    // je ono što RLS stvarno koristi za zaštitu.
    const ok = await storageSet(`checkin:${uid}:${Date.now()}`, payload);
    if (!ok) {
      setSubmitting(false);
      setSubmitError("Nešto nije uspelo pri čuvanju. Proveri internet konekciju i pokušaj ponovo.");
      return;
    }
    notifyCoach(
      `Novi check-in: ${data.ime}`,
      `${data.ime} je poslao/la check-in za nedelju ${data.nedelja || "?"}.\nTežina: ${data.tezina || "?"} kg\nTreninzi: ${data.treninzi || "?"}\nOsećaj: ${data.osecaj}/10\n\nPogledaj detalje u Trenerskom pregledu.`
    );
    setSubmitting(false);
    setDone(true);
  };

  if (checkingOnboard) {
    return <div className="min-h-[80vh]" />;
  }

  if (step === totalSteps) {
    return (
      <>
        {submitError && (
          <div className="max-w-md mx-auto px-6 pt-6">
            <p className="text-[13px] text-red-500 bg-red-50 rounded-xl px-4 py-3">{submitError}</p>
          </div>
        )}
        <ThankYou onSubmit={handleSubmit} submitting={submitting} done={done} />
      </>
    );
  }

  return (
    <div>
      <ProgressHeader
        step={step}
        total={totalSteps}
        title={cur.title}
        subtitle={cur.subtitle}
        onBack={step === 0 ? () => router.push("/app") : () => setStep((s) => s - 1)}
        brandLabel="NEDELJNI CHECK-IN"
      />
      <div className="max-w-md mx-auto w-full px-5 pb-4">
        <StepShell stepKey={step}>{cur.body}</StepShell>
      </div>
      <FooterNav
        onNext={handleNext}
        onBack={() => setStep((s) => s - 1)}
        isFirst
        nextDisabled={!cur.valid}
        nextLabel={isLast ? "Pregledaj i pošalji" : "Nastavi"}
      />
    </div>
  );
}
