// Next.js automatski servira ovo kao /sitemap.xml
// Koristi NEXT_PUBLIC_SITE_URL env promenljivu ako je podešena (preporučeno
// kad povežeš pravi domen), u suprotnom pada na mihajlofitness.fit.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mihajlofitness.fit";

export default function sitemap() {
  // Samo javne, indeksabilne stranice — portal rute (checkin, napredak,
  // /app/edukacija, /app/kontakt...) su iza login-a i ne treba da budu
  // u sitemap-u. /edukacija i /kontakt ovde su njihove JAVNE verzije.
  const routes = ["", "/o-meni", "/coaching", "/edukacija", "/kalkulator", "/faq", "/kontakt"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
