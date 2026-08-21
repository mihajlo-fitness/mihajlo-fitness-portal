// Next.js automatski servira ovo kao /robots.txt
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mihajlofitness.fit";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/trener",
        "/trener/",
        "/api/",
        "/app",
        "/napredak",
        "/moj-plan",
        "/checkin",
        "/onboarding",
        "/dokumenti",
        "/prijava",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
