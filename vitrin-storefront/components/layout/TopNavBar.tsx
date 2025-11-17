"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, Grid } from "lucide-react";

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
        <div className="bg-header-bg border-b border-header-border h-[70px]">
          <div className="container mx-auto px-4 flex justify-between items-center h-full">
            {/* Right Section: Logo */}
            <div className="flex items-center">
              <Link href="/" aria-label="بازگشت به صفحه اصلی">
                <img src={logoSrc} alt="لوگوی فروشگاه" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Center Section: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center px-8">
              <div className="w-full max-w-lg relative">
                <input
                  type="text"
                  placeholder="محصول، برند یا دسته مورد نظر خود را جستجو کنید..."
                  aria-label="جستجوی محصولات"
                  className="w-full px-4 py-2 pr-10 rounded-lg shadow-soft border border-transparent focus:border-brand-secondary focus:ring-0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-text-secondary" />
                </div>
              </div>
            </div>

            {/* Left Section: Auth & Cart (Desktop) */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm">
                ورود
              </button>
              <button className="px-4 py-2 border border-brand-secondary text-brand-primary rounded-lg text-sm">
                ثبت‌نام
              </button>
              <div className="h-6 w-px bg-header-border" />
              <div className="relative">
                <button
                  aria-label={`سبد خرید با ${initialCartCount} کالا`}
                >
                  <ShoppingCart className="h-6 w-6 text-text-primary" />
                </button>
                {initialCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-badge-bg text-badge-text text-xs">
                    {initialCartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Section: Hamburger Menu & Cart */}
            <div className="md:hidden flex items-center justify-between w-full">
              <button
                onClick={() => setIsRightMenuOpen(true)}
                aria-label="باز کردن منوی دسته‌بندی‌ها"
                aria-expanded={isRightMenuOpen}
              >
                <Grid className="h-6 w-6 text-text-primary" />
              </button>
              <div className="relative">
                <button
                  aria-label={`سبد خرید با ${initialCartCount} کالا`}
                >
                  <ShoppingCart className="h-6 w-6 text-text-primary" />
                </button>
                {initialCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-badge-bg text-badge-text text-xs">
                    {initialCartCount}
                  </span>
                )}
              </div>
              <button aria-label="باز کردن منوی اصلی">
                <Menu className="h-6 w-6 text-text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <nav className="hidden md:block bg-white border-b border-header-border h-[40px]">
          <div className="container mx-auto px-4 flex items-center h-full">
            <button
              onClick={() => setIsRightMenuOpen(true)}
              className="flex items-center space-x-2 space-x-reverse text-sm font-bold text-text-primary"
              aria-expanded={isRightMenuOpen}
            >
              <Grid className="h-5 w-5" />
              <span>دسته‌بندی کالاها</span>
            </button>
            <div className="h-4 w-px bg-header-border mx-4" />
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

