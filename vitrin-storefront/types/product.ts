export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export interface Specification {
  [key: string]: string
}

export interface ProductType {
  id: string
  slug: string
  title: string
  description: string
  images: string[]
  price: number
  compareAtPrice?: number
  stock: number
  rating: number
  reviewCount: number
  specifications: Specification
  reviews: Review[]
  category: string
  brand?: string
  relatedProductIds?: string[]
}

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
  image: string
  maxStock: number
}
