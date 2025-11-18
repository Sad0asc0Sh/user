"use client"

import { ProductCarousel } from "@/components/products/ProductCarousel"
import { getRelatedProducts } from "@/lib/mock-data"
import { Product } from "@/components/products/ProductCard"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(category, currentProductId)

  if (relatedProducts.length === 0) {
    return null
  }

  // Transform ProductType to Product interface for ProductCard
  const products: Product[] = relatedProducts.map((p) => ({
    id: p.id,
    name: p.title,
    category: p.category,
    price: p.price,
    priceAfterDiscount: p.compareAtPrice ? p.price : undefined,
    image: p.images[0],
    rating: p.rating,
    isNew: false,
    hasDiscount: p.compareAtPrice !== undefined,
  }))

  return (
    <div className="mt-16">
      <ProductCarousel
        title="محصولات مرتبط"
        viewAllLink={`/products?category=${category}`}
        products={products}
      />
    </div>
  )
}
