'use client';

import { useSearchParams } from 'next/navigation';
import { mockCategories } from '@/lib/mock-category-data';
import MainCategoryList from '@/components/categories/MainCategoryList';
import SubCategoryDisplay from '@/components/categories/SubCategoryDisplay';
import { useMemo } from 'react';

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get('category');

  const selectedCategory = useMemo(() => {
    return (
      mockCategories.find((cat) => cat.slug === selectedSlug) || mockCategories[0]
    );
  }, [selectedSlug]);

  return (
    <div className="flex flex-row h-[calc(100vh-140px)] overflow-hidden">
      {/* Column 1: Main Categories (Right side in RTL) */}
      <aside className="w-24 h-full overflow-y-auto bg-white border-l border-gray-100">
        <MainCategoryList
          categories={mockCategories}
          selectedCategory={selectedCategory}
        />
      </aside>

      {/* Column 2: Sub Categories (Left side in RTL) */}
      <main className="flex-1 h-full overflow-y-auto">
        <SubCategoryDisplay key={selectedCategory.id} category={selectedCategory} />
      </main>
    </div>
  );
}