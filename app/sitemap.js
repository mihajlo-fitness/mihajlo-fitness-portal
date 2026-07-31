// Next.js automatski servira ovo kao /sitemap.xml
// Napomena: zameni "https://tvoj-sajt.vercel.app" tvojim pravim URL-om
// (ili sopstvenim domenom kad ga budeš imao).
const BASE_URL = "https://mihajlo-fitness-portal.vercel.app";

export default function sitemap() {
  const routes = ["", "/coaching", "/edukacija", "/kontakt", "/faq"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
