import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import HeroSection from "@/components/homepage/HeroSection";
import MarketplaceStatistics from "@/components/homepage/MarketplaceStatistics";
import PopularCategories from "@/components/homepage/PopularCategories";
import SuccessStories from "@/components/homepage/SuccessStories";
import SustainabilityImpact from "@/components/homepage/SustainabilityImpact";
import TrustedSellersShowcase from "@/components/homepage/TrustedSellersShowcase";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <PopularCategories />
      <SuccessStories />
      <MarketplaceStatistics />
      <SustainabilityImpact />
      <TrustedSellersShowcase />
    </div>
  );
}
