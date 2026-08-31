import FaqClient from "./FaqClient";

export const metadata = {
  title: "Najčešća pitanja — Mihajlo Fitness Coach",
  description:
    "Odgovori na najčešća pitanja o paketima, cenama, nedeljnom check-inu, privatnosti podataka i tome kako izgleda saradnja sa online fitness trenerom.",
};

export default function FaqPage() {
  return <FaqClient />;
}
