# BottomNavBar Component

کامپوننت نوار ناوبری پایین برای موبایل

## مسیر
```
components/layout/BottomNavBar.tsx
```

## استفاده

### در Layout
```tsx
import { BottomNavBar } from "@/components/layout/BottomNavBar"

<BottomNavBar cartCount={3} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cartCount` | `number` | `0` | تعداد محصولات در سبد خرید |

## ویژگی‌ها

### ✅ واکنش‌گرایی
- فقط در موبایل نمایش داده می‌شود (`block md:hidden`)
- در دسکتاپ کاملاً پنهان است

### ✅ موقعیت‌یابی
- `fixed bottom-0` - چسبیده به پایین صفحه
- `z-50` - بالاتر از سایر عناصر
- `shadow-soft-lg` - سایه ملایم در بالا

### ✅ آیتم‌های ناوبری

1. **خانه** (`/`)
   - آیکون: `Home`
   - همیشه در دسترس

2. **دسته‌بندی** (`/products`)
   - آیکون: `Grid`
   - لیست محصولات

3. **سبد خرید** (`/cart`)
   - آیکون: `ShoppingCart`
   - با Badge نمایش تعداد محصولات
   - Badge بالای 9: نمایش "9+"

4. **پروفایل** (`/dashboard`)
   - آیکون: `User`
   - دسترسی به پروفایل کاربری

### ✅ حالت فعال (Active State)
- تشخیص خودکار صفحه فعال با `usePathname`
- رنگ آیکون و متن فعال: `brand-primary` (آبی)
- ضخامت بیشتر آیکون فعال: `stroke-[2.5]`
- فونت متن فعال: `font-medium`

### ✅ دسترس‌پذیری (A11y)
- `role="navigation"`
- `aria-label="ناوبری اصلی موبایل"`
- `aria-current="page"` برای صفحه فعال

## طراحی

### چیدمان
```
┌─────────┬─────────┬─────────┬─────────┐
│  خانه   │ دسته‌بندی │ سبد خرید │ پروفایل │
│   🏠    │   📁    │   🛒    │   👤    │
└─────────┴─────────┴─────────┴─────────┘
```

### استایل
- ارتفاع: `h-16` (64px)
- Grid: `grid-cols-4` (4 ستون مساوی)
- فاصله آیکون و متن: `gap-1`

## یکپارچه‌سازی

### در Layout.tsx
```tsx
// Add padding-bottom to main to prevent content overlap
<main className="flex-1 pb-20 md:pb-0">{children}</main>

// Add BottomNavBar before closing ThemeProvider
<BottomNavBar cartCount={cartCount} />
```

## نکات مهم

1. **همپوشانی محتوا**:
   - `pb-20` به `main` اضافه شده برای جلوگیری از همپوشانی
   - فقط در موبایل اعمال می‌شود (`md:pb-0`)

2. **Badge سبد خرید**:
   - اگر `cartCount > 0`: نمایش badge
   - اگر `cartCount > 9`: نمایش "9+"
   - موقعیت: بالا-راست آیکون

3. **State Management**:
   - از `usePathname` برای تشخیص صفحه فعال
   - هر آیتم می‌تواند `isActive` باشد

## مثال با State واقعی

```tsx
"use client"

import { useState } from "react"
import { BottomNavBar } from "@/components/layout/BottomNavBar"

export default function Layout({ children }) {
  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomNavBar cartCount={cartCount} />
    </>
  )
}
```

## Troubleshooting

### نوار پایین نمایش داده نمی‌شود
- بررسی کنید که `md:hidden` صحیح است
- viewport width را بررسی کنید (باید < 768px باشد)

### محتوا با نوار همپوشانی دارد
- اطمینان حاصل کنید `pb-20` به `main` اضافه شده

### Badge نمایش داده نمی‌شود
- بررسی کنید `cartCount > 0` باشد
- مقدار `cartCount` را check کنید
