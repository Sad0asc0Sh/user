"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 cursor-zoom-in group"
        onClick={() => setIsLightboxOpen(true)}
        data-testid="main-image"
      >
        <Image
          src={images[selectedImage]}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              setSelectedImage(index)
            }}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
              selectedImage === index
                ? "border-brand-primary ring-2 ring-brand-primary/20"
                : "border-transparent hover:border-gray-300"
            )}
            aria-selected={selectedImage === index}
            role="tab"
            data-testid="thumbnail"
            tabIndex={selectedImage === index ? 0 : -1}
          >
            <Image
              src={image}
              alt={`${title} - تصویر ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0">
          <DialogTitle className="sr-only">{title} - گالری تصاویر</DialogTitle>
          <Carousel className="w-full" opts={{ direction: "rtl", startIndex: selectedImage }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`${title} - تصویر ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  )
}
