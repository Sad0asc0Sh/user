import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, LifeBuoy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "موبایل و تبلت",
    href: "#",
    image: "https://placehold.co/300x300/EC4899/FFF?text=Mobile",
  },
  {
    name: "لپ‌تاپ و کامپیوتر",
    href: "#",
    image: "https://placehold.co/300x300/3B82F6/FFF?text=Laptop",
  },
  {
    name: "ساعت و گجت هوشمند",
    href: "#",
    image: "https://placehold.co/300x300/F97316/FFF?text=Watch",
  },
  {
    name: "خانه و آشپزخانه",
    href: "#",
    image: "https://placehold.co/300x300/16A34A/FFF?text=Home",
  },
  {
    name: "لوازم جانبی دیجیتال",
    href: "#",
    image: "https://placehold.co/300x300/8B5CF6/FFF?text=Accessories",
  },
  {
    name: "گیمینگ و کنسول",
    href: "#",
    image: "https://placehold.co/300x300/EF4444/FFF?text=Gaming",
  },
];

const valuePropositions = [
  {
    icon: <Truck className="h-10 w-10 text-primary" strokeWidth={1.5} />,
    title: "ارسال سریع و رایگان",
    description:
      "سفارش‌های شما در کوتاه‌ترین زمان ممکن و با بسته‌بندی امن به سراسر کشور ارسال می‌شود.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={1.5} />,
    title: "ضمانت اصالت و سلامت کالا",
    description:
      "تمامی محصولات با تضمین اصالت و مهلت تست، همراه با پشتیبانی تیم ویترین‌شاپ ارائه می‌شوند.",
  },
  {
    icon: <LifeBuoy className="h-10 w-10 text-primary" strokeWidth={1.5} />,
    title: "پشتیبانی ۲۴ ساعته",
    description:
      "در هر ساعت از شبانه‌روز می‌توانید با پشتیبانی تماس بگیرید و راهنمایی دریافت کنید.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Category Highlights Section */}
      <section className="w-full bg-slate-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            دسته‌بندی‌های محبوب فروشگاه
          </h2>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link
                href={category.href}
                key={category.name}
                className="group flex flex-col items-center text-center"
              >
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b shadow-[0_14px_40px_rgba(15,23,42,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
                  style={{
                    backgroundImage: [
                      "linear-gradient(to bottom, #e0f2fe, #dbeafe)",
                      "linear-gradient(to bottom, #fee2e2, #fecdd3)",
                      "linear-gradient(to bottom, #ede9fe, #dbeafe)",
                      "linear-gradient(to bottom, #dcfce7, #bbf7d0)",
                      "linear-gradient(to bottom, #fef3c7, #fee2e2)",
                      "linear-gradient(to bottom, #fce7f3, #e0f2fe)",
                    ][index % 6],
                  }}
                >
                  <div className="absolute inset-[6px] rounded-full bg-white/85" />
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={120}
                      height={120}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-sm font-medium text-slate-800 group-hover:text-primary">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ProductCarousel title="محصولات ویژه ویترین‌شاپ" />

      {/* Flash Sale Section */}
      <section className="w-full bg-gradient-to-r from-rose-50 via-pink-50 to-indigo-50 py-10 md:py-14">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            فروش ویژه امروز
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-700">
            برخی از محصولات منتخب ویترین‌شاپ را با قیمت‌های شگفت‌انگیز و برای
            مدت محدود تهیه کنید.
          </p>
          {/* Placeholder for countdown timer */}
          <div className="mt-5 rounded-full bg-white/70 px-6 py-3 text-2xl font-bold text-rose-500 shadow-sm">
            زمان باقی‌مانده تا پایان فروش: ۱۲:۳۲:۱۰
          </div>
          <Button className="mt-7 rounded-full px-10" size="lg">
            مشاهده همه پیشنهادها
          </Button>
        </div>
      </section>

      {/* Another Product Carousel */}
      <ProductCarousel title="جدیدترین محصولات فروشگاه" />

      {/* Value Propositions Section */}
      <section className="w-full border-t border-slate-100 bg-slate-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 md:gap-8">
            {valuePropositions.map((prop) => (
              <div
                key={prop.title}
                className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-6 py-8 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                  {prop.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

