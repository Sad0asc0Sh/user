"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { PRODUCTS } from "@/lib/mock/homeData";
import { Timer } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function FlashOfferRail() {
    return (
        <div className="py-6 bg-white">
            <div className="flex items-center gap-2 px-4 mb-2">
                <Timer className="text-vita-500 w-5 h-5" />
                <SectionTitle className="!mb-0 !px-0">پیشنهادات لحظه‌ای</SectionTitle>
            </div>

            <Swiper
                modules={[FreeMode, Autoplay]}
                freeMode={true}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={5000}
                spaceBetween={12}
                slidesPerView={"auto"}
                className="w-full !px-4 free-mode-slider"
                grabCursor={true}
            >
                {PRODUCTS.slice(0, 4).map((product) => (
                    <SwiperSlide key={product.id} style={{ width: "130px" }}>
                        <div className="flex flex-col gap-2 p-2 rounded-xl border border-gray-100 bg-white shadow-sm cursor-pointer select-none">
                            {/* Timer Badge */}
                            <div className="self-start px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold">
                                02:15:00
                            </div>

                            {/* Image */}
                            <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden relative">
                                <div className="w-full h-full bg-gray-200" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col">
                                <h4 className="text-xs font-medium text-welf-800 truncate">{product.name}</h4>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-sm font-bold text-welf-900">
                                        {product.price.toLocaleString("fa-IR")}
                                    </span>
                                    <span className="text-[10px] text-welf-400">تومان</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
