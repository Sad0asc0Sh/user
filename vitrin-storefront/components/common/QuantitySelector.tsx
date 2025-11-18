"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  value: number
  onChange: (newValue: number) => void
  maxStock: number
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  maxStock,
  className,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < maxStock) {
      onChange(value + 1)
    }
  }

  const isDecreaseDisabled = value <= 1
  const isIncreaseDisabled = value >= maxStock

  return (
    <div
      data-testid="quantity-selector"
      className={cn("flex items-center gap-2 rtl", className)}
      role="group"
      aria-label="انتخاب تعداد محصول"
    >
      {/* Increase Button (Right in RTL) */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={isIncreaseDisabled}
        aria-label="افزایش تعداد"
        data-testid="quantity-increase"
        className="h-9 w-9 rounded-lg"
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Quantity Input (Center) */}
      <Input
        type="text"
        value={value}
        readOnly
        className="h-9 w-16 text-center font-medium"
        aria-label={`تعداد: ${value}`}
        tabIndex={-1}
      />

      {/* Decrease Button (Left in RTL) */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={isDecreaseDisabled}
        aria-label="کاهش تعداد"
        data-testid="quantity-decrease"
        className="h-9 w-9 rounded-lg"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  )
}
