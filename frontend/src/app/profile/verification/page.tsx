"use client";
import { ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";

export default function VerificationPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
                <Link
                    href="/profile"
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    <ArrowRight size={20} />
                </Link>
                <h1 className="font-bold text-lg text-gray-800">احراز هویت</h1>
            </div>
            <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck size={32} className="text-green-600" />
                </div>
                <p className="text-green-600 font-bold text-sm mb-2">هویت شما تایید شده است</p>
                <p className="text-gray-400 text-xs">این صفحه به زودی تکمیل خواهد شد</p>
            </div>
        </div>
    );
}
