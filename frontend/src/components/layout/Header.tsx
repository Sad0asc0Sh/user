"use client";

import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useState } from "react";
import AIChatSheet from "@/components/features/ai/AIChatSheet";

interface HeaderProps {
    isAIOpen: boolean;
    setIsAIOpen: (open: boolean) => void;
}

export default function Header({ isAIOpen, setIsAIOpen }: HeaderProps) {
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
                    <button
                        onClick={() => setIsAIOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-welf-50 text-vita-500 hover:bg-vita-50 transition-colors"
                    >
                        <Sparkles className="h-5 w-5" />
                    </button>

                    <AIChatSheet open={isAIOpen} onOpenChange={setIsAIOpen} />
                </div>
            </div>
        </header>
    );
}
