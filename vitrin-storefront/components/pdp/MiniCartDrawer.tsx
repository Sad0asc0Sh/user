"use client"

import { ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CartItem } from "@/types/product"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface MiniCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
}

export function MiniCartDrawer({ isOpen, onClose, items }: MiniCartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-right">
            <ShoppingCart className="h-5 w-5" />
            سبد خرید ({items.length} محصول)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-text-secondary">سبد خرید شما خالی است</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 rounded-lg border border-gray-200 p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-right">
                      <h4 className="text-sm font-medium text-text-primary line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-text-secondary">
                        تعداد: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-bold text-brand-primary">
                        {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary">جمع کل:</span>
                  <span className="text-xl font-bold text-text-primary">
                    {total.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/cart">مشاهده سبد خرید</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                  >
                    ادامه خرید
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
