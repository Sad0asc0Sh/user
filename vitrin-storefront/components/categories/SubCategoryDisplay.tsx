import { MainCategory } from '@/lib/mock-category-data';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SubCategoryDisplayProps {
  category: MainCategory;
  className?: string;
}

export default function SubCategoryDisplay({ category, className }: SubCategoryDisplayProps) {
  return (
    <div className={cn("p-3 md:p-6 animate-fade-in", className)}>
      {/* Banner */}
      <div className="w-full mb-6">
        <Link href={`/products?category=${category.slug}`} className="block group">
          <div className="relative w-full h-24 md:h-32 rounded-lg overflow-hidden">
            <Image
              src={category.bannerImage}
              alt={`Banner for ${category.name}`}
              fill
              sizes="(max-width: 768px) 66vw, 75vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* View All Link for the main category */}
      <div className="mb-6">
        <Link
            href={`/products?category=${category.slug}`}
            className="text-sm font-semibold text-brand-primary hover:underline"
        >
            همه محصولات {category.name}
        </Link>
      </div>

      {/* Sub-categories Sections */}
      <div className="space-y-6">
        {category.subCategories.map((subCategory) => (
          <div key={subCategory.slug}>
            {/* SubCategory Header */}
            <Link
              href={`/products?category=${category.slug}&subcategory=${subCategory.slug}`}
              className="text-gray-800 font-bold text-base mb-3 block border-r-2 border-brand-primary pr-2"
            >
              {subCategory.name}
            </Link>

            {/* LeafCategory List */}
            <ul className="space-y-3 pr-2">
              {subCategory.children.map((leaf) => (
                <li key={leaf.slug}>
                  <Link
                    href={`/products?category=${category.slug}&subcategory=${subCategory.slug}&type=${leaf.slug}`}
                    className="text-sm text-gray-600 hover:text-brand-primary transition-colors"
                  >
                    {leaf.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}