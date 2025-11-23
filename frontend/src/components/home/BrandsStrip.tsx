"use client";
import { useState } from "react";
import { BRANDS } from "@/lib/mock/homeData";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function BrandsStrip() {
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  return (
    <div className="py-8 bg-white">
      <SectionTitle>برندهای همکار</SectionTitle>
      <div className="flex items-center justify-between px-4 gap-2">
        {BRANDS.slice(0, 5).map((brand) => (
          <div
            key={brand.id}
            onClick={() => setActiveBrand(brand.id)}
            className={`
              flex-shrink-0 transition-all duration-500 cursor-pointer
              ${activeBrand === brand.id ? 'grayscale-0 scale-110 opacity-100' : 'grayscale opacity-70 scale-100'}
            `}
          >
            {/* Placeholder for Logo */}
            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center text-[8px] font-bold border
              ${activeBrand === brand.id ? 'bg-white border-vita-200 shadow-md text-vita-600' : 'bg-gray-50 border-gray-100 text-gray-400'}
            `}>
              {brand.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
