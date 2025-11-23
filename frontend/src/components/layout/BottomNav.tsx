"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, BookOpen, User, Wrench } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "خانه", icon: Home },
        { href: "/categories", label: "دسته‌بندی", icon: LayoutGrid },
        { href: "/cart", label: "سبد خرید", icon: ShoppingCart },
        { href: "/blog", label: "بلاگ", icon: BookOpen },
        { href: "/profile", label: "حساب کاربری", icon: User },
    ];

    const isActive = (path: string) => pathname === path ? "text-vita-600" : "text-welf-500";

    return (
        <nav className="fixed bottom-0 w-full bg-white border-t border-welf-200 pb-safe-area z-50">
            <div className="flex justify-between items-center px-4 h-16">
                {/* Standard Navigation Items */}
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 ${isActive(item.href)}`}>
                        <item.icon size={20} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}

                {/* The Service Sheet Trigger (Wrench) */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="flex flex-col items-center gap-1 text-welf-500 hover:text-vita-500 transition-colors">
                            <Wrench size={20} />
                            <span className="text-[10px] font-medium">خدمات</span>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-xl h-[50vh]">
                        <SheetHeader>
                            <SheetTitle className="text-center font-bold font-sans">خدمات وب‌سایت</SheetTitle>
                        </SheetHeader>
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {/* Place service shortcuts here */}
                            <div className="p-4 bg-gray-50 rounded-lg text-center text-xs flex items-center justify-center h-20">پیگیری سفارش</div>
                            <div className="p-4 bg-gray-50 rounded-lg text-center text-xs flex items-center justify-center h-20">اسمبل هوشمند</div>
                            <div className="p-4 bg-gray-50 rounded-lg text-center text-xs flex items-center justify-center h-20">پشتیبانی</div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
