"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product, productService } from "@/services/productService";
import { categoryService, Category } from "@/services/categoryService";
import ProductCard from "@/components/product/ProductCard";
import { Loader2, SlidersHorizontal, X, Search, ArrowUpDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ProductListingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL Params
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const sortParam = searchParams.get("sort") || "newest";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const includeChildrenParam = searchParams.get("includeChildren") === "true";

    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
    const [sliderValue, setSliderValue] = useState<[number, number]>([0, 0]);
    const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle
    const [showSortSheet, setShowSortSheet] = useState(false); // Mobile sort sheet toggle

    // Load Initial Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Products
                const data = await productService.getProducts({
                    page: 1,
                    limit: 20,
                    sort: sortParam,
                    category: categorySlug || undefined,
                    search: searchQuery || undefined,
                    minPrice: minPriceParam ? Number(minPriceParam) : undefined,
                    maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
                    includeChildren: includeChildrenParam,
                });

                // Client-side filtering for stock if backend doesn't support it yet
                let finalProducts = data.products;
                if (searchParams.get("inStock") === "true") {
                    finalProducts = finalProducts.filter(p => p.countInStock > 0);
                }

                setProducts(finalProducts);
                setTotal(data.total);

                // Only set initial price range if not already set by user interaction
                if (data.priceRange) {
                    setPriceRange(data.priceRange);
                    // If no user filter, set slider to full range
                    if (!minPriceParam && !maxPriceParam) {
                        setSliderValue([data.priceRange.min, data.priceRange.max]);
                    } else {
                        // If user filter exists, set slider to that
                        setSliderValue([
                            minPriceParam ? Number(minPriceParam) : data.priceRange.min,
                            maxPriceParam ? Number(maxPriceParam) : data.priceRange.max
                        ]);
                    }
                }
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug, searchQuery, sortParam, minPriceParam, maxPriceParam, includeChildrenParam, searchParams]);

    // Handlers
    const handleSortChange = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sort);
        router.push(`/products?${params.toString()}`);
    };

    const handlePriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", sliderValue[0].toString());
        params.set("maxPrice", sliderValue[1].toString());
        router.push(`/products?${params.toString()}`);
    };

    const handleClearFilters = () => {
        router.push(categorySlug ? `/products?category=${categorySlug}` : "/products");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-6">
            <div className="container mx-auto max-w-7xl px-4 flex gap-6">
                {/* Sidebar (Filters) */}
                <aside className={`
          fixed inset-0 z-[100] bg-white lg:static lg:bg-transparent lg:z-auto lg:w-64 lg:block
          ${showFilters ? "block" : "hidden"}
        `}>
                    <div className="h-full lg:h-auto overflow-y-auto p-5 lg:p-0 bg-white lg:bg-transparent">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-lg">فیلترها</span>
                            <button onClick={() => setShowFilters(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Active Filters Summary */}
                            {(minPriceParam || maxPriceParam) && (
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-gray-500">فیلترهای اعمال شده</span>
                                        <button onClick={handleClearFilters} className="text-[10px] text-red-500 hover:underline">
                                            حذف همه
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {minPriceParam && (
                                            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md">
                                                از {Number(minPriceParam).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Price Range */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-sm text-gray-800 mb-4">محدوده قیمت (تومان)</h3>
                                <div className="px-2 mb-6">
                                    <Slider
                                        range
                                        min={priceRange.min}
                                        max={priceRange.max}
                                        value={sliderValue}
                                        onChange={(val) => setSliderValue(val as [number, number])}
                                        trackStyle={[{ backgroundColor: '#f97316' }]} // vita-500
                                        handleStyle={[
                                            { borderColor: '#f97316', backgroundColor: '#fff', opacity: 1 },
                                            { borderColor: '#f97316', backgroundColor: '#fff', opacity: 1 }
                                        ]}
                                        railStyle={{ backgroundColor: '#e5e7eb' }} // gray-200
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-4 font-medium">
                                    <span>{sliderValue[0].toLocaleString()}</span>
                                    <span>{sliderValue[1].toLocaleString()}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        handlePriceFilter();
                                        setShowFilters(false);
                                    }}
                                    className="w-full bg-gray-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    اعمال قیمت
                                </button>
                            </div>

                            {/* Mobile Availability Toggle (Visible only on mobile sidebar) */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-700">فقط کالاهای موجود</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={searchParams.get("inStock") === "true"}
                                        onChange={(e) => {
                                            const params = new URLSearchParams(searchParams.toString());
                                            if (e.target.checked) params.set("inStock", "true");
                                            else params.delete("inStock");
                                            router.push(`/products?${params.toString()}`);
                                        }}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vita-500"></div>
                                </label>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* Main Content (Grid) */}
                <main className="flex-1">
                    {/* Filter & Sort Bar (Simple) */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowSortSheet(true)}
                                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                            >
                                <ArrowUpDown size={18} />
                                <span className="hidden sm:inline">مرتب‌سازی:</span>
                                <span className="text-vita-600">
                                    {sortParam === 'newest' && 'جدیدترین'}
                                    {sortParam === 'priceAsc' && 'ارزان‌ترین'}
                                    {sortParam === 'priceDesc' && 'گران‌ترین'}
                                    {sortParam === 'popularity' && 'محبوب‌ترین'}
                                    {sortParam === 'bestSelling' && 'پرفروش‌ترین'}
                                </span>
                            </button>

                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                            >
                                <SlidersHorizontal size={18} />
                                فیلترها
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 font-medium">
                            {total} کالا
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="animate-spin text-vita-500 mb-4" size={40} />
                            <span className="text-gray-500 font-medium">در حال بارگذاری محصولات...</span>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="h-[380px]">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">محصولی یافت نشد</h3>
                            <p className="text-gray-500 text-sm">با فیلترهای انتخاب شده محصولی پیدا نشد.</p>
                            <button
                                onClick={handleClearFilters}
                                className="mt-4 text-vita-600 font-bold text-sm hover:underline"
                            >
                                پاک کردن فیلترها
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Sort Bottom Sheet */}
            <AnimatePresence>
                {showSortSheet && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSortSheet(false)}
                            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[100] p-6 pb-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
                        >
                            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
                            <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">مرتب‌سازی بر اساس</h3>
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: "popularity", label: "محبوب‌ترین" },
                                    { id: "bestSelling", label: "پرفروش‌ترین" },
                                    { id: "newest", label: "جدیدترین" },
                                    { id: "priceAsc", label: "ارزان‌ترین" },
                                    { id: "priceDesc", label: "گران‌ترین" },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            handleSortChange(opt.id);
                                            setShowSortSheet(false);
                                        }}
                                        className={`
                      w-full py-4 px-4 rounded-xl text-right font-medium transition-all flex items-center justify-between
                      ${sortParam === opt.id
                                                ? "bg-vita-50 text-vita-700 font-bold"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }
                    `}
                                    >
                                        {opt.label}
                                        {sortParam === opt.id && <Check size={18} className="text-vita-600" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProductListingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <ProductListingContent />
        </Suspense>
    );
}
