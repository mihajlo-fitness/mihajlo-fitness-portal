import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function PortalLayout({ children }) {
  return (
    <div className="md:flex md:min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen pb-24 md:pb-8">
        {children}
        <Footer />
      </main>
      <MobileNav />
    </div>
  );
}
