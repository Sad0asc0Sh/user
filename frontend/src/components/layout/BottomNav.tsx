"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, BookOpen, User } from "lucide-react";

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
            </div>
        </nav>
    );
}
