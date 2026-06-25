import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import HeroSection from "@/components/homepage/HeroSection";
import PopularCategories from "@/components/homepage/PopularCategories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <PopularCategories />
    </div>
  );
}
