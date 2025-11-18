"use client";

import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface FlashSaleProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  sold?: number;
}

interface FlashSaleProductCardProps {
  product: FlashSaleProduct;
  className?: string;
}

export function FlashSaleProductCard({
  product,
  className,
}: FlashSaleProductCardProps) {
  const { name, image, price, compareAtPrice, stock, sold = 0 } = product;

  const total = stock + sold;
  const soldPercentage = total > 0 ? Math.round((sold / total) * 100) : 0;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white",
        "shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-shadow duration-200",
        "hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]",
        className
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 text-right">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-medium text-text-primary sm:text-sm">
          {name}
        </h3>

        <div className="mt-1 flex flex-col items-end gap-1">
          <span className="text-sm font-bold text-brand-primary sm:text-base">
            {price.toLocaleString("fa-IR")} تومان
          </span>
          <span className="text-[11px] text-text-secondary line-through sm:text-xs">
            {compareAtPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <Progress value={soldPercentage} />
          <div className="flex items-center justify-between text-[11px] text-text-secondary sm:text-xs">
            <span>
              فقط {stock.toLocaleString("fa-IR")} عدد باقی مانده
            </span>
            <span className="font-medium text-brand-primary">
              {soldPercentage.toLocaleString("fa-IR")}٪ فروش
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

