import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TopNavBar } from "@/components/layout/TopNavBar";
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
  title: "ویترین‌شاپ - فروشگاه اینترنتی",
  description:
    "ویترین‌شاپ یک قالب فروشگاه اینترنتی مدرن بر پایه Next.js است.",
};

const mockLinks = [
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "تخفیف‌ها و پیشنهادها",
    href: "/discounts",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "پرفروش‌ترین‌ها",
    href: "/bestsellers",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "خرید اقساطی",
    href: "/installments",
  },
  {
    icon: <Circle size={12} className="text-gray-400" />,
    text: "کارت هدیه",
    href: "/gift-card",
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
            <main className="flex-1">{children}</main>
            <GlobalFooter />
          </div>
          <Toaster richColors closeButton dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}

