"use client";
import HeroSection from "@/components/home/HeroSection";
import CategoryRail from "@/components/home/CategoryRail";
import FlashOfferRail from "@/components/home/FlashOfferRail";
import SpecialOfferRail from "@/components/home/SpecialOfferRail";
import ProductRailContainer from "@/components/home/ProductRailContainer";
import ServicesGrid from "@/components/home/ServicesGrid";
import BrandsStrip from "@/components/home/BrandsStrip";
import ValueProposition from "@/components/home/ValueProposition";
import { useEffect, useState } from "react";
import { Category, categoryService } from "@/services/categoryService";

export default function Home() {
  const [featuredCats, setFeaturedCats] = useState<Category[]>([]);
  const [popularCats, setPopularCats] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, popular] = await Promise.all([
          categoryService.getFeatured(),
          categoryService.getPopular()
        ]);
        setFeaturedCats(featured);
        setPopularCats(popular);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-2 pb-4">
      <HeroSection />

      {/* Featured Categories (Circles) */}
      <CategoryRail
        title="دسته‌بندی‌های ویژه"
        variant="circle"
        data={featuredCats}
      />

      {/* Popular Categories (Cards) */}
      <CategoryRail
        title="محبوب‌ترین دسته‌ها"
        variant="card"
        data={popularCats}
      />

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
