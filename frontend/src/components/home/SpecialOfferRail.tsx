"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { PRODUCTS } from "@/lib/mock/homeData";
import { Timer } from "lucide-react";

export default function SpecialOfferRail() {
    return (
        <div className="py-8 bg-gray-600 relative overflow-hidden">
            {/* Golden Strips Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vita-400 to-vita-600 opacity-80" />
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-vita-400 to-vita-600 opacity-80" />

            <div className="px-4 mb-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        <span className="text-welf-900">محصولات </span>
                        <span className="text-vita-600">شگفت‌انگیز</span>
                    </h2>
                    {/* Global Timer */}
                    <div className="flex items-center gap-2 bg-welf-900 px-3 py-1.5 rounded-lg text-vita-500 font-mono text-sm font-bold shadow-sm">
                        <Timer size={16} />
                        <span>05:00:00</span>
                    </div>
                </div>
            </div>

            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full !px-4"
                grabCursor={true}
            >
                {PRODUCTS.map((product) => (
                    <SwiperSlide key={product.id} style={{ width: "150px" }}>
                        <div className="flex flex-col gap-2 bg-white p-3 rounded-2xl shadow-sm border border-white hover:border-vita-200 transition-colors cursor-pointer group">
                            {/* Image */}
                            <div className="aspect-square rounded-xl bg-gray-50 overflow-hidden relative">
                                <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
                                {product.discount > 0 && (
                                    <span className="absolute top-2 right-2 bg-vita-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {product.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-1">
                                <h4 className="text-xs font-bold text-welf-800 truncate leading-relaxed">{product.name}</h4>
                                <div className="flex flex-col items-end mt-1">
                                    {product.discount > 0 && (
                                        <span className="text-[10px] text-gray-400 line-through decoration-red-400">
                                            {(product.price * 1.1).toLocaleString("fa-IR")}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-black text-welf-900">
                                            {product.price.toLocaleString("fa-IR")}
                                        </span>
                                        <span className="text-[10px] text-welf-500 font-medium">تومان</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
