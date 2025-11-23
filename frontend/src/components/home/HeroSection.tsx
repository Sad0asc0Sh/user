"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { HERO_SLIDES, BANNERS } from "@/lib/mock/homeData";

export default function HeroSection() {
    return (
        <section className="flex flex-col gap-2 p-4">
            {/* Main Slider */}
            <div className="w-full rounded-2xl overflow-hidden shadow-sm">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="w-full aspect-[2/1]"
                >
                    {HERO_SLIDES.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative w-full h-full bg-gray-200">
                            {/* Placeholder for actual image */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                {slide.alt}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Static Banners (3 stacked vertically as requested) */}
            <div className="grid grid-cols-1 gap-2">
                {BANNERS.slice(0, 3).map((banner) => (
                    <div key={banner.id} className="w-full aspect-[4/1] rounded-xl overflow-hidden bg-gray-100 relative">
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            {banner.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
