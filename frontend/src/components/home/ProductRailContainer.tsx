"use client";

import { useEffect, useState } from "react";
import ProductRail from "./ProductRail";
import { Product, productService } from "@/services/productService";

interface ProductRailContainerProps {
  title: string;
  fetchType: "newest" | "bestSellers" | "discounted" | "all";
  limit?: number;
}

export default function ProductRailContainer({
  title,
  fetchType,
  limit = 10,
}: ProductRailContainerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Product[];
        switch (fetchType) {
          case "newest":
            data = await productService.getNewest(limit);
            break;
          case "bestSellers":
            data = await productService.getBestSellers(limit);
            break;
          case "discounted":
            data = await productService.getDiscounted(limit);
            break;
          case "all":
          default:
            data = await productService.getAll();
            break;
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("خطا در بارگذاری محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [fetchType, limit]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="px-4 mb-4">
          <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="px-4 flex gap-3 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[148px] h-[240px] bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="px-4 mb-4">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="px-4 mb-4">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">محصولی یافت نشد</p>
        </div>
      </div>
    );
  }

  // Render ProductRail with fetched data
  return <ProductRail title={title} products={products} />;
}
