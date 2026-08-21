import EdukacijaClient from "./EdukacijaClient";

export const metadata = {
  title: "Besplatna edukacija — Mihajlo Fitness Coach",
  description:
    "Besplatne video lekcije o treningu, ishrani i dosledności — od prvog treninga u teretani do samostalnog napredovanja. Nove lekcije svake nedelje.",
};

export default function JavnaEdukacijaPage() {
  return <EdukacijaClient />;
}
