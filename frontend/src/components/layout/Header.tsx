import Link from "next/link";
import { Search, Sparkles, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-welf-200 bg-white/80 backdrop-blur-md">
            <div className="mobile-container flex h-16 items-center justify-between">
                {/* Right: Brand Logo */}
                <Link href="/">
                    <Logo />
                </Link>

                {/* Left: Search & AI */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="h-9 w-40 rounded-full bg-welf-50 px-8 text-xs text-welf-900 placeholder:text-welf-500 focus:outline-none focus:ring-1 focus:ring-vita-500"
                        />
                        <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-welf-500" />
                    </div>

                    {/* AI Assistant Overlay */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-welf-50 text-vita-500 hover:bg-vita-50 transition-colors">
                                <Sparkles className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[100dvh] rounded-none border-none p-0">
                            <div className="flex flex-col h-full bg-welf-900 text-white">
                                {/* AI Header */}
                                <div className="flex items-center justify-between p-4 border-b border-welf-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-vita-500/20 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-vita-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">دستیار هوشمند ویلف‌ویتا</h3>
                                            <span className="text-[10px] text-vita-400">آنلاین</span>
                                        </div>
                                    </div>
                                    {/* Close button is handled by SheetContent default X */}
                                </div>

                                {/* Chat Area (Mock) */}
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                                    {/* Glowing Orb */}
                                    <div className="relative w-32 h-32">
                                        <div className="absolute inset-0 bg-vita-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                        <div className="relative w-full h-full rounded-full border-2 border-vita-500/50 flex items-center justify-center bg-welf-950/50 backdrop-blur-sm">
                                            <span className="text-4xl font-bold text-vita-500">Vita</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 max-w-xs mx-auto">
                                        <p className="text-lg font-medium">سلام! چطور می‌تونم کمکت کنم؟</p>
                                        <p className="text-sm text-welf-400">من می‌تونم در انتخاب محصول، پیگیری سفارش و سوالات فنی راهنماییت کنم.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                                        <button className="p-3 rounded-xl bg-welf-800 hover:bg-welf-700 text-xs transition-colors">مشاوره خرید</button>
                                        <button className="p-3 rounded-xl bg-welf-800 hover:bg-welf-700 text-xs transition-colors">پیگیری سفارش</button>
                                        <button className="p-3 rounded-xl bg-welf-800 hover:bg-welf-700 text-xs transition-colors">اسمبل سیستم</button>
                                        <button className="p-3 rounded-xl bg-welf-800 hover:bg-welf-700 text-xs transition-colors">ارتباط با پشتیبانی</button>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-welf-800 bg-welf-950">
                                    <div className="flex items-center gap-2 bg-welf-900 rounded-full px-4 py-2 border border-welf-800">
                                        <input
                                            type="text"
                                            placeholder="پیام خود را بنویسید..."
                                            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-welf-600"
                                        />
                                        <button className="p-1.5 rounded-full bg-vita-500 text-white hover:bg-vita-600">
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
