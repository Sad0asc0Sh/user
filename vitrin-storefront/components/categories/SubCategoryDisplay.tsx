import { MainCategory } from '@/lib/mock-category-data';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface SubCategoryDisplayProps {
  category: MainCategory;
  className?: string;
}

export default function SubCategoryDisplay({ category, className }: SubCategoryDisplayProps) {
  return (
    <div className={cn('animate-fade-in p-4 md:p-6', className)}>
      {/* Banner Section */}
      <div className="relative mb-8 group">
        <Link href={`/products?category=${category.slug}`}>
          <div className="relative w-full aspect-[3/1] md:h-48 h-40 overflow-hidden rounded-2xl shadow-sm">
            <Image
              src={category.bannerImage}
              alt={`Banner for ${category.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Sub-categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.subCategories.map((subCategory) => (
          <div
            key={subCategory.slug}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            {/* Card Header */}
            <div className="flex items-center gap-4 p-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border bg-white flex-shrink-0">
                <Image
                  src={subCategory.image || '/images/mock/placeholder.png'}
                  alt={subCategory.name}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {subCategory.name}
              </h3>
            </div>

            {/* Children List */}
            {subCategory.children && subCategory.children.length > 0 && (
              <div className="pt-0 p-4 flex-grow">
                <div className="border-t border-gray-100 pt-4">
                  <ul className="space-y-3">
                    {subCategory.children.slice(0, 5).map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/products?category=${category.slug}&subcategory=${subCategory.slug}&type=${child.slug}`}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-brand-primary transition-colors group"
                        >
                          <span>{child.name}</span>
                          <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-brand-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Footer Link */}
            <div className="p-4 mt-auto">
              <Link
                href={`/products?category=${category.slug}&subcategory=${subCategory.slug}`}
                className="text-sm font-medium text-brand-primary hover:text-brand-primary/80 flex items-center gap-2"
              >
                <span>مشاهده همه</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}