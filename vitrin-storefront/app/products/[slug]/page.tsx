"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/mock-data"
import { ProductGallery } from "@/components/pdp/ProductGallery"
import { ProductInfo } from "@/components/pdp/ProductInfo"
import { ProductTabs } from "@/components/pdp/ProductTabs"
import { RelatedProducts } from "@/components/pdp/RelatedProducts"
import { MiniCartDrawer } from "@/components/pdp/MiniCartDrawer"
import { CartItem } from "@/types/product"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = (quantity: number) => {
    const newItem: CartItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0],
      maxStock: product.stock,
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, newItem]
    })

    setIsCartOpen(true)
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>

      {/* Mini Cart Drawer */}
      <MiniCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            image: product.images,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: product.brand || "Unknown",
            },
            offers: {
              "@type": "Offer",
              url: `https://welfvita.com/products/${product.slug}`,
              priceCurrency: "IRR",
              price: product.price,
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />
    </main>
  )
}
