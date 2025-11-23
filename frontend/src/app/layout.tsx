import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import ServicesWidget from "@/components/features/services/ServicesWidget";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی | تجربه خرید مدرن", // Persian Title
  description: "بهترین محصولات با بهترین قیمت",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`font-sans antialiased bg-gray-50 text-gray-900 ${vazirmatn.className}`}>
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow pb-32">{children}</div>
          <ServicesWidget />
          <Footer />
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
