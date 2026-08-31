
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mihajlofitness.fit"),
  // Namerno "Online fitness coaching", NE "Klijentski portal" — ovo je
  // ono što se vidi u Google rezultatima i kad se link deli, i mora da
  // predstavlja coaching biznis, ne interni alat.
  title: "Mihajlo Fitness Coach — Online fitness trener u Srbiji",
  description:
    "Individualni planovi ishrane i treninga, nedeljni check-in i praćenje napretka sa sertifikovanim online fitness trenerom. Besplatan kalkulator kalorija.",
  keywords: [
    "fitness coach Srbija",
    "online trener",
    "personalni trener online",
    "plan ishrane",
    "plan treninga",
    "mršavljenje",
    "online coaching",
    "Mihajlo Fitness",
  ],
  openGraph: {
    title: "Mihajlo Fitness Coach — Online fitness trener u Srbiji",
    description: "Individualni planovi ishrane i treninga, nedeljni check-in, praćenje napretka. Prijavi se za saradnju.",
    // siteName je poseban signal koji Google/društvene mreže koriste da
    // odluče koje TAČNO ime da prikažu za brend — bitno za pretragu po
    // imenu ("Mihajlo Fitness Coach"), ne samo za naslov stranice.
    siteName: "Mihajlo Fitness Coach",
    locale: "sr_RS",
    type: "website",
  },
  // Kad dodaš sajt u Google Search Console, ovde nalepi verifikacioni kod
  // (Search Console → Settings → Ownership verification → HTML tag → samo
  // vrednost content="..." atributa, bez ostatka taga).
  verification: {
    google: "",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  // Strukturirani podaci (JSON-LD) — direktan signal Google-u koje je
  // TAČNO ime brenda kad neko pretražuje po imenu ("Mihajlo Fitness
  // Coaching"). Ovo je odvojeno od <title> taga — Google Knowledge
  // Panel/naziv u rezultatima često se oslanja baš na ovo.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mihajlo Fitness Coach",
    alternateName: "Mihajlo Fitness Coaching",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mihajlofitness.fit",
    description: "Online fitness coaching u Srbiji — individualni planovi ishrane i treninga, nedeljno praćenje napretka.",
    areaServed: "RS",
  };

  return (
    <html lang="sr">
      <body className={inter.variable + " font-sans bg-white text-gray-900 antialiased"}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
