"use client"

import { useState } from "react"
import { QuantitySelector } from "./QuantitySelector"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

/**
 * مثال استفاده از QuantitySelector در یک کارت محصول
 * این کامپوننت نشان می‌دهد چگونه می‌توان از QuantitySelector
 * برای افزودن محصول به سبد خرید استفاده کرد
 */
export function QuantitySelectorExample() {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Simulate product data
  const product = {
    name: "گوشی موبایل سامسونگ Galaxy S24",
    price: 45_000_000,
    stock: 15,
  }

  const handleAddToCart = () => {
    // در اینجا می‌توانید API برای افزودن به سبد خرید فراخوانی کنید
    console.log(`Adding ${quantity} items to cart`)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const totalPrice = product.price * quantity

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-header-border shadow-soft">
      {/* Product Info */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            موجودی: {product.stock} عدد
          </p>
          <p className="text-xl font-bold text-brand-primary">
            {product.price.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          تعداد:
        </label>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          maxStock={product.stock}
        />
      </div>

      {/* Total Price */}
      <div className="mb-4 p-3 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">جمع کل:</span>
          <span className="text-lg font-bold text-text-primary">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full gap-2"
        disabled={addedToCart}
      >
        <ShoppingCart className="h-4 w-4" />
        {addedToCart ? "افزودن شد!" : "افزودن به سبد خرید"}
      </Button>

      {/* Usage Note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-text-secondary text-center">
          این یک مثال استفاده از کامپوننت QuantitySelector است
        </p>
      </div>
    </div>
  )
}
