'use client';

import { MainCategory } from '@/lib/mock-category-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MainCategoryListProps {
  categories: MainCategory[];
  selectedCategory: MainCategory;
}

export default function MainCategoryList({
  categories,
  selectedCategory,
}: MainCategoryListProps) {
  return (
    <nav className="p-2" aria-label="Main categories">
      <ul className="space-y-2">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategory.id;
          const IconComponent = category.icon || HelpCircle;
          return (
            <li key={category.id} className="relative">
              <Link
                href={`/categories?category=${category.slug}`}
                scroll={false}
                className={cn(
                  'w-full h-20 p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors duration-200',
                  isSelected
                    ? 'text-brand-primary font-bold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                )}
                aria-current={isSelected ? 'page' : undefined}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-[8px] font-bold text-center whitespace-normal">
                  {category.name}
                </span>
              </Link>
              {isSelected && (
                <motion.div
                  layoutId="active-category-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-primary rounded-l-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}