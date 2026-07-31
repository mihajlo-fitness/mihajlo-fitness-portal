// Next.js automatski servira ovo kao /robots.txt
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/trener", "/trener/", "/api/", "/napredak", "/moj-plan", "/checkin", "/onboarding"],
    },
    sitemap: "https://mihajlo-fitness-portal.vercel.app/sitemap.xml",
  };
}
