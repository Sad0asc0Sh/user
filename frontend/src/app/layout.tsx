import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

// Load IRANSans (Ensure font files exist in public/fonts)
// const iranSans = localFont({
//   src: [
//     { path: "../../public/fonts/IRANSansWeb_Light.woff2", weight: "300" },
//     { path: "../../public/fonts/IRANSansWeb.woff2", weight: "400" },
//     { path: "../../public/fonts/IRANSansWeb_Bold.woff2", weight: "700" },
//   ],
//   variable: "--font-iransans",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی | تجربه خرید مدرن", // Persian Title
  description: "بهترین محصولات با بهترین قیمت",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <html lang="fa" dir="rtl" className={iranSans.variable}>
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow pb-24">{children}</div>
          <Footer />
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
