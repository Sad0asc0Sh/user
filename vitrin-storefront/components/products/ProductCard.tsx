"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  category?: string;
  price: number;
  priceAfterDiscount?: number;
  image: string;
  rating?: number;
  isNew?: boolean;
  hasDiscount?: boolean;
}

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  isLoading = false,
  className,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (isLoading) {
    return (
      <div className={cn("overflow-hidden rounded-xl bg-white", className)}>
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    );
  }

  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100
      )
    : 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white border border-transparent",
        "transition-all duration-300 ease-out",
        "hover:border-header-border hover:shadow-soft",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-300",
            "group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges - Top Right (RTL) */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {product.hasDiscount && discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="bg-badge-bg text-badge-text shadow-sm"
            >
              {discountPercentage}% تخفیف
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-brand-primary text-white shadow-sm">
              جدید
            </Badge>
          )}
        </div>

        {/* Wishlist Button - Top Left (RTL) */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-3 top-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm",
            "transition-all duration-200 hover:bg-white hover:scale-110",
            "shadow-sm opacity-0 group-hover:opacity-100"
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </Button>
      </div>

      {/* Content Section */}
      <div className="space-y-3 p-4 text-right">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-text-secondary">{product.category}</p>
        )}

        {/* Title */}
        <h3 className="line-clamp-2 leading-snug font-bold text-text-primary">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating !== undefined && (
          <div className="flex items-center justify-end gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "h-4 w-4",
                  index < Math.floor(product.rating!)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
            <span className="mr-2 text-xs text-text-secondary">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-end gap-2">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-lg font-bold text-text-primary">
                {product.priceAfterDiscount.toLocaleString("fa-IR")} تومان
              </span>
              <span className="text-sm text-text-secondary line-through">
                {product.price.toLocaleString("fa-IR")}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-text-primary">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button variant="outline" className="w-full gap-2 font-medium">
          <ShoppingCart className="h-4 w-4" />
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  );
}

