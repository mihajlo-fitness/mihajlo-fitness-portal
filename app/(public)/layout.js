import PublicHeader from "@/components/PublicHeader";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
