"use client";

import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Camera, Send, X, RefreshCw, Sparkles, Box, Wrench, ShoppingBag, Phone, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AIChatSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export default function AIChatSheet({ open, onOpenChange }: AIChatSheetProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // --- Body Scroll Lock ---
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const suggestions = [
        { icon: Box, label: "پیگیری سفارش", prompt: "سفارش من کجاست؟" },
        { icon: Wrench, label: "خدمات نصب", prompt: "شرایط نصب در محل چیست؟" },
        { icon: ShoppingBag, label: "راهنمای خرید", prompt: "بهترین دوربین مداربسته برای منزل کدام است؟" },
        { icon: Phone, label: "پشتیبانی", prompt: "شماره تماس پشتیبانی چند است؟" },
    ];

    // --- FIXED: Smart Auto-Scroll ---
    // Previously caused jumping while typing. Now only scrolls on NEW messages.
    useEffect(() => {
        if (open) {
            // Use a small timeout to allow layout to paint before scrolling
            const timeoutId = setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [messages.length, open]); // <--- CRITICAL FIX: Removed 'input' from dependencies

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "40px";

        setTimeout(() => {
            setMessages((prev) => [...prev, {
                role: 'ai',
                content: `پاسخ هوش مصنوعی به: "${currentInput}"`
            }]);
        }, 1000);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                // FIX: 
                // 1. !h-[100dvh] forces full height.
                // 2. [&>div>button]:hidden hides the default Shadcn close button which conflicts with ours.
                // 3. We DO NOT use flex here because the inner div of SheetContent blocks it. We use a wrapper below.
                className="fixed inset-0 z-[9999] !h-[100dvh] !w-full !p-0 bg-white border-none focus-visible:outline-none [&>div>button]:hidden"
            >
                {/* --- NEW WRAPPER: Restores Flex Context broken by SheetContent's inner div --- */}
                <div className="flex flex-col h-full w-full relative">

                    {/* 1. Header */}
                    <div className="shrink-0 flex justify-between items-center p-4 pt-safe-top bg-white/95 backdrop-blur-md border-b border-gray-100 z-30">
                        <SheetClose className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="text-gray-600" size={24} />
                        </SheetClose>
                        <span className="font-bold text-welf-800 text-sm">هوش مصنوعی ویلف‌ویتا</span>
                        <button onClick={() => setMessages([])} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors">
                            <RefreshCw className="text-gray-600" size={20} />
                        </button>
                    </div>

                    {/* 2. Main Content (Scrollable) */}
                    <div
                        className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden p-4 pt-4 scroll-smooth touch-pan-y overscroll-contain"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {/* Welcome Block */}
                        <div className="flex flex-col items-center w-full transition-all duration-500">
                            <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${messages.length > 0 ? "opacity-0 max-h-0 scale-50 overflow-hidden margin-0" : "opacity-100 max-h-[200px] scale-100 mt-10 mb-6"}`}>
                                <div className="w-20 h-20 bg-gradient-to-tr from-gray-100 to-white border border-gray-100 rounded-full flex items-center justify-center shadow-xl shadow-vita-200/40 relative">
                                    <div className="absolute inset-0 bg-vita-400 rounded-full blur-xl opacity-20"></div>
                                    <Sparkles className="text-vita-500 relative z-10" size={40} />
                                </div>
                            </div>
                            <div className={`flex flex-col items-center w-full transition-all duration-500 ease-in-out origin-top ${(input.trim().length > 0 || messages.length > 0) ? "opacity-0 max-h-0 scale-95 -translate-y-4 overflow-hidden" : "opacity-100 max-h-[500px] scale-100 translate-y-0"}`}>
                                <h2 className="text-xl font-bold text-gray-800 mb-8">چطور می‌توانم کمکتان کنم؟</h2>
                                <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-4">
                                    {suggestions.map((item, idx) => (
                                        <button key={idx} onClick={() => setInput(item.prompt)} className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-vita-300 hover:shadow-md transition-all active:scale-95 cursor-pointer">
                                            <item.icon className="text-vita-500" size={24} />
                                            <span className="text-xs font-medium text-gray-600">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        {messages.length > 0 && (
                            <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4 px-1">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex gap-2 items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-1 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-vita-100'}`}>
                                            {msg.role === 'user' ? <User size={14} className="text-gray-600" /> : <Sparkles size={14} className="text-vita-600" />}
                                        </div>
                                        <div className={`px-3.5 py-2 rounded-2xl text-[13px] leading-6 shadow-sm max-w-[85%] break-words whitespace-pre-wrap ${msg.role === 'user' ? 'bg-gray-800 text-white rounded-br-sm' : 'bg-orange-100 border border-orange-200 text-orange-900 rounded-bl-sm'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {messages[messages.length - 1].role === 'user' && (
                                    <div className="flex gap-2 animate-pulse mt-1">
                                        <div className="w-6 h-6 rounded-full bg-vita-50 flex items-center justify-center">
                                            <Sparkles size={12} className="text-vita-400" />
                                        </div>
                                        <span className="text-[10px] text-gray-400 pt-1">در حال نوشتن...</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Anchor for Auto-Scroll */}
                        <div ref={bottomRef} className="h-4 w-full shrink-0" />
                    </div>

                    {/* 3. Footer Input (Static Flex Item) */}
                    <div className="shrink-0 w-full p-4 pb-19 bg-white border-t border-gray-100 z-40">
                        <div className="flex items-end gap-2 bg-white p-2 pr-4 rounded-[1.5rem] border border-gray-200 shadow-sm focus-within:border-vita-400 focus-within:ring-1 focus-within:ring-vita-200 transition-all">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={input}
                                onChange={handleInput}
                                placeholder="از من بپرسید..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-right min-h-[40px] max-h-[150px] py-2.5 resize-none overflow-y-auto placeholder:text-gray-400"
                                style={{ height: '40px' }}
                            />
                            <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1 mb-1.5 h-8">
                                <button className="p-2 text-gray-400 hover:text-vita-600 transition"><Camera size={20} /></button>
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={`mb-1 p-3 rounded-full transition-all duration-300 ${input.trim() ? 'bg-vita-500 text-white shadow-lg shadow-vita-500/30 rotate-0 scale-100' : 'bg-gray-100 text-gray-300 rotate-90 scale-90'}`}
                            >
                                <Send size={18} className="rtl:-scale-x-100" />
                            </button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
