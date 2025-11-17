import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductCard,
  ProductCardProps,
} from "@/components/products/ProductCard";

// در حال حاضر محصولات دموی صفحه حذف شده‌اند
// و این آرایه خالی است تا بعداً با داده‌های واقعی پر شود.
const placeholderProducts: ProductCardProps[] = [];

interface ProductCarouselProps {
  title: string;
}

export function ProductCarousel({ title }: ProductCarouselProps) {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            مشاهده همه محصولات
          </a>
        </div>
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            dragFree: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {placeholderProducts.map((product, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 pl-4 md:basis-1/3 md:pl-6 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:flex" />
          <CarouselNext className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

