"use client";
import { CheckCircle2 } from "lucide-react";

export default function ValueProposition() {
    const benefits = [
        "تجربه و قدمت از سال ۱۳۹۶",
        "اصالت و گارانتی معتبر شرکتی",
        "قیمت رقابتی و حذف واسطه",
        "دپارتمان تخصصی تعمیرات سخت افزار",
        "دسترسی اسان (۳ شعبه فعال در مشهد)",
    ];

    return (
        <div className="py-8 px-4 bg-welf-900 text-white">
            <div className="mb-6 text-center">
                <h3 className="text-xl font-bold mb-2">چرا ویلف‌ویتا را انتخاب کنید؟</h3>
                <p className="text-welf-300 text-sm">ما فقط فروشنده نیستیم...</p>
            </div>

            <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-welf-800/50 border border-welf-700">
                        <CheckCircle2 className="w-5 h-5 text-vita-500 flex-shrink-0" />
                        <span className="text-sm text-welf-100">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
