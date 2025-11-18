"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Grid, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface BottomNavBarProps {
  cartCount?: number
}

export function BottomNavBar({ cartCount = 0 }: BottomNavBarProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      label: "خانه",
      href: "/",
      icon: Home,
    },
    {
      label: "دسته‌بندی",
      href: "/categories",
      icon: Grid,
    },
    {
      label: "سبد خرید",
      href: "/cart",
      icon: ShoppingCart,
      badge: cartCount,
    },
    {
      label: "پروفایل",
      href: "/dashboard",
      icon: User,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 block border-t border-header-border bg-white shadow-soft-lg md:hidden"
      role="navigation"
      aria-label="ناوبری اصلی موبایل"
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "text-brand-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-6 w-6",
                    isActive && "stroke-[2.5]"
                  )}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-badge-bg text-xs font-medium text-badge-text">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs",
                  isActive ? "font-medium" : "font-normal"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
