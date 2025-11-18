"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { ProductType } from "@/types/product"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProductTabsProps {
  product: ProductType
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="mt-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description" className="flex-1 sm:flex-none">
            توضیحات
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex-1 sm:flex-none">
            مشخصات
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1 sm:flex-none">
            نقدها ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm max-w-none text-right">
            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>
        </TabsContent>

        {/* Specifications Tab - Lazy Rendered */}
        <TabsContent value="specifications" className="mt-6">
          {activeTab === "specifications" && (
            <div>
              {Object.keys(product.specifications).length === 0 ? (
                <p className="text-center text-text-secondary py-8">
                  مشخصات ثبت نشده است
                </p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                      data-testid="spec-row"
                    >
                      <span className="text-sm font-medium text-text-primary">
                        {key}
                      </span>
                      <span className="text-sm text-text-secondary">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Reviews Tab - Lazy Rendered */}
        <TabsContent value="reviews" className="mt-6">
          {activeTab === "reviews" && (
            <div>
              {product.reviews.length === 0 ? (
                <p className="text-center text-text-secondary py-8">
                  هنوز هیچ نظری ثبت نشده است
                </p>
              ) : (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text-primary">
                          {review.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              "h-4 w-4",
                              index < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
