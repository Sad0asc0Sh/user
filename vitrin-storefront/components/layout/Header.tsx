"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Menu, Search, ShoppingCart, User, Store } from "lucide-react";

export function GlobalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          {/* Mobile header */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
              <span className="sr-only">منوی اصلی</span>
            </Button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <a href="/" className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <span className="font-bold text-slate-900">ویترین</span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="border border-slate-200 bg-white"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
              <span className="sr-only">سبد خرید</span>
            </Button>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex md:flex-1 items-center justify-between gap-8">
            {/* Right: logo */}
            <a href="/" className="flex items-center gap-2">
              <Store className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <span className="text-xl font-semibold text-slate-900">
                ویترین
              </span>
            </a>

            {/* Center: search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <Input
                  placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید"
                  className="h-12 rounded-full border-none bg-slate-50 pl-11 pr-4 text-sm shadow-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>

            {/* Left: actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="gap-2 rounded-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
                ورود / ثبت‌نام
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-slate-200 bg-white"
                >
                  <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                  <span className="sr-only">سبد خرید</span>
                </Button>
                <span className="absolute top-0 right-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </>
  );
}

