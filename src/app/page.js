import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import HeroSection from "@/components/homepage/HeroSection";
import PopularCategories from "@/components/homepage/PopularCategories";
import SuccessStories from "@/components/homepage/SuccessStories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <PopularCategories />
      <SuccessStories />
    </div>
  );
}
