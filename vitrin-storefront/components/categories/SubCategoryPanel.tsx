
import type { MainCategory } from '@/data/mock/categories';
import Image from 'next/image';
import Link from 'next/link';

interface SubCategoryPanelProps {
  category: MainCategory;
}

export default function SubCategoryPanel({ category }: SubCategoryPanelProps) {
  if (!category) {
    return null; // Or a loading/placeholder state
  }

  return (
    <section className="w-full" aria-labelledby={`category-panel-${category.slug}`}>
      <h2 id={`category-panel-${category.slug}`} className="sr-only">
        {category.name}
      </h2>

      {/* Banner Image */}
      {category.bannerImage && (
        <div className="relative h-32 md:h-44 w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={category.bannerImage}
            alt={`بنر دسته‌بندی ${category.name}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </div>
      )}

      {/* "View All" Link */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
        <Link
          href={`/products?category=${category.slug}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          مشاهده همه محصولات {category.name} &rarr;
        </Link>
      </div>

      {/* Sub-categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.subCategories.map((sub) => (
          <Link key={sub.id} href={`/products?category=${category.slug}&subcategory=${sub.slug}`} passHref>
            <div className="group block w-full aspect-square rounded-xl bg-white shadow-sm p-2 sm:p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              <div className="flex flex-col items-center justify-center h-full p-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    loading="lazy"
                    className="object-contain"
                    sizes="100px"
                  />
                </div>
                <p className="text-sm sm:text-base font-medium text-center text-gray-700 group-hover:text-blue-600">
                  {sub.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
