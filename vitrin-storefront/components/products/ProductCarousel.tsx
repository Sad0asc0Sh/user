"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard, Product } from "@/components/products/ProductCard";

// داده‌های نمونه برای اسلایدر محصولات
const mockProducts: Product[] = [
  {
    id: "1",
    name: "گوشی موبایل سامسونگ Galaxy S24 Ultra",
    category: "موبایل و تبلت",
    price: 45_000_000,
    priceAfterDiscount: 39_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Galaxy+S24",
    rating: 4.8,
    isNew: true,
    hasDiscount: true,
  },
  {
    id: "2",
    name: "گوشی موبایل اپل iPhone 15 Pro Max",
    category: "موبایل و تبلت",
    price: 58_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=iPhone+15",
    rating: 4.9,
    isNew: true,
    hasDiscount: false,
  },
  {
    id: "3",
    name: "هدفون بلوتوث سونی WH-1000XM5",
    category: "هدفون و هندزفری",
    price: 12_000_000,
    priceAfterDiscount: 9_500_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Sony+WH",
    rating: 4.7,
    hasDiscount: true,
  },
  {
    id: "4",
    name: "ساعت هوشمند Apple Watch Series 9",
    category: "ساعت و گجت پوشیدنی",
    price: 18_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Apple+Watch",
    rating: 4.6,
  },
  {
    id: "5",
    name: "تبلت سامسونگ Galaxy Tab S9",
    category: "تبلت",
    price: 22_000_000,
    priceAfterDiscount: 19_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Tab+S9",
    rating: 4.5,
    hasDiscount: true,
  },
  {
    id: "6",
    name: "لپ‌تاپ اپل MacBook Air M2",
    category: "لپ‌تاپ و کامپیوتر",
    price: 55_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MacBook+Air",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "7",
    name: "کیبورد بی‌سیم لاجیتک MX Keys",
    category: "لوازم جانبی کامپیوتر",
    price: 4_500_000,
    priceAfterDiscount: 3_800_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MX+Keys",
    rating: 4.4,
    hasDiscount: true,
  },
  {
    id: "8",
    name: "ماوس بی‌سیم لاجیتک MX Master 3S",
    category: "لوازم جانبی کامپیوتر",
    price: 3_200_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MX+Master",
    rating: 4.8,
  },
];

interface ProductCarouselProps {
  title: string;
  viewAllLink?: string;
  products?: Product[];
}

export function ProductCarousel({
  title,
  viewAllLink = "#",
  products = mockProducts,
}: ProductCarouselProps) {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary md:text-2xl">
            {title}
          </h2>
          <Link
            href={viewAllLink}
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            dragFree: true,
          }}
          className="relative w-full"
        >
          <CarouselContent className="-mr-2 md:-mr-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 pr-2 sm:basis-1/3 md:basis-1/4 md:pr-4 lg:basis-1/5"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute -right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-header-border bg-white text-text-primary shadow-soft hover:bg-gray-50 lg:flex" />
          <CarouselNext className="absolute -left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-header-border bg-white text-text-primary shadow-soft hover:bg-gray-50 lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}

