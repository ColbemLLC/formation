import { Navbar } from "@/marketing/Navbar";
import { Hero } from "@/marketing/Hero";
import { ReadmePanel } from "@/marketing/ReadmePanel";
import { Features } from "@/marketing/Features";
import Footer from "@/marketing/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="lg:flex">
        <Hero />
        <main className="min-w-0 flex-1 border-border lg:border-l lg:pt-14">
          <ReadmePanel />
          <Features />
          <Footer />
        </main>
      </div>
    </>
  );
}