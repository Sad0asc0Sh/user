import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discount?: boolean;
  isNew?: boolean;
  className?: string;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  imageUrl,
  discount,
  isNew,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]",
        className
      )}
    >
      <div className="relative">
        {/* Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          {discount && (
            <span className="rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground shadow-sm">
              تخفیف
            </span>
          )}
          {isNew && (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
              جدید
            </span>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Actions on Hover */}
        <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-white/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-none bg-white text-slate-700 shadow-sm hover:bg-slate-100"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            <span className="sr-only">
              افزودن به سبد خرید
            </span>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-none bg-white text-rose-500 shadow-sm hover:bg-rose-50"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
            <span className="sr-only">
              افزودن به علاقه‌مندی‌ها
            </span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-3">
        <h3 className="mb-1.5 line-clamp-2 text-base font-semibold text-slate-900">
          {title}
        </h3>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {price.toLocaleString("fa-IR")} تومان
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {originalPrice.toLocaleString("fa-IR")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only Add to Cart Button */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-2 md:hidden">
        <Button
          variant="outline"
          className="w-full rounded-full border-none bg-white shadow-sm"
        >
          <ShoppingCart className="ml-2 h-4 w-4" strokeWidth={1.5} />
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  );
}