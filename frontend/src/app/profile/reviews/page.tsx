"use client";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
                <Link
                    href="/profile"
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    <ArrowRight size={20} />
                </Link>
                <h1 className="font-bold text-lg text-gray-800">نقد و نظرات من</h1>
            </div>
            <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm mb-2">هنوز نظری ثبت نکرده‌اید</p>
                <p className="text-gray-300 text-xs">این صفحه به زودی تکمیل خواهد شد</p>
            </div>
        </div>
    );
}
