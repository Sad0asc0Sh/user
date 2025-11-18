"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ProductCard, Product } from "@/components/products/ProductCard"
import { FilterSidebar, FilterState } from "@/components/products/FilterSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock products data - در محیط واقعی از API دریافت می‌شود
const allProducts: Product[] = [
  {
    id: "1",
    name: "گوشی موبایل سامسونگ Galaxy S24 Ultra",
    category: "mobile",
    price: 45_000_000,
    priceAfterDiscount: 39_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Galaxy+S24",
    rating: 4.8,
    isNew: true,
    hasDiscount: true,
  },
  {
    id: "2",
    name: "گوشی موبایل اپل iPhone 15 Pro Max",
    category: "mobile",
    price: 58_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=iPhone+15",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "3",
    name: "هدفون بلوتوث سونی WH-1000XM5",
    category: "headphone",
    price: 12_000_000,
    priceAfterDiscount: 9_500_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Sony+WH",
    rating: 4.7,
    hasDiscount: true,
  },
  {
    id: "4",
    name: "ساعت هوشمند Apple Watch Series 9",
    category: "watch",
    price: 18_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Apple+Watch",
    rating: 4.6,
  },
  {
    id: "5",
    name: "تبلت سامسونگ Galaxy Tab S9",
    category: "mobile",
    price: 22_000_000,
    priceAfterDiscount: 19_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Tab+S9",
    rating: 4.5,
    hasDiscount: true,
  },
  {
    id: "6",
    name: "لپ‌تاپ اپل MacBook Air M2",
    category: "laptop",
    price: 55_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MacBook+Air",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "7",
    name: "کیبورد بی‌سیم لاجیتک MX Keys",
    category: "accessories",
    price: 4_500_000,
    priceAfterDiscount: 3_800_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MX+Keys",
    rating: 4.4,
    hasDiscount: true,
  },
  {
    id: "8",
    name: "ماوس بی‌سیم لاجیتک MX Master 3S",
    category: "accessories",
    price: 3_200_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=MX+Master",
    rating: 4.8,
  },
  {
    id: "9",
    name: "گوشی موبایل سامسونگ Galaxy A54",
    category: "mobile",
    price: 15_000_000,
    priceAfterDiscount: 13_500_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Galaxy+A54",
    rating: 4.3,
    hasDiscount: true,
  },
  {
    id: "10",
    name: "لپ‌تاپ ایسوس TUF Gaming",
    category: "laptop",
    price: 35_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=ASUS+TUF",
    rating: 4.5,
  },
  {
    id: "11",
    name: "ساعت هوشمند سامسونگ Galaxy Watch 6",
    category: "watch",
    price: 12_000_000,
    priceAfterDiscount: 10_500_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=Galaxy+Watch",
    rating: 4.4,
    hasDiscount: true,
  },
  {
    id: "12",
    name: "هدفون بلوتوث اپل AirPods Pro",
    category: "headphone",
    price: 9_000_000,
    image: "https://placehold.co/400x400/e0e7ff/1e3a8a?text=AirPods+Pro",
    rating: 4.7,
    isNew: true,
  },
]

const ITEMS_PER_PAGE = 8

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: { min: null, max: null },
    inStock: false,
  })
  const [sort, setSort] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts]

    // Filter by categories
    if (filters.categories.length > 0) {
      products = products.filter((p) =>
        filters.categories.includes(p.category || "")
      )
    }

    // Filter by price range
    if (filters.priceRange.min !== null) {
      products = products.filter(
        (p) => (p.priceAfterDiscount || p.price) >= filters.priceRange.min!
      )
    }
    if (filters.priceRange.max !== null) {
      products = products.filter(
        (p) => (p.priceAfterDiscount || p.price) <= filters.priceRange.max!
      )
    }

    // Sort products
    switch (sort) {
      case "newest":
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "price_asc":
        products.sort(
          (a, b) =>
            (a.priceAfterDiscount || a.price) -
            (b.priceAfterDiscount || b.price)
        )
        break
      case "price_desc":
        products.sort(
          (a, b) =>
            (b.priceAfterDiscount || b.price) -
            (a.priceAfterDiscount || a.price)
        )
        break
      case "rating":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
    }

    return products
  }, [filters, sort])

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterState) => {
    setIsLoading(true)
    setFilters(newFilters)
    setCurrentPage(1)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setIsLoading(true)
    setSort(value)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)
    // Simulate loading and scroll to top
    setTimeout(() => {
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }

  return (
    <main className="min-h-screen bg-slate-50 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">خانه</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>محصولات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Sort and Mobile Filter */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-header-border">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                  <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
                </div>
                <p className="text-sm text-text-secondary">
                  {filteredProducts.length} محصول یافت شد
                </p>
              </div>

              {/* Sort Select */}
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                  <SelectItem value="price_asc">ارزان‌ترین</SelectItem>
                  <SelectItem value="price_desc">گران‌ترین</SelectItem>
                  <SelectItem value="rating">بیشترین امتیاز</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading
                ? // Loading skeleton
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <ProductCard key={index} product={{} as Product} isLoading />
                  ))
                : // Actual products
                  paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {/* Empty State */}
            {!isLoading && paginatedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-text-secondary">
                  محصولی با فیلترهای انتخابی یافت نشد
                </p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && paginatedProducts.length > 0 && totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) handlePageChange(currentPage - 1)
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(page)
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1)
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
