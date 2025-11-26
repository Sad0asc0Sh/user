import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import GoogleAuthProvider from "@/components/providers/GoogleAuthProvider";

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
        <GoogleAuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
