import HeroSection from "@/components/home/HeroSection";
import CategoryRail from "@/components/home/CategoryRail";
import FlashOfferRail from "@/components/home/FlashOfferRail";
import SpecialOfferRail from "@/components/home/SpecialOfferRail";
import ProductRailContainer from "@/components/home/ProductRailContainer";
import ServicesGrid from "@/components/home/ServicesGrid";
import BrandsStrip from "@/components/home/BrandsStrip";
import ValueProposition from "@/components/home/ValueProposition";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-2 pb-4">
      <HeroSection />
      <CategoryRail />
      <FlashOfferRail />
      <SpecialOfferRail />
      <ProductRailContainer title="پرفروش‌ترین‌ها" fetchType="bestSellers" limit={10} />
      <ProductRailContainer title="جدیدترین‌ها" fetchType="newest" limit={10} />
      <ServicesGrid />
      <BrandsStrip />
      <ValueProposition />
    </div>
  );
}
