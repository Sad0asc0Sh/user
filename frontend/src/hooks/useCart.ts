import { useState, useEffect, useCallback, useRef } from "react";
import { cartService, CartItem } from "@/services/cartService";
import { authService } from "@/services/authService";
import { Product } from "@/services/productService";

// Local cart item format (for guest users)
interface LocalCartItem {
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
  discount?: number; // Added discount field
  variantOptions?: Array<{
    name: string;
    value: string;
  }>;
}

const LOCAL_CART_KEY = "welfvita_cart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();

  /**
   * Helper to transform backend items to local format
   */
  const transformBackendItems = useCallback((backendItems: CartItem[]): LocalCartItem[] => {
    const transformedItems: LocalCartItem[] = backendItems.map(
      (item: CartItem) => {
        // Extract product ID - handle both string ID and populated product object
        let productId: string;
        let discount = 0;

        if (typeof item.product === 'string') {
          productId = item.product;
        } else if (typeof item.product === 'object' && item.product !== null) {
          // Backend populated the product field - extract _id
          productId = (item.product as any)._id || (item.product as any).id || '';
          discount = (item.product as any).discount || 0;
        } else {
          productId = (item as any)._id || '';
        }

        return {
          id: String(productId),
          name: item.name,
          price: item.price,
          image:
            item.images && item.images.length > 0
              ? item.images[0].url
              : "/placeholder.svg",
          qty: Number(item.quantity),
          variantOptions: item.variantOptions,
          color: (item as any).color, // Preserve color if exists
          discount: discount,
        };
      }
    );

    // Deduplicate items: merge items with same product ID, color, and variants
    return transformedItems.reduce((acc, item) => {
      // Create unique key based on product ID, color, and variants
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
        // Merge quantities if item already exists
        existingItem.qty += item.qty;
      } else {
        // Add new item
        acc.push(item);
      }

      return acc;
    }, [] as LocalCartItem[]);
  }, []);

  /**
   * Load cart from server (authenticated) or localStorage (guest)
   */
  const refreshCart = useCallback(async () => {
    try {
      // Only set loading on initial load or full refresh, not background updates
      // setLoading(true); 
      setError(null);

      if (isAuthenticated) {
        // Authenticated: Fetch from server
        const response = await cartService.getCart();

        if (response.success && response.data) {
          const items = transformBackendItems(response.data.items);
          setCartItems(items);
        }
      } else {
        // Guest: Load from localStorage
        if (typeof window !== "undefined") {
          const localCart = localStorage.getItem(LOCAL_CART_KEY);
          setCartItems(localCart ? JSON.parse(localCart) : []);
        }
      }
    } catch (err: any) {
      console.error("[useCart] Error loading cart:", err);
      setError(err.message || "خطا در بارگذاری سبد خرید");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, transformBackendItems]);

  /**
   * Initialize cart on mount
   */
  useEffect(() => {
    setLoading(true);
    refreshCart().finally(() => setLoading(false));
  }, [refreshCart]);

  /**
   * Add item to cart
   * @param product - Product object
   * @param quantity - Quantity to add (default: 1)
   * @param variantOptions - Selected variant options (optional)
   */
  const addToCart = async (
    product: Product,
    quantity: number = 1,
    variantOptions?: Array<{ name: string; value: string }>
  ): Promise<void> => {
    try {
      if (isAuthenticated) {
        // Optimistic Update
        const previousCart = [...cartItems];
        // We can't easily optimistically add because we don't have the full product structure 
        // that matches backend response perfectly, but we can try.
        // For now, let's just rely on the fast API response without optimistic add (less jarring if it fails)
        // OR we can do it. Let's do it.
        const newItem: LocalCartItem = {
          id: String(product.id),
          name: product.title,
          price: product.price,
          image: product.images[0] || "/placeholder.svg",
          qty: quantity,
          discount: product.discount || 0,
          variantOptions: variantOptions,
        };
        setCartItems(prev => {
          const currentCart = [...prev];
          const existingIndex = currentCart.findIndex((item) => {
            if (item.id !== String(product.id)) return false;

            const itemVariants = item.variantOptions || [];
            const newVariants = variantOptions || [];

            if (itemVariants.length !== newVariants.length) return false;

            return itemVariants.every(v1 =>
              newVariants.some(v2 => v1.name === v2.name && v1.value === v2.value)
            );
          });

          if (existingIndex > -1) {
            currentCart[existingIndex].qty += quantity;
          } else {
            currentCart.push(newItem);
          }
          return currentCart;
        });

        try {
          const response = await cartService.addItem(product.id, quantity, variantOptions);
          if (response.success && response.data) {
            const items = transformBackendItems(response.data.items);
            setCartItems(items);
          }
        } catch (err) {
          setCartItems(previousCart); // Revert
          throw err;
        }

        console.log(`[useCart] Added ${product.title} to cart (API)`);
      } else {
        // Guest: Add to localStorage
        const currentCart = [...cartItems];

        const existingIndex = currentCart.findIndex((item) => {
          if (item.id !== String(product.id)) return false;

          const itemVariants = item.variantOptions || [];
          const newVariants = variantOptions || [];

          if (itemVariants.length !== newVariants.length) return false;

          return itemVariants.every(v1 =>
            newVariants.some(v2 => v1.name === v2.name && v1.value === v2.value)
          );
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
        setCartItems(currentCart);

        console.log(`[useCart] Added ${product.title} to cart (localStorage)`);
      }

      return Promise.resolve();
    } catch (err: any) {
      console.error("[useCart] Error adding to cart:", err);
      setError(err.message || "خطا در افزودن به سبد خرید");
      return Promise.reject(err);
    }
  };

  // Ref to store update timeouts for debouncing
  const updateTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  // Ref to store latest requested quantity to ignore stale responses
  const latestQuantities = useRef<{ [key: string]: number }>({});

  /**
   * Update item quantity
   * @param productId - Product ID
   * @param quantity - New quantity
   * @param variantOptions - Optional variant options to identify exact item
   */
  const updateQuantity = async (
    productId: string,
    quantity: number,
    variantOptions?: Array<{ name: string; value: string }>
  ): Promise<void> => {
    try {
      if (quantity < 1) {
        return removeFromCart(productId, variantOptions);
      }

      // Generate unique key for this item to manage debounce timer
      const variantKey = variantOptions
        ?.map((v) => `${v.name}:${v.value}`)
        .sort()
        .join("|") || "no-variant";
      const uniqueKey = `${productId}-${variantKey}`;

      if (isAuthenticated) {
        // Update latest requested quantity
        latestQuantities.current[uniqueKey] = quantity;

        // Optimistic Update
        const previousCart = [...cartItems];
        setCartItems(prev => prev.map(item => {
          if (item.id !== productId) return item;

          const itemVariants = item.variantOptions || [];
          const targetVariants = variantOptions || [];
          if (itemVariants.length !== targetVariants.length) return item;

          const isMatch = itemVariants.every(v1 =>
            targetVariants.some(v2 => v1.name === v2.name && v1.value === v2.value)
          );

          return isMatch ? { ...item, qty: Number(quantity) } : item;
        }));

        // Clear existing timeout for this item
        if (updateTimeouts.current[uniqueKey]) {
          clearTimeout(updateTimeouts.current[uniqueKey]);
        }

        // Set new timeout (Debounce)
        updateTimeouts.current[uniqueKey] = setTimeout(async () => {
          try {
            // Check if this request is still the latest one
            if (latestQuantities.current[uniqueKey] !== quantity) {
              console.log(`[useCart] Skipping stale request for ${uniqueKey} (req: ${quantity}, latest: ${latestQuantities.current[uniqueKey]})`);
              // Even if we skip sending, we might have already sent a previous one that is in flight.
              // But here we are deciding whether to SEND.
              // If we are in the timeout callback, and the quantity has changed since we scheduled it,
              // it means a NEW timer has been scheduled (and this one should have been cleared).
              // So this block shouldn't be reached if clearTimeout works?
              // YES. clearTimeout prevents this.
              // BUT... what if the request sends, and THEN user clicks?
            }

            const response = await cartService.updateItem(productId, quantity, variantOptions);

            // CRITICAL: Check if this response is stale (user clicked again while request was in flight)
            if (latestQuantities.current[uniqueKey] !== quantity) {
              console.log(`[useCart] Ignoring stale response for ${uniqueKey} (resp: ${quantity}, latest: ${latestQuantities.current[uniqueKey]})`);
              return;
            }

            if (response.success && response.data) {
              const items = transformBackendItems(response.data.items);
              setCartItems(items);
            }
            delete updateTimeouts.current[uniqueKey];
          } catch (err: any) {
            // Only revert if we are still the latest request?
            // If we revert a stale request, we might revert the NEW optimistic update!
            if (latestQuantities.current[uniqueKey] === quantity) {
              setCartItems(previousCart); // Revert
              console.error("[useCart] Error updating item:", err);
              setError(err.message || "خطا در به‌روزرسانی سبد خرید");
            }
          }
        }, 500); // 500ms delay for better responsiveness

        console.log(`[useCart] Queued update for item ${productId} to qty ${quantity}`);
      } else {
        // Guest: Update in localStorage (No debounce needed for local)
        const currentCart = cartItems.map((item) => {
          if (item.id !== productId) return item;

          const itemVariants = item.variantOptions || [];
          const targetVariants = variantOptions || [];

          if (itemVariants.length !== targetVariants.length) return item;

          const isMatch = itemVariants.every((v1) =>
            targetVariants.some((v2) => v1.name === v2.name && v1.value === v2.value)
          );

          return isMatch ? { ...item, qty: Number(quantity) } : item;
        });

        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentCart));
        setCartItems(currentCart);

        console.log(
          `[useCart] Updated item ${productId} to qty ${quantity} (localStorage)`
        );
      }
    } catch (err: any) {
      console.error("[useCart] Error updating quantity:", err);
      setError(err.message || "خطا در به‌روزرسانی تعداد");
      throw err;
    }
  };

  /**
   * Remove item from cart
   * @param productId - Product ID to remove
   * @param variantOptions - Optional variant options to identify exact item
   */
  const removeFromCart = async (
    productId: string,
    variantOptions?: Array<{ name: string; value: string }>
  ): Promise<void> => {
    try {
      // Generate unique key for this item to manage debounce timer
      const variantKey = variantOptions
        ?.map((v) => `${v.name}:${v.value}`)
        .sort()
        .join("|") || "no-variant";
      const uniqueKey = `${productId}-${variantKey}`;

      if (isAuthenticated) {
        // Clear any pending update timeout
        if (updateTimeouts.current[uniqueKey]) {
          clearTimeout(updateTimeouts.current[uniqueKey]);
          delete updateTimeouts.current[uniqueKey];
        }

        // Optimistic Update
        const previousCart = [...cartItems];
        setCartItems(prev => prev.filter(item => {
          if (item.id !== productId) return true;

          const itemVariants = item.variantOptions || [];
          const targetVariants = variantOptions || [];
          if (itemVariants.length !== targetVariants.length) return true;

          const isMatch = itemVariants.every(v1 =>
            targetVariants.some(v2 => v1.name === v2.name && v1.value === v2.value)
          );

          return !isMatch;
        }));

        try {
          const response = await cartService.removeItem(productId, variantOptions);
          if (response.success && response.data) {
            const items = transformBackendItems(response.data.items);
            setCartItems(items);
          }
        } catch (err) {
          setCartItems(previousCart); // Revert
          throw err;
        }

        console.log(`[useCart] Removed item ${productId} (API)`);
      } else {
        // Guest: Remove from localStorage
        const currentCart = cartItems.filter((item) => {
          if (item.id !== productId) return true;

          const itemVariants = item.variantOptions || [];
          const targetVariants = variantOptions || [];

          if (itemVariants.length !== targetVariants.length) return true;

          const isMatch = itemVariants.every((v1) =>
            targetVariants.some((v2) => v1.name === v2.name && v1.value === v2.value)
          );

          return !isMatch;
        });

        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentCart));
        setCartItems(currentCart);

        console.log(`[useCart] Removed item ${productId} (localStorage)`);
      }
    } catch (err: any) {
      console.error("[useCart] Error removing item:", err);
      setError(err.message || "خطا در حذف از سبد خرید");
      throw err;
    }
  };

  /**
   * Clear entire cart
   */
  const clearCart = async (): Promise<void> => {
    try {
      if (isAuthenticated) {
        // Optimistic Update
        const previousCart = [...cartItems];
        setCartItems([]);

        try {
          await cartService.clearCart();
          // After clearing, the backend should return an empty cart,
          // but the API doesn't return cart items for clearCart.
          // So, we just trust the optimistic update here.
        } catch (err) {
          setCartItems(previousCart); // Revert
          throw err;
        }

        console.log("[useCart] Cart cleared (API)");
      } else {
        // Guest: Clear localStorage
        localStorage.removeItem(LOCAL_CART_KEY);
        setCartItems([]);

        console.log("[useCart] Cart cleared (localStorage)");
      }
    } catch (err: any) {
      console.error("[useCart] Error clearing cart:", err);
      setError(err.message || "خطا در پاک کردن سبد خرید");
      throw err;
    }
  };

  /**
   * Get total price
   */
  const totalPrice = cartItems.reduce(
    (total, item) => {
      const discount = item.discount || 0;
      const price = item.price * (1 - discount / 100);
      const itemTotal = price * item.qty;
      // console.log(`[DEBUG_PRICE] Item: ${item.name}, Price: ${item.price}, Disc: ${discount}%, Qty: ${item.qty}, ItemTotal: ${itemTotal}`);
      return total + itemTotal;
    },
    0
  );
  // console.log(`[DEBUG_PRICE] Total: ${totalPrice}`);

  /**
   * Get item count
   */
  const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  /**
   * Check if product is in cart
   */
  const isInCart = (productId: string): boolean => {
    return cartItems.some((item) => item.id === productId);
  };

  /**
   * Get item quantity by product ID
   */
  const getItemQuantity = (productId: string): number => {
    const item = cartItems.find((item) => item.id === productId);
    return item?.qty || 0;
  };

  /**
   * Get total original price (before discounts)
   */
  const totalOriginalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.qty),
    0
  );

  /**
   * Get total profit (savings from product discounts)
   */
  const totalProfit = totalOriginalPrice - totalPrice;

  return {
    // State
    cartItems,
    loading,
    error,
    totalPrice,
    totalOriginalPrice,
    totalProfit,
    itemCount,

    // Methods
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    isInCart,
    getItemQuantity,

    // Flags
    isEmpty: cartItems.length === 0,
    isAuthenticated,
  };
};
