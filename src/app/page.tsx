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
import { searchProducts } from "@/lib/kinguin";

export default async function HomePage() {
  const [popular, bargains, fresh] = await Promise.all([
    searchProducts({ limit: 40, priceFrom: 3, sortBy: "updatedAt", sortType: "desc" }),
    searchProducts({ limit: 16, priceFrom: 1, priceTo: 8 }),
    searchProducts({ limit: 24, sortBy: "kinguinId", sortType: "desc" }),
  ]);

  const withImg = popular.products.filter((p) => p.cover);
  const bargainProducts = bargains.products.filter((p) => p.cover);
  const freshProducts = fresh.products.filter((p) => p.cover);

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
        <Hero products={withImg.slice(0, 5)} />
        <DealsShelf products={withImg.slice(0, 12)} />
        <TopCharts products={withImg.slice(0, 10)} />
        <NewAndPreorders products={freshProducts.slice(0, 8)} />
        <GenreExplorer products={withImg.slice(0, 16)} />
        <BargainBin products={bargainProducts.slice(0, 8)} />
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
