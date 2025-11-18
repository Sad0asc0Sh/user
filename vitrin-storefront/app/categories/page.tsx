"use client";

import { useState } from "react";
import { MainCategoryList } from "@/components/categories/MainCategoryList";
import { SubCategoryDisplay } from "@/components/categories/SubCategoryDisplay";

export type SubCategory = {
  name: string;
  slug: string;
  image: string;
};

export type MainCategory = {
  id: string;
  name: string;
  slug: string;
  bannerImage: string;
  subCategories: SubCategory[];
};

const mockCategories: MainCategory[] = [
  {
    id: "1",
    name: "کالای دیجیتال",
    slug: "digital",
    bannerImage: "/images/mock/banner-digital.jpg",
    subCategories: [
      { name: "موبایل", slug: "mobile", image: "/images/mock/cat-mobile.jpg" },
      {
        name: "لپ‌تاپ",
        slug: "laptop",
        image: "/images/mock/cat-laptop.jpg",
      },
      {
        name: "ساعت هوشمند",
        slug: "smartwatch",
        image: "/images/mock/cat-watch.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "مد و پوشاک",
    slug: "fashion",
    bannerImage: "/images/mock/banner-fashion.jpg",
    subCategories: [
      {
        name: "مردانه",
        slug: "men",
        image: "/images/mock/cat-men.jpg",
      },
      {
        name: "زنانه",
        slug: "women",
        image: "/images/mock/cat-women.jpg",
      },
      {
        name: "بچگانه",
        slug: "kids",
        image: "/images/mock/cat-kids.jpg",
      },
    ],
  },
  {
    id: "3",
    name: "خانه و آشپزخانه",
    slug: "home-kitchen",
    bannerImage: "/images/mock/banner-home.jpg",
    subCategories: [
      {
        name: "لوازم برقی",
        slug: "home-appliances",
        image: "/images/mock/cat-appliances.jpg",
      },
      {
        name: "دکوراسیون",
        slug: "decoration",
        image: "/images/mock/cat-decoration.jpg",
      },
      {
        name: "ابزار و ملزومات",
        slug: "tools",
        image: "/images/mock/cat-tools.jpg",
      },
    ],
  },
  {
    id: "4",
    name: "زیبایی و سلامت",
    slug: "beauty-health",
    bannerImage: "/images/mock/banner-beauty.jpg",
    subCategories: [
      {
        name: "آرایشی",
        slug: "beauty",
        image: "/images/mock/cat-beauty.jpg",
      },
      {
        name: "بهداشت فردی",
        slug: "personal-care",
        image: "/images/mock/cat-care.jpg",
      },
      {
        name: "عطر و ادکلن",
        slug: "perfume",
        image: "/images/mock/cat-perfume.jpg",
      },
    ],
  },
  {
    id: "5",
    name: "ورزش و سفر",
    slug: "sport-travel",
    bannerImage: "/images/mock/banner-sport.jpg",
    subCategories: [
      {
        name: "لوازم ورزشی",
        slug: "sport-equipments",
        image: "/images/mock/cat-sport.jpg",
      },
      {
        name: "پوشاک ورزشی",
        slug: "sport-wear",
        image: "/images/mock/cat-sport-wear.jpg",
      },
      {
        name: "کیف و کوله",
        slug: "bags",
        image: "/images/mock/cat-bag.jpg",
      },
    ],
  },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>(
    mockCategories[0]
  );

  return (
    <div className="w-full bg-slate-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile: only main categories list */}
        <section className="md:hidden">
          <h1 className="mb-4 text-lg font-bold text-text-primary">
            دسته‌بندی‌ها
          </h1>
          <MainCategoryList
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Desktop: two-column layout */}
        <section className="hidden md:grid md:grid-cols-4 md:gap-4">
          <div className="md:col-span-1">
            <MainCategoryList
              categories={mockCategories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="md:col-span-3">
            <SubCategoryDisplay category={selectedCategory} />
          </div>
        </section>
      </div>
    </div>
  );
}

