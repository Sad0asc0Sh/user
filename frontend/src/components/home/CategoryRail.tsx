"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { CATEGORIES } from "@/lib/mock/homeData";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function CategoryRail() {
    return (
        <div className="py-4 bg-white border-b border-gray-100">
            <SectionTitle>دسته‌بندی‌های‌محبوب</SectionTitle>
            <Swiper
                modules={[FreeMode, Autoplay]}
                freeMode={true}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={4000}
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full !px-4 free-mode-slider"
                grabCursor={true}
            >
                {CATEGORIES.map((category) => (
                    <SwiperSlide key={category.id} style={{ width: "80px" }}>
                        <div className="flex flex-col items-center gap-2 cursor-pointer select-none">
                            <div className="w-16 h-16 rounded-full bg-welf-50 border border-welf-100 flex items-center justify-center overflow-hidden">
                                {/* Placeholder Icon/Image */}
                                <div className="w-full h-full bg-gray-200" />
                            </div>
                            <span className="text-[10px] font-medium text-welf-900 text-center leading-tight">
                                {category.name}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
