'use client';

import { MainCategory } from '@/lib/mock-category-data';
import { cn } from '@/lib/utils';
import { Smartphone, Shirt, Heart, Home, Book, HelpCircle } from 'lucide-react';
import React from 'react';

// Map category slugs to Lucide icons
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  digital: Smartphone,
  fashion: Shirt,
  'health-beauty': Heart,
  'home-kitchen': Home,
  'books-art': Book,
};

interface MainCategoryListProps {
  categories: MainCategory[];
  selectedCategory: MainCategory;
  onSelect: (category: MainCategory) => void;
}

export default function MainCategoryList({
  categories,
  selectedCategory,
  onSelect,
}: MainCategoryListProps) {
  return (
    <nav className="p-2" aria-label="Main categories">
      <div className="grid grid-cols-1 gap-3">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategory.id;
          const IconComponent = iconMap[category.slug] || HelpCircle;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category)}
              className={cn(
                'w-full aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-colors duration-200',
                isSelected
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary'
                  : 'bg-white hover:bg-gray-100 text-gray-700'
              )}
              aria-selected={isSelected}
            >
              <IconComponent className="w-14 h-14 mb-2" />
              <span className="text-sm font-medium text-center">{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}