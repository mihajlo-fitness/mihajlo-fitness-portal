"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
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
import { storageSet } from "@/lib/storage";
import { slugify, todayISO } from "@/lib/helpers";

const emptyOnboarding = () => ({
  ime: "",
  godine: "",
  visina: "",
  tezina: "",
  cilj: "",
  ciljChip: "",
  iskustvo: "",
  povredeNema: false,
  povrede: "",
  ishrana: "",
  merenja: {},
  san: "",
  stres: 5,
  posao: "",
  pusenje: "",
  alkohol: "",
  slike: { front: null, ledja: null, profil: null },
  datum: todayISO(),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyOnboarding());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const totalSteps = 8;

  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  const steps = [
    {
      title: "Osnovni podaci",
      subtitle: "Da te bolje upoznamo",
      valid: data.ime.trim() && data.godine && data.visina && data.tezina,
      body: (
        <>
          <Field label="Ime i prezime">
            <TextInput value={data.ime} onChange={(e) => set({ ime: e.target.value })} placeholder="Npr. Ana Anić" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Godine">
              <TextInput type="number" inputMode="numeric" value={data.godine} onChange={(e) => set({ godine: e.target.value })} placeholder="28" />
            </Field>
            <Field label="Visina">
              <TextInput type="number" inputMode="numeric" value={data.visina} onChange={(e) => set({ visina: e.target.value })} placeholder="170 cm" />
            </Field>
            <Field label="Težina">
              <TextInput type="number" inputMode="decimal" value={data.tezina} onChange={(e) => set({ tezina: e.target.value })} placeholder="65 kg" />
            </Field>
          </div>
        </>
      ),
    },
    {
      title: "Koji je tvoj cilj?",
      subtitle: "Izaberi ono što ti najviše odgovara",
      valid: data.ciljChip || data.cilj.trim(),
      body: (
        <>
          <Field label="Primarni cilj">
            <ChipGroup
              options={["Mršavljenje", "Definicija", "Snaga", "Održavanje forme", "Rehabilitacija"]}
              value={data.ciljChip}
              onChange={(v) => set({ ciljChip: v })}
            />
          </Field>
          <Field label="Opiši detaljnije (opciono)">
            <TextArea value={data.cilj} onChange={(e) => set({ cilj: e.target.value })} placeholder="Npr. želim da smanjim procenat masti i ojačam gornji deo tela..." />
          </Field>
        </>
      ),
    },
    {
      title: "Tvoje iskustvo",
      subtitle: "Koliko dugo treniraš?",
      valid: data.iskustvo,
      body: (
        <Field label="Nivo iskustva">
          <ChipGroup options={["Početnik", "Srednji nivo", "Napredan"]} value={data.iskustvo} onChange={(v) => set({ iskustvo: v })} />
        </Field>
      ),
    },
    {
      title: "Povrede i ograničenja",
      subtitle: "Bezbednost je uvek na prvom mestu",
      valid: data.povredeNema || data.povrede.trim(),
      body: (
        <>
          <button
            type="button"
            onClick={() => set({ povredeNema: !data.povredeNema, povrede: !data.povredeNema ? "" : data.povrede })}
            className={
              "w-full flex items-center gap-3 rounded-2xl border p-4 mb-4 transition-all duration-200 " +
              (data.povredeNema ? "border-accent bg-accent/5" : "border-gray-200")
            }
          >
            <div
              className={
                "h-5 w-5 rounded-md flex items-center justify-center border transition-all " +
                (data.povredeNema ? "bg-accent border-accent" : "border-gray-300")
              }
            >
              {data.povredeNema && <Check size={13} className="text-white" strokeWidth={3} />}
            </div>
            <span className="text-[14px] font-medium text-gray-700">Nemam povreda ni ograničenja</span>
          </button>
          {!data.povredeNema && (
            <Field label="Opiši povrede / bolne tačke">
              <TextArea value={data.povrede} onChange={(e) => set({ povrede: e.target.value })} placeholder="Npr. bol u donjem delu leđa pri čučnju..." />
            </Field>
          )}
        </>
      ),
    },
    {
      title: "Ishrana",
      subtitle: "Navike, alergije i restrikcije",
      valid: data.ishrana.trim(),
      body: (
        <Field label="Opiši svoju ishranu">
          <TextArea rows={5} value={data.ishrana} onChange={(e) => set({ ishrana: e.target.value })} placeholder="Broj obroka, alergije, namirnice koje ne jedeš, restrikcije (vegan, keto...) itd." />
        </Field>
      ),
    },
    {
      title: "Početne mere",
      subtitle: "Unesi u centimetrima",
      valid: true,
      body: <MeasurementsGrid values={data.merenja} onChange={(m) => set({ merenja: m })} />,
    },
    {
      title: "Životne navike",
      subtitle: "Poslednji podaci pre fotografija",
      valid: true,
      body: (
        <>
          <Field label="Prosečan san (h)">
            <TextInput type="number" inputMode="decimal" value={data.san} onChange={(e) => set({ san: e.target.value })} placeholder="7" />
          </Field>
          <Field label={`Nivo stresa: ${data.stres}/10`}>
            <ScaleTen value={Number(data.stres)} onChange={(v) => set({ stres: v })} lowLabel="Miran" highLabel="Pod stresom" />
          </Field>
          <Field label="Priroda posla">
            <ChipGroup options={["Sedeći", "Umereno aktivan", "Fizički aktivan"]} value={data.posao} onChange={(v) => set({ posao: v })} />
          </Field>
          <Field label="Pušenje">
            <ChipGroup options={["Ne pušim", "Povremeno", "Redovno"]} value={data.pusenje} onChange={(v) => set({ pusenje: v })} />
          </Field>
          <Field label="Alkohol">
            <ChipGroup options={["Ne pijem", "Retko", "Vikendom", "Često"]} value={data.alkohol} onChange={(v) => set({ alkohol: v })} />
          </Field>
        </>
      ),
    },
    {
      title: "Početne fotografije",
      subtitle: "Front, leđa i profil — za poređenje napretka",
      valid: true,
      body: (
        <>
          <div className="grid grid-cols-3 gap-3">
            <PhotoSlot label="Front" file={data.slike.front} onChange={(f) => set({ slike: { ...data.slike, front: f } })} />
            <PhotoSlot label="Leđa" file={data.slike.ledja} onChange={(f) => set({ slike: { ...data.slike, ledja: f } })} />
            <PhotoSlot label="Profil" file={data.slike.profil} onChange={(f) => set({ slike: { ...data.slike, profil: f } })} />
          </div>
          <p className="text-[12px] text-gray-350 mt-4 leading-relaxed">
            Napomena: fotografije se prikazuju samo u ovoj sesiji, u ovom pregledaču.
          </p>
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
    setSubmitting(true);
    const slug = slugify(data.ime) || "klijent";
    const payload = {
      ...data,
      slike: {
        front: data.slike.front?.name || null,
        ledja: data.slike.ledja?.name || null,
        profil: data.slike.profil?.name || null,
      },
      timestamp: Date.now(),
    };
    await storageSet(`client:${slug}:onboarding`, payload);
    setSubmitting(false);
    setDone(true);
  };

  if (step === totalSteps) {
    return <ThankYou onSubmit={handleSubmit} submitting={submitting} done={done} />;
  }

  return (
    <div>
      <ProgressHeader
        step={step}
        total={totalSteps}
        title={cur.title}
        subtitle={cur.subtitle}
        onBack={step === 0 ? () => router.push("/") : () => setStep((s) => s - 1)}
        brandLabel="POČETNI UPITNIK"
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
