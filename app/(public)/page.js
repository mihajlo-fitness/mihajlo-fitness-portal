import HomeClient from "./HomeClient";

export const metadata = {
  title: "Mihajlo Fitness Coach — Online fitness trener u Srbiji",
  description:
    "Individualni planovi ishrane i treninga, nedeljni check-in i praćenje napretka sa sertifikovanim online fitness trenerom. Besplatan kalkulator kalorija.",
};

export default function HomePage() {
  return <HomeClient />;
}
