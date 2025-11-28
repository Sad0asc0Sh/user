import { create } from 'zustand';
import { cartService, CartItem } from "@/services/cartService";
import { authService } from "@/services/authService";
import { Product } from "@/services/productService";

// Local cart item format (for guest users)
export interface LocalCartItem {
    id: string; // Product ID
    name: string;
    price: number;
    image: string;
    color?: string;
    qty: number;
    discount?: number;
    variantOptions?: Array<{
        name: string;
        value: string;
    }>;
}

const LOCAL_CART_KEY = "welfvita_cart";

interface CartState {
    cartItems: LocalCartItem[];
    loading: boolean;
    error: string | null;
    initialized: boolean;

    refreshCart: () => Promise<void>;
    addToCart: (product: Product, quantity?: number, variantOptions?: Array<{ name: string; value: string }>) => Promise<void>;
    updateQuantity: (productId: string, quantity: number, variantOptions?: Array<{ name: string; value: string }>) => Promise<void>;
    removeFromCart: (productId: string, variantOptions?: Array<{ name: string; value: string }>) => Promise<void>;
    clearCart: () => Promise<void>;
}

// Helper to transform backend items to local format
const transformBackendItems = (backendItems: CartItem[]): LocalCartItem[] => {
    const transformedItems: LocalCartItem[] = backendItems.map(
        (item: CartItem) => {
            let productId: string;
            let discount = 0;

            if (typeof item.product === 'string') {
                productId = item.product;
            } else if (typeof item.product === 'object' && item.product !== null) {
                productId = (item.product as any)._id || (item.product as any).id || '';
                discount = (item.product as any).discount || 0;
            } else {
                productId = (item as any)._id || '';
            }

            return {
                id: String(productId),
                name: item.name,
                price: item.price,
                image: item.images && item.images.length > 0 ? item.images[0].url : "/placeholder.svg",
                qty: Number(item.quantity),
                variantOptions: item.variantOptions,
                color: (item as any).color,
                discount: discount,
            };
        }
    );

    // Deduplicate items
    return transformedItems.reduce((acc, item) => {
        const variantKey = item.variantOptions
            ?.map((v) => `${v.name}:${v.value}`)
            .sort()
            .join("|") || "no-variant";
        const uniqueKey = `${item.id}-${item.color || "no-color"}-${variantKey}`;

        const existingItem = acc.find((i) => {
            const existingVariantKey = i.variantOptions
                ?.map((v) => `${v.name}:${v.value}`)
                .sort()
                .join("|") || "no-variant";
            const existingKey = `${i.id}-${i.color || "no-color"}-${existingVariantKey}`;
            return existingKey === uniqueKey;
        });

        if (existingItem) {
            existingItem.qty += item.qty;
        } else {
            acc.push(item);
        }

        return acc;
    }, [] as LocalCartItem[]);
};

