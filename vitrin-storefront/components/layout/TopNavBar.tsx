"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Grid } from "lucide-react";

import { RightMegaMenu } from "./RightMegaMenu";

type TopNavBarProps = {
  logoSrc: string;
  initialCartCount: number;
  linksData: Array<{ icon: React.ReactNode; text: string; href: string }>;
};

export const TopNavBar: React.FC<TopNavBarProps> = ({
  logoSrc,
  initialCartCount,
  linksData,
}) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 shadow-soft">
        {/* First Row */}
        <div className="h-[70px] border-b border-header-border bg-header-bg">
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            {/* Right Section: Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="بازگشت به صفحه اصلی فروشگاه"
              >
                <img
                  src={logoSrc}
                  alt="ویترین استور"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Center Section: Search Bar (Desktop) */}
            <div className="hidden flex-1 justify-center px-8 md:flex">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="جستجو در بین هزاران کالا، برند یا دسته‌بندی..."
                  aria-label="جستجوی محصولات"
                  className="w-full rounded-lg border border-transparent px-4 py-2 pr-10 shadow-soft focus:border-brand-secondary focus:ring-0"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-text-secondary" />
                </div>
              </div>
            </div>

            {/* Left Section: Auth & Cart (Desktop) */}
            <div className="hidden items-center space-x-4 space-x-reverse md:flex">
              <button className="rounded-lg bg-brand-primary px-4 py-2 text-sm text-white">
                ورود
              </button>
              <button className="rounded-lg border border-brand-secondary px-4 py-2 text-sm text-brand-primary">
                ثبت‌نام
              </button>
              <div className="h-6 w-px bg-header-border" />
              <div className="relative">
                <button
                  aria-label={`مشاهده سبد خرید، شامل ${initialCartCount} کالا`}
                >
                  <ShoppingCart className="h-6 w-6 text-text-primary" />
                </button>
                {initialCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-badge-bg text-xs text-badge-text">
                    {initialCartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Section: Search Only */}
            <div className="flex items-center md:hidden">
              <button
                aria-label="جستجو"
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              >
                <Search className="h-6 w-6 text-text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Row - Desktop Only */}
        <nav className="hidden h-[40px] border-b border-header-border bg-white md:flex">
          <div className="container mx-auto flex h-full items-center px-4">
            <button
              onClick={() => setIsRightMenuOpen(true)}
              className="flex items-center space-x-2 space-x-reverse text-sm font-bold text-text-primary"
              aria-expanded={isRightMenuOpen}
            >
              <Grid className="h-5 w-5" />
              <span>همه دسته‌بندی‌های کالا</span>
            </button>
            <div className="mx-4 h-4 w-px bg-header-border" />
            <ul className="flex space-x-6 space-x-reverse">
              {linksData.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center text-sm text-text-secondary hover:text-brand-primary"
                  >
                    <span className="ml-2">{link.icon}</span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <RightMegaMenu
        open={isRightMenuOpen}
        onClose={() => setIsRightMenuOpen(false)}
      />
    </>
  );
};

