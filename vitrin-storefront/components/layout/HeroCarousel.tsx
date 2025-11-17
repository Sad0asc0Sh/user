"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const banners = [
  {
    src: "https://placehold.co/600x600/ffffff/7c3aed?text=Product+1",
    alt: "Banner 1",
    badge: "جدیدترین",
    title: "کلکسیون جدیدترین مدل‌های ساعت هوشمند",
    subtitle:
      "از برندهای معتبر دنیا با بهترین قیمت‌ها و گارانتی اصلی.",
  },
  {
    src: "https://placehold.co/600x600/ffffff/2563eb?text=Product+2",
    alt: "Banner 2",
    badge: "تخفیف ویژه",
    title: "لوازم جانبی موبایل و تبلت",
    subtitle:
      "هرآنچه برای گوشی خود نیاز دارید، از کاور تا پاوربانک.",
  },
  {
    src: "https://placehold.co/600x600/ffffff/0f766e?text=Product+3",
    alt: "Banner 3",
    badge: "پیشنهاد شگفت‌انگیز",
    title: "تجهیزات گیمینگ، هیجان بی‌وقفه",
    subtitle:
      "جدیدترین گجت‌های روز دنیا برای تجربه‌ای متفاوت.",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full bg-gradient-to-b from-[#f4f0ff] via-[#faf5ff] to-[#f1f5ff]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          direction: "rtl",
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative overflow-hidden">
                <div className="container mx-auto flex flex-col items-center justify-between gap-10 py-10 md:flex-row md:py-16 lg:gap-16 lg:py-20">
                  {/* Text column */}
                  <div className="flex max-w-xl flex-col items-center space-y-4 text-center md:items-start md:text-right">
                    <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-xs font-semibold text-primary shadow-sm">
                      {banner.badge}
                    </span>
                    <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                      {banner.title}
                    </h1>
                    <p className="text-sm text-slate-600 md:text-base">
                      {banner.subtitle}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-3 text-sm font-semibold"
                      >
                        خرید
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-slate-200 bg-white/70 px-6 py-3 text-sm text-slate-700 shadow-sm backdrop-blur"
                      >
                        مشاهده بیشتر
                      </Button>
                    </div>
                  </div>

                  {/* Product visual */}
                  <div className="relative w-full max-w-sm md:max-w-md">
                    <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
                      <div className="absolute inset-x-8 bottom-8 h-10 rounded-full bg-purple-300/40 blur-2xl md:inset-x-10 md:bottom-10" />
                      <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] bg-gradient-to-tr from-white via-[#f6ebff] to-[#e0f2ff] shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
                        <Image
                          src={banner.src}
                          alt={banner.alt}
                          width={360}
                          height={360}
                          priority={index === 0}
                          className="h-44 w-44 object-contain drop-shadow-xl md:h-52 md:w-52"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-sm hover:bg-white md:flex md:right-8" />
        <CarouselNext className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-sm hover:bg-white md:flex md:left-8" />
      </Carousel>
    </section>
  );
}