"use client"

import { useState } from "react"
import { Heart, Share2, Star } from "lucide-react"
import { ProductType } from "@/types/product"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface ProductInfoProps {
  product: ProductType
  onAddToCart: (quantity: number) => void
}

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = () => {
    onAddToCart(quantity)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">محصولات</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
          {product.title}
        </h1>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1" aria-label={`امتیاز: ${product.rating} از 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-5 w-5",
                index < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
          <span className="mr-2 text-sm text-text-secondary">
            ({product.reviewCount} نظر)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-text-primary">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
          {product.compareAtPrice && (
            <Badge variant="destructive" className="bg-badge-bg">
              {discountPercentage}% تخفیف
            </Badge>
          )}
        </div>
        {product.compareAtPrice && (
          <p className="text-lg text-text-secondary line-through">
            {product.compareAtPrice.toLocaleString("fa-IR")} تومان
          </p>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {product.stock > 0 ? (
          <p className="text-sm text-green-600">
            {product.stock > 10 ? "موجود در انبار" : `تنها ${product.stock} عدد در انبار`}
          </p>
        ) : (
          <p className="text-sm text-red-600">ناموجود</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          تعداد:
        </label>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          maxStock={product.stock}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1"
          size="lg"
          data-testid="add-to-cart"
        >
          افزودن به سبد خرید
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(isWishlisted && "text-red-500")}
        >
          <Heart
            className={cn("h-5 w-5", isWishlisted && "fill-current")}
          />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="rounded-lg bg-slate-50 p-4 text-sm text-text-secondary space-y-2">
        <p>✓ ارسال رایگان برای سفارش‌های بالای 500 هزار تومان</p>
        <p>✓ گارانتی اصالت و سلامت فیزیکی کالا</p>
        <p>✓ 7 روز ضمانت بازگشت کالا</p>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
