import KalkulatorClient from "./KalkulatorClient";

export const metadata = {
  title: "Besplatan kalkulator kalorija i makroa — Mihajlo Fitness Coach",
  description:
    "Izračunaj svoje dnevne kalorije, makronutrijente i BMI za 30 sekundi, potpuno besplatno — prvi korak pre nego što napraviš plan ishrane ili treninga.",
};

export default function KalkulatorPage() {
  return <KalkulatorClient />;
}
