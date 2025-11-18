import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { GlobalFooter } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import "../styles/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "ویترین استور - فروشگاه اینترنتی مدرن",
  description:
    "ویترین استور یک فروشگاه اینترنتی مدرن است که با استفاده از Next.js تجربه‌ای سریع، امن و فارسی‌سازی شده برای خرید آنلاین فراهم می‌کند.",
};

const mockLinks = [
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "تخفیف‌ها و پیشنهادهای ویژه",
    href: "/discounts",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "پرفروش‌ترین محصولات",
    href: "/bestsellers",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "تماس با ما",
    href: "/contact",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "مجله و مقالات",
    href: "/blog",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          vazirmatn.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <TopNavBar
              logoSrc="/placeholder-logo.svg"
              initialCartCount={3}
              linksData={mockLinks}
            />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <GlobalFooter />
          </div>
          <BottomNavBar cartCount={3} />
          <Toaster richColors closeButton dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}