export const useCartStore = create<CartState>((set, get) => ({
    cartItems: [],
    loading: false,
    error: null,
    initialized: false,

    refreshCart: async () => {
        const isAuthenticated = authService.isAuthenticated();
        set({ loading: true, error: null });

        try {
            if (isAuthenticated) {
                const response = await cartService.getCart();
                if (response.success && response.data) {
                    const items = transformBackendItems(response.data.items);
                    set({ cartItems: items, initialized: true });
                }
            } else {
                if (typeof window !== "undefined") {
                    const localCart = localStorage.getItem(LOCAL_CART_KEY);
                    set({ cartItems: localCart ? JSON.parse(localCart) : [], initialized: true });
                }
            }
        } catch (err: any) {
            console.error("[useCartStore] Error loading cart:", err);
            set({ error: err.message || "خطا در بارگذاری سبد خرید" });
        } finally {
            set({ loading: false });
        }
    },

    addToCart: async (product, quantity = 1, variantOptions) => {
        const isAuthenticated = authService.isAuthenticated();
        const { cartItems } = get();

        try {
            if (isAuthenticated) {
                // Optimistic Update
                const previousCart = [...cartItems];
                const newItem: LocalCartItem = {
                    id: String(product.id),
                    name: product.title,
                    price: product.price,
                    image: product.images[0] || "/placeholder.svg",
                    qty: quantity,
                    discount: product.discount || 0,
                    variantOptions: variantOptions,
                };

                const updatedCart = [...cartItems];
                const existingIndex = updatedCart.findIndex((item) => {
                    if (item.id !== String(product.id)) return false;
                    const itemVariants = item.variantOptions || [];
                    const newVariants = variantOptions || [];
                    if (itemVariants.length !== newVariants.length) return false;
                    return itemVariants.every(v1 => newVariants.some(v2 => v1.name === v2.name && v1.value === v2.value));
                });

                if (existingIndex > -1) {
                    updatedCart[existingIndex].qty += quantity;
                } else {
                    updatedCart.push(newItem);
                }
                set({ cartItems: updatedCart });

                try {
                    const response = await cartService.addItem(product.id, quantity, variantOptions);
                    if (response.success && response.data) {
                        const items = transformBackendItems(response.data.items);
                        set({ cartItems: items });
                    }
                } catch (err) {
                    set({ cartItems: previousCart }); // Revert
                    throw err;
                }
            } else {
                // Guest
                const currentCart = [...cartItems];
                const existingIndex = currentCart.findIndex((item) => {
                    if (item.id !== String(product.id)) return false;
                    const itemVariants = item.variantOptions || [];
                    const newVariants = variantOptions || [];
                    if (itemVariants.length !== newVariants.length) return false;
                    return itemVariants.every(v1 => newVariants.some(v2 => v1.name === v2.name && v1.value === v2.value));
                });

                if (existingIndex > -1) {
                    currentCart[existingIndex].qty += quantity;
                } else {
                    const newItem: LocalCartItem = {
                        id: String(product.id),
                        name: product.title,
                        price: product.price,
                        image: product.images[0] || "/placeholder.svg",
                        qty: quantity,
                        discount: product.discount || 0,
                        variantOptions: variantOptions,
                    };
                    currentCart.push(newItem);
                }

                localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentCart));
                set({ cartItems: currentCart });
            }
        } catch (err: any) {
            console.error("[useCartStore] Error adding to cart:", err);
            set({ error: err.message || "خطا در افزودن به سبد خرید" });
            throw err;
        }
    },

    updateQuantity: async (productId, quantity, variantOptions) => {
        if (quantity < 1) {
            return get().removeFromCart(productId, variantOptions);
        }

        const isAuthenticated = authService.isAuthenticated();
        const { cartItems } = get();

        try {
            if (isAuthenticated) {
                // Optimistic Update
                const previousCart = [...cartItems];
                const updatedCart = cartItems.map(item => {
                    if (item.id !== productId) return item;
                    const itemVariants = item.variantOptions || [];
                    const targetVariants = variantOptions || [];
                    if (itemVariants.length !== targetVariants.length) return item;
                    const isMatch = itemVariants.every(v1 => targetVariants.some(v2 => v1.name === v2.name && v1.value === v2.value));
                    return isMatch ? { ...item, qty: Number(quantity) } : item;
                });
                set({ cartItems: updatedCart });

                // Debounce logic is complex in store, simplifying for now to direct call
                // Ideally we should keep the debounce logic, but for fixing the infinite loop, direct call is safer.
                // If performance is an issue, we can add debounce back later.

                try {
                    const response = await cartService.updateItem(productId, quantity, variantOptions);
                    if (response.success && response.data) {
                        const items = transformBackendItems(response.data.items);
                        set({ cartItems: items });
                    }
                } catch (err) {
                    set({ cartItems: previousCart });
                    throw err;
                }

            } else {
                // Guest
                const currentCart = cartItems.map((item) => {
                    if (item.id !== productId) return item;
                    const itemVariants = item.variantOptions || [];
                    const targetVariants = variantOptions || [];
                    if (itemVariants.length !== targetVariants.length) return item;
                    const isMatch = itemVariants.every((v1) => targetVariants.some((v2) => v1.name === v2.name && v1.value === v2.value));
                    return isMatch ? { ...item, qty: Number(quantity) } : item;
                });

                localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentCart));
                set({ cartItems: currentCart });
            }
        } catch (err: any) {
            console.error("[useCartStore] Error updating quantity:", err);
            set({ error: err.message || "خطا در به‌روزرسانی تعداد" });
            throw err;
        }
    },

    removeFromCart: async (productId, variantOptions) => {
        const isAuthenticated = authService.isAuthenticated();
        const { cartItems } = get();

        try {
            if (isAuthenticated) {
                const previousCart = [...cartItems];
                const updatedCart = cartItems.filter(item => {
                    if (item.id !== productId) return true;
                    const itemVariants = item.variantOptions || [];
                    const targetVariants = variantOptions || [];
                    if (itemVariants.length !== targetVariants.length) return true;
                    const isMatch = itemVariants.every(v1 => targetVariants.some(v2 => v1.name === v2.name && v1.value === v2.value));
                    return !isMatch;
                });
                set({ cartItems: updatedCart });

                try {
                    const response = await cartService.removeItem(productId, variantOptions);
                    if (response.success && response.data) {
                        const items = transformBackendItems(response.data.items);
                        set({ cartItems: items });
                    }
                } catch (err) {
                    set({ cartItems: previousCart });
                    throw err;
                }
            } else {
                const currentCart = cartItems.filter((item) => {
                    if (item.id !== productId) return true;
                    const itemVariants = item.variantOptions || [];
                    const targetVariants = variantOptions || [];
                    if (itemVariants.length !== targetVariants.length) return true;
                    const isMatch = itemVariants.every((v1) => targetVariants.some((v2) => v1.name === v2.name && v1.value === v2.value));
                    return !isMatch;
                });

                localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentCart));
                set({ cartItems: currentCart });
            }
        } catch (err: any) {
            console.error("[useCartStore] Error removing item:", err);
            set({ error: err.message || "خطا در حذف از سبد خرید" });
            throw err;
        }
    },

    clearCart: async () => {
        const isAuthenticated = authService.isAuthenticated();
        const { cartItems } = get();

        try {
            if (isAuthenticated) {
                const previousCart = [...cartItems];
                set({ cartItems: [] });

                try {
                    await cartService.clearCart();
                } catch (err) {
                    set({ cartItems: previousCart });
                    throw err;
                }
            } else {
                localStorage.removeItem(LOCAL_CART_KEY);
                set({ cartItems: [] });
            }
        } catch (err: any) {
            console.error("[useCartStore] Error clearing cart:", err);
            set({ error: err.message || "خطا در پاک کردن سبد خرید" });
            throw err;
        }
    }
}));
