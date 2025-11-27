import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
    discount?: number;
    finalPrice?: number;
}

interface HistoryState {
    viewedProducts: Product[];
    addToHistory: (product: Product) => void;
    clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set) => ({
            viewedProducts: [],
            addToHistory: (product) =>
                set((state) => {
                    // Remove if already exists to move it to the top
                    const filtered = state.viewedProducts.filter((p) => p._id !== product._id);
                    // Add to beginning, limit to 20 items
                    return { viewedProducts: [product, ...filtered].slice(0, 20) };
                }),
            clearHistory: () => set({ viewedProducts: [] }),
        }),
        {
            name: 'view-history-storage',
        }
    )
);
