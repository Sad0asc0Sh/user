import Link from "next/link";
import { Send, Instagram, Video } from "lucide-react"; // Using Video as generic for Aparat

export default function Footer() {
    return (
        <footer className="bg-welf-50 pt-10 pb-24 border-t border-welf-200">
            <div className="mobile-container grid gap-8">

                {/* Quick Access */}
                <div className="space-y-4">
                    <h3 className="font-bold text-welf-900">دسترسی سریع</h3>
                    <ul className="space-y-2 text-sm text-welf-500">
                        <li><Link href="/products">محصولات</Link></li>
                        <li><Link href="/smart-assembly">اسمبل هوشمند</Link></li>
                        <li><Link href="/about">درباره ما</Link></li>
                        <li><Link href="/contact">تماس با ما</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="space-y-4">
                    <h3 className="font-bold text-welf-900">خدمات مشتریان</h3>
                    <ul className="space-y-2 text-sm text-welf-500">
                        <li><Link href="/tracking">پیگیری سفارش</Link></li>
                        <li><Link href="/terms">قوانین و مقررات</Link></li>
                        <li><Link href="/faq">سوالات متداول</Link></li>
                        <li><Link href="/returns">رویه بازگرداندن کالا</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-4">
                    <h3 className="font-bold text-welf-900">خبرنامه</h3>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="ایمیل خود را وارد کنید"
                            className="flex-1 rounded-lg border border-welf-200 px-4 py-2 text-sm focus:border-vita-500 focus:outline-none"
                        />
                        <button className="rounded-lg bg-vita-500 px-4 py-2 text-white hover:bg-vita-600">
                            عضویت
                        </button>
                    </div>
                </div>

                {/* Socials & Trust Badge */}
                <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <a href="#" className="rounded-full bg-white p-2 text-welf-500 shadow-sm transition-transform hover:scale-110 hover:text-vita-500">
                            <Send size={20} />
                        </a>
                        <a href="#" className="rounded-full bg-white p-2 text-welf-500 shadow-sm transition-transform hover:scale-110 hover:text-vita-500">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="rounded-full bg-white p-2 text-welf-500 shadow-sm transition-transform hover:scale-110 hover:text-vita-500">
                            <Video size={20} />
                        </a>
                    </div>

                    {/* Trust Badge Placeholder */}
                    <div className="h-24 w-24 rounded-lg bg-white border border-welf-200 flex items-center justify-center text-xs text-welf-400">
                        نماد اعتماد
                    </div>
                </div>

                <div className="text-center text-xs text-welf-400 mt-4">
                    © ۱۴۰۳ تمامی حقوق محفوظ است.
                </div>
            </div>
        </footer>
    );
}
