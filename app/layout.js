import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

export const metadata = {
  title: "Mihajlo Fitness Coach — Klijentski portal",
  description: "Online fitness coaching u Srbiji — individualni planovi ishrane i treninga, nedeljni check-in, praćenje napretka. Prijavi se za saradnju sa sertifikovanim personalnim trenerom.",
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
    title: "Mihajlo Fitness Coach — Klijentski portal",
    description: "Online fitness coaching — individualni planovi, nedeljni check-in, praćenje napretka. Prijavi se za saradnju.",
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
  return (
    <html lang="sr">
      <body className={inter.variable + " font-sans bg-white text-gray-900 antialiased"}>
        <div className="md:flex md:min-h-screen">
          <Sidebar />
          <main className="flex-1 min-h-screen pb-24 md:pb-8">{children}</main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
