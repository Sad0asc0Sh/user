"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ProductRailProps {
    title: string;
    products: any[];
}

export default function ProductRail({ title, products }: ProductRailProps) {
    return (
        <div className="py-6 bg-white">
            <SectionTitle>{title}</SectionTitle>

            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full !px-4"
                grabCursor={true}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} style={{ width: "140px" }}>
                        <div className="flex flex-col gap-2 group cursor-pointer select-none">
                            {/* Image Container */}
                            <div className="relative aspect-square rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                                <div className="w-full h-full bg-gray-200" />
                            </div>
                            {/* Minimal Info */}
                            <div className="flex flex-col">
                                <span className="text-[10px] text-welf-400">{product.category}</span>
                                <h4 className="text-xs font-medium text-welf-800 truncate">{product.name}</h4>
                                <span className="text-sm font-bold text-vita-600 mt-1">
                                    {product.price.toLocaleString("fa-IR")} تومان
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
