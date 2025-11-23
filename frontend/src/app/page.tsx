import HeroSection from "@/components/home/HeroSection";
import CategoryRail from "@/components/home/CategoryRail";
import FlashOfferRail from "@/components/home/FlashOfferRail";
import SpecialOfferRail from "@/components/home/SpecialOfferRail";
import ProductRail from "@/components/home/ProductRail";
import ServicesGrid from "@/components/home/ServicesGrid";
import BrandsStrip from "@/components/home/BrandsStrip";
import ValueProposition from "@/components/home/ValueProposition";
import { PRODUCTS } from "@/lib/mock/homeData";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-2 pb-4">
      <HeroSection />
      <CategoryRail />
      <FlashOfferRail />
      <SpecialOfferRail />
      <ProductRail title="پرفروش‌ترین‌ها" products={PRODUCTS} />
      <ServicesGrid />
      <BrandsStrip />
      <ValueProposition />
    </div>
  );
}
