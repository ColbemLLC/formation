import { Navbar } from "@/marketing/Navbar";
import { Hero } from "@/marketing/Hero";
import { Features } from "@/marketing/Features";
import Footer from "@/marketing/Footer";
import { LOGIN_URL } from "@/marketing/links";

export default function Page() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Features />
      </main>
      <Footer
        wordmark="colbe"
        navLabel="login"
        navHref={LOGIN_URL}
        chatHref=""
        jobs={[]}
        address={[]}
        email=""
        note=""
        socials={[]}
        credits={[]}
        height="70svh"
      />
    </>
  );
}