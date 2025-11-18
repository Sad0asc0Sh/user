import { ProductType } from "@/types/product"

export const mockProducts: ProductType[] = [
  {
    id: "1",
    slug: "sony-wh-1000xm5-headphone",
    title: "هدفون بی‌سیم حرفه‌ای سونی WH-1000XM5",
    description:
      "هدفون بی‌سیم سونی WH-1000XM5 با فناوری حذف نویز پیشرفته، کیفیت صدای استثنایی و طراحی راحت برای استفاده طولانی‌مدت. این هدفون با باتری 30 ساعته، بلوتوث 5.2 و پشتیبانی از کدک‌های Hi-Res Audio، بهترین انتخاب برای علاقه‌مندان به موسیقی است.",
    images: [
      "https://placehold.co/800x800/e0e7ff/1e3a8a?text=Sony+WH-1000XM5",
      "https://placehold.co/800x800/dbeafe/1e40af?text=Side+View",
      "https://placehold.co/800x800/eff6ff/1e3a8a?text=Detail+View",
      "https://placehold.co/800x800/e0f2fe/0369a1?text=Case+View",
    ],
    price: 12_000_000,
    compareAtPrice: 15_000_000,
    stock: 15,
    rating: 4.8,
    reviewCount: 28,
    brand: "sony",
    category: "headphone",
    specifications: {
      "وزن": "250 گرم",
      "بلوتوث": "نسخه 5.2",
      "رنگ": "مشکی",
      "عمر باتری": "30 ساعت",
      "نوع اتصال": "بی‌سیم / کابلی",
      "حذف نویز": "فعال (ANC)",
      "مقاومت در برابر آب": "ندارد",
      "گارانتی": "18 ماهه",
    },
    reviews: [
      {
        id: "r1",
        name: "علی احمدی",
        rating: 5,
        comment:
          "کیفیت صدای فوق‌العاده‌ای دارد. حذف نویز بسیار قدرتمند است و برای سفرهای طولانی عالی است.",
        date: "1403/08/15",
      },
      {
        id: "r2",
        name: "سارا محمدی",
        rating: 4,
        comment:
          "کیفیت ساخت خوبی دارد اما قیمت کمی بالاست. در کل راضی هستم.",
        date: "1403/08/20",
      },
      {
        id: "r3",
        name: "رضا کریمی",
        rating: 5,
        comment: "بهترین هدفونی که تا به حال استفاده کرده‌ام!",
        date: "1403/09/01",
      },
    ],
    relatedProductIds: ["3", "12"],
  },
  {
    id: "2",
    slug: "samsung-galaxy-s24-ultra",
    title: "گوشی موبایل سامسونگ Galaxy S24 Ultra",
    description:
      "گوشی پرچمدار سامسونگ با پردازنده Snapdragon 8 Gen 3، دوربین 200 مگاپیکسلی و نمایشگر 6.8 اینچی Dynamic AMOLED 2X",
    images: [
      "https://placehold.co/800x800/e0e7ff/1e3a8a?text=Galaxy+S24+Ultra",
      "https://placehold.co/800x800/dbeafe/1e40af?text=Back+View",
      "https://placehold.co/800x800/eff6ff/1e3a8a?text=Camera",
    ],
    price: 45_000_000,
    compareAtPrice: 50_000_000,
    stock: 8,
    rating: 4.9,
    reviewCount: 156,
    brand: "samsung",
    category: "mobile",
    specifications: {
      "صفحه نمایش": "6.8 اینچ Dynamic AMOLED 2X",
      "پردازنده": "Snapdragon 8 Gen 3",
      "رم": "12 GB",
      "حافظه داخلی": "256 GB",
      "دوربین اصلی": "200 مگاپیکسل",
      "باتری": "5000 میلی‌آمپر ساعت",
      "سیستم عامل": "Android 14",
    },
    reviews: [],
  },
  {
    id: "3",
    slug: "apple-airpods-pro-2",
    title: "هدفون بی‌سیم اپل AirPods Pro 2",
    description:
      "ایرپاد پرو نسل دوم با تراشه H2، حذف نویز فعال پیشرفته و صدای فضایی شخصی‌سازی شده",
    images: [
      "https://placehold.co/800x800/e0e7ff/1e3a8a?text=AirPods+Pro+2",
      "https://placehold.co/800x800/dbeafe/1e40af?text=Case",
    ],
    price: 9_000_000,
    compareAtPrice: 10_500_000,
    stock: 22,
    rating: 4.7,
    reviewCount: 89,
    brand: "apple",
    category: "headphone",
    specifications: {
      "تراشه": "H2",
      "حذف نویز": "فعال",
      "مقاومت": "IPX4",
      "عمر باتری": "6 ساعت (ایرباد) + 30 ساعت (کیس)",
    },
    reviews: [
      {
        id: "r4",
        name: "مهدی رضایی",
        rating: 5,
        comment: "صدای عالی و راحتی استفاده بی‌نظیر",
        date: "1403/09/10",
      },
    ],
  },
  {
    id: "4",
    slug: "apple-macbook-air-m2",
    title: "لپ‌تاپ اپل MacBook Air M2",
    description:
      "مک‌بوک ایر با تراشه M2، نمایشگر Liquid Retina 13.6 اینچی و طراحی نازک و سبک",
    images: [
      "https://placehold.co/800x800/e0e7ff/1e3a8a?text=MacBook+Air+M2",
    ],
    price: 55_000_000,
    stock: 5,
    rating: 4.9,
    reviewCount: 67,
    brand: "apple",
    category: "laptop",
    specifications: {
      "پردازنده": "Apple M2",
      "رم": "8 GB",
      "حافظه": "256 GB SSD",
      "صفحه نمایش": "13.6 اینچ Liquid Retina",
    },
    reviews: [],
  },
  {
    id: "12",
    slug: "jbl-tune-770nc",
    title: "هدفون بلوتوث JBL Tune 770NC",
    description:
      "هدفون بی‌سیم JBL با حذف نویز فعال و کیفیت صدای قدرتمند JBL Pure Bass",
    images: [
      "https://placehold.co/800x800/e0e7ff/1e3a8a?text=JBL+Tune+770NC",
    ],
    price: 4_500_000,
    compareAtPrice: 5_500_000,
    stock: 18,
    rating: 4.3,
    reviewCount: 42,
    brand: "jbl",
    category: "headphone",
    specifications: {
      "بلوتوث": "5.3",
      "عمر باتری": "70 ساعت",
      "حذف نویز": "فعال",
      "وزن": "220 گرم",
    },
    reviews: [],
  },
]

export const mockProduct = mockProducts[0]

export function getProductBySlug(slug: string): ProductType | undefined {
  return mockProducts.find((p) => p.slug === slug)
}

export function getRelatedProducts(
  category: string,
  excludeId: string
): ProductType[] {
  return mockProducts
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, 4)
}
