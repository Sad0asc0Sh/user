"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Product } from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);

    const isFavorite = isInWishlist(product.id);
    const discountPercentage = product.discount || 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div
            className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        {discountPercentage}% تخفیف
                    </span>
                )}
                {product.isFlashDeal && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm animate-pulse">
                        فروش ویژه
                    </span>
                )}
            </div>

            {/* Image Gallery Slider */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Link href={`/product/${product.id || product.slug}`} className="block w-full h-full">
                    {/* If hovered and has multiple images, show slider */}
                    {isHovered && product.images && product.images.length > 1 ? (
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            className="w-full h-full"
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                        >
                            {product.images.slice(0, 5).map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={img}
                                            alt={`${product.title} - ${idx + 1}`}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        /* Static Image */
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                fill
                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    )}
                </Link>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                {/* Category */}
                {product.category && (
                    <span className="text-[10px] text-gray-400 font-medium truncate">
                        {product.category}
                    </span>
                )}

                {/* Title */}
                <Link href={`/product/${product.id || product.slug}`} className="block">
                    <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 min-h-[2.5em] hover:text-vita-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{product.rating || 0}</span>
                    <span className="text-[10px] text-gray-400">({product.reviewCount || 0})</span>
                </div>

                <div className="mt-auto pt-3 flex items-end justify-between">
                    {/* Price */}
                    <div className="flex flex-col">
                        {product.oldPrice && (
                            <span className="text-[11px] text-gray-400 line-through decoration-red-500/50">
                                {product.oldPrice.toLocaleString("fa-IR")}
                            </span>
                        )}
                        <div className="flex items-center gap-1">
                            <span className="text-base font-black text-gray-900">
                                {product.price.toLocaleString("fa-IR")}
                            </span>
                            <span className="text-[10px] text-gray-500">تومان</span>
                        </div>
                    </div>

                    {/* Add to Wishlist Button (Replaces Cart) */}
                    <button
                        onClick={handleToggleWishlist}
                        className={`
              w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm
              ${isFavorite
                                ? "bg-red-50 text-red-500 border border-red-100"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }
            `}
                    >
                        <Heart size={18} className={isFavorite ? "fill-red-500" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
}
