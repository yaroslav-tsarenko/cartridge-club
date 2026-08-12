import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { DealsShelf } from "@/components/home/DealsShelf";
import { TopCharts } from "@/components/home/TopCharts";
import { NewAndPreorders } from "@/components/home/NewAndPreorders";
import { GenreExplorer } from "@/components/home/GenreExplorer";
import { BargainBin } from "@/components/home/BargainBin";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { GiftCards } from "@/components/home/GiftCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <DealsShelf />
        <TopCharts />
        <NewAndPreorders />
        <GenreExplorer />
        <BargainBin />
        <PlatformShowcase />
        <GiftCards />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
