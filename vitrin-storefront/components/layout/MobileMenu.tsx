"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>منوی سایت</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <Input
              placeholder="جستجوی محصول..."
              className="h-10 pl-9 pr-3"
            />
          </div>
          <a href="/discounts" className="text-lg font-medium">
            تخفیف‌ها و پیشنهادها
          </a>
          <a href="/bestsellers" className="text-lg font-medium">
            پرفروش‌ترین محصولات
          </a>
          <a href="/installments" className="text-lg font-medium">
            ارتباط با ما
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

