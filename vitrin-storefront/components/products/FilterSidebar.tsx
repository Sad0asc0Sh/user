"use client"

import { useState, useEffect } from "react"
import { Filter } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/Input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDebounce } from "@/hooks/use-debounce"

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: {
    min: number | null
    max: number | null
  }
  inStock: boolean
}

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

// Mock data for filters
const categories = [
  { id: "mobile", label: "موبایل و تبلت" },
  { id: "laptop", label: "لپ‌تاپ و کامپیوتر" },
  { id: "watch", label: "ساعت و گجت پوشیدنی" },
  { id: "headphone", label: "هدفون و هندزفری" },
  { id: "accessories", label: "لوازم جانبی" },
]

const brands = [
  { id: "samsung", label: "سامسونگ" },
  { id: "apple", label: "اپل" },
  { id: "sony", label: "سونی" },
  { id: "lg", label: "ال‌جی" },
  { id: "logitech", label: "لاجیتک" },
]

function FilterContent({ filters, onFiltersChange }: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState<string>(
    filters.priceRange.min?.toString() || ""
  )
  const [maxPrice, setMaxPrice] = useState<string>(
    filters.priceRange.max?.toString() || ""
  )

  const debouncedMinPrice = useDebounce(minPrice, 300)
  const debouncedMaxPrice = useDebounce(maxPrice, 300)

  useEffect(() => {
    const min = debouncedMinPrice ? parseInt(debouncedMinPrice) : null
    const max = debouncedMaxPrice ? parseInt(debouncedMaxPrice) : null

    onFiltersChange({
      ...filters,
      priceRange: { min, max },
    })
  }, [debouncedMinPrice, debouncedMaxPrice])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId)

    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brandId]
      : filters.brands.filter((b) => b !== brandId)

    onFiltersChange({
      ...filters,
      brands: newBrands,
    })
  }

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked,
    })
  }

  const handleClearFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: { min: null, max: null },
      inStock: false,
    })
  }

  return (
    <div className="space-y-4" aria-label="فیلترهای محصولات">
      {/* Clear Filters Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-text-primary">فیلترها</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-xs"
        >
          پاک کردن همه
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "brands", "price", "stock"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-right text-sm font-medium">
            دسته‌بندی‌ها
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-right text-sm font-medium">
            برندها
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-right text-sm font-medium">
            محدوده قیمت
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="min-price" className="text-xs text-text-secondary">
                  حداقل قیمت (تومان)
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-xs text-text-secondary">
                  حداکثر قیمت (تومان)
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="100,000,000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* In Stock */}
        <AccordionItem value="stock">
          <AccordionTrigger className="text-right text-sm font-medium">
            موجود بودن
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="in-stock" className="text-sm font-normal">
                فقط کالاهای موجود
              </Label>
              <Switch
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={handleInStockChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-xl bg-white p-6 border border-header-border">
          <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
        </div>
      </aside>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              فیلترها
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-right">فیلترهای محصولات</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
