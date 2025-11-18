"use client";

import Link from "next/link";

import { CountdownTimer } from "@/components/ui/CountdownTimer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  FlashSaleProduct,
  FlashSaleProductCard,
} from "@/components/sales/FlashSaleProductCard";
import { cn } from "@/lib/utils";

const mockFlashSaleProducts: FlashSaleProduct[] = [
  {
    id: "fs-1",
    name: "لپ تاپ ۱۵.۶ اینچی لنوو مدل IdeaPad Slim 3",
    image:
      "https://placehold.co/400x400/fef2f2/ef4444?text=Laptop",
    price: 32_499_000,
    compareAtPrice: 36_990_000,
    stock: 8,
    sold: 22,
  },
  {
    id: "fs-2",
    name: "هدفون بی‌سیم مدل A997BL",
    image:
      "https://placehold.co/400x400/eff6ff/1d4ed8?text=Headphone",
    price: 1_199_000,
    compareAtPrice: 1_599_000,
    stock: 12,
    sold: 38,
  },
  {
    id: "fs-3",
    name: "هندزفری بلوتوث Cozy Pods W7n Pro",
    image:
      "https://placehold.co/400x400/ecfeff/0e7490?text=Earbuds",
    price: 1_670_000,
    compareAtPrice: 2_150_000,
    stock: 15,
    sold: 45,
  },
  {
    id: "fs-4",
    name: "گوشی موبایل شیائومی Redmi Note 14 Pro 4G",
    image:
      "https://placehold.co/400x400/eff6ff/1e3a8a?text=Redmi",
    price: 34_899_000,
    compareAtPrice: 38_990_000,
    stock: 6,
    sold: 30,
  },
  {
    id: "fs-5",
    name: "گوشی موبایل سامسونگ Galaxy A56 دو سیم‌کارت",
    image:
      "https://placehold.co/400x400/edfdfb/047857?text=Galaxy+A",
    price: 43_500_000,
    compareAtPrice: 46_990_000,
    stock: 10,
    sold: 40,
  },
  {
    id: "fs-6",
    name: "گوشی موبایل ریلمی Plus 12 حافظه 512 گیگابایت",
    image:
      "https://placehold.co/400x400/ecfdf5/0f766e?text=Realme",
    price: 25_959_000,
    compareAtPrice: 29_990_000,
    stock: 5,
    sold: 35,
  },
];

const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

interface FlashSaleSectionProps {
  className?: string;
}

export function FlashSaleSection({ className }: FlashSaleSectionProps) {
  return (
    <section className={cn("w-full py-6 md:py-10", className)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col gap-6 rounded-xl bg-sale-bg p-4 shadow-soft-lg md:flex-row md:items-stretch",
            "md:p-6 lg:p-8"
          )}
        >
          {/* Right / Top: Title & Timer */}
          <div className="flex w-full flex-col justify-between gap-4 border-b border-red-300/40 pb-4 text-right md:w-64 md:border-b-0 md:border-l md:border-l-red-300/40 md:pb-0 md:pl-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-sale-text px-3 py-1 text-xs font-medium text-sale-bg">
                <span className="h-2 w-2 rounded-full bg-sale-bg" />
                <span>پیشنهادات شگفت‌انگیز</span>
              </div>
              <h2 className="text-xl font-extrabold text-sale-text md:text-2xl">
                پیشنهادات شگفت‌انگیز امروز
              </h2>
              <p className="text-xs text-sale-text/80 md:text-sm">
                فرصت را از دست نده! این پیشنهادها فقط تا پایان شمارش
                معکوس فعال هستند.
              </p>
            </div>

            <div className="space-y-3">
              <CountdownTimer targetDate={targetDate} />
              <Link
                href="/flash-sale"
                className="inline-flex items-center justify-end text-xs font-medium text-sale-text hover:underline md:text-sm"
              >
                مشاهده همه
                <span className="mr-1 inline-block rotate-180">›</span>
              </Link>
            </div>
          </div>

          {/* Left / Bottom: Product Carousel */}
          <div className="flex-1">
            <Carousel
              opts={{
                align: "start",
                direction: "rtl",
                dragFree: true,
              }}
              className="relative w-full"
            >
              <CarouselContent className="-mr-2 md:-mr-4">
                {mockFlashSaleProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 pr-2 sm:basis-1/3 md:basis-1/4 md:pr-4 lg:basis-1/5"
                  >
                    <FlashSaleProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-header-border bg-white text-text-primary shadow-soft hover:bg-gray-50 lg:flex" />
              <CarouselNext className="absolute -left-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-header-border bg-white text-text-primary shadow-soft hover:bg-gray-50 lg:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

