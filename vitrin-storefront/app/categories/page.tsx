'use client';

import { useState } from 'react';
import { mockCategories, MainCategory } from '@/lib/mock-category-data';
import MainCategoryList from '@/components/categories/MainCategoryList';
import SubCategoryDisplay from '@/components/categories/SubCategoryDisplay';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>(mockCategories[0]);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-row"> {/* Adjust 80px based on your header height */}
      {/* Column 1: Main Categories (Right side in RTL) */}
      <aside className="w-1/3 md:w-1/4 h-full overflow-y-auto bg-gray-50 border-l border-gray-200">
        <MainCategoryList
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </aside>

      {/* Column 2: Sub Categories (Left side in RTL) */}
      <main className="w-2/3 md:w-3/4 h-full overflow-y-auto">
        {/* The key prop is crucial for re-rendering the component and triggering animations on change */}
        <SubCategoryDisplay key={selectedCategory.id} category={selectedCategory} />
      </main>
    </div>
  );
}