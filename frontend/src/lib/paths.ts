import type { Product } from "@/services/productService";

export const buildProductUrl = (product: Product): string => {
  const path = product.categoryPath?.map((c) => c.slug).filter(Boolean).join("/") || "product";
  return `/${path}/${product.slug || product.id}`;
};
