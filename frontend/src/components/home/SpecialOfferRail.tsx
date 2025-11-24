"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { ChevronLeft, Percent } from "lucide-react";
import Link from "next/link";
import { productService, Product } from "@/services/productService";

export default function SpecialOfferRail() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getDiscounted(10);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch special offer products:", err);
        setError("خطا در دریافت پیشنهادهای ویژه");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || error || products.length === 0) {
    return null;
  }

  return (
    <div className="py-5 bg-gray-900 relative overflow-hidden touch-pan-y">
      <div className="container mx-auto">
        <div className="px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 border-[1.5px] border-white rounded-full flex items-center justify-center">
              <Percent size={12} className="text-white fill-white" />
            </div>
            <h2 className="text-base font-bold text-white">
              U?O�U^O'�?OU^UOU~U�
            </h2>
          </div>

          <div className="flex items-center gap-1 text-white font-bold text-xs dir-ltr">
            <div className="bg-white text-vita-600 w-7 h-7 flex items-center justify-center rounded-[4px] shadow-sm">
              05
            </div>
            <span className="mb-1">:</span>
            <div className="bg-white text-vita-600 w-7 h-7 flex items-center justify-center rounded-[4px] shadow-sm">
              18
            </div>
            <span className="mb-1">:</span>
            <div className="bg-white text-vita-600 w-7 h-7 flex items-center justify-center rounded-[4px] shadow-sm">
              10
            </div>
          </div>

          <button className="flex items-center gap-0.5 text-white text-xs font-medium hover:text-white/90 transition-colors">
            <span>U�U.U�</span>
            <ChevronLeft size={14} />
          </button>
        </div>

        <Swiper
          modules={[FreeMode]}
          freeMode
          spaceBetween={8}
          slidesPerView="auto"
          className="w-full !px-4 !pb-2"
          grabCursor
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              style={{ width: "148px", height: "auto" }}
            >
              <Link href={`/product/${product.id}`} className="block h-full">
                <div className="bg-white p-3 rounded-lg h-full flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                  <div className="aspect-square w-full mb-3 relative flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <h3 className="text-[11px] font-bold text-gray-700 leading-5 line-clamp-2 mb-2 min-h-[40px]">
                    {product.name}
                  </h3>

                  <div className="flex flex-col gap-1 mt-auto">
                    <div className="flex items-center justify-between h-5">
                      {product.discount > 0 ? (
                        <>
                          <div className="bg-vita-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                            {product.discount}U�
                          </div>
                          <span className="text-[10px] text-gray-300 line-through decoration-gray-300">
                            {(product.price * 1.1).toLocaleString("fa-IR")}
                          </span>
                        </>
                      ) : (
                        <div className="h-5" />
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-1 text-gray-800">
                      <span className="text-[15px] font-black tracking-tight">
                        {product.price.toLocaleString("fa-IR")}
                      </span>
                      <span className="text-[10px] font-medium text-gray-600">
                        O�U^U.OU+
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide style={{ width: "148px", height: "auto" }}>
            <div className="bg-white h-full rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer group border border-transparent hover:border-gray-100">
              <div className="w-12 h-12 border border-gray-100 rounded-full flex items-center justify-center text-vita-600 group-hover:bg-gray-50 transition-colors">
                <ChevronLeft size={24} />
              </div>
              <span className="text-sm font-bold text-gray-700">
                U.O'OU�O_U� U�U.U�
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
