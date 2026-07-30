import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

export const metadata = {
  title: "Mihajlo Fitness Coach — Klijentski portal",
  description: "Nedeljni check-in, napredak, planovi i edukacija za klijente Mihajlo Fitness Coach-a.",
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
