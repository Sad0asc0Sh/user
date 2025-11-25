import { useState, useEffect, useCallback } from "react";
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
   * Load cart from server (authenticated) or localStorage (guest)
   */
  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isAuthenticated) {
        // Authenticated: Fetch from server
        const response = await cartService.getCart();

        if (response.success && response.data) {
          // Transform backend CartItem to LocalCartItem format
          const transformedItems: LocalCartItem[] = response.data.items.map(
            (item: CartItem) => ({
              id: item.product,
              name: item.name,
              price: item.price,
              image:
                item.images && item.images.length > 0
                  ? item.images[0].url
                  : "/placeholder.jpg",
              qty: item.quantity,
              variantOptions: item.variantOptions,
            })
          );

          setCartItems(transformedItems);
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
  }, [isAuthenticated]);

  /**
   * Initialize cart on mount
   */
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  /**
   * Add item to cart
   * @param product - Product object
   * @param quantity - Quantity to add (default: 1)
   * @param color - Selected color (optional)
   */
  const addToCart = async (
    product: Product,
    quantity: number = 1,
    color?: string
  ): Promise<void> => {
    try {
      if (isAuthenticated) {
        // Authenticated: Add via API
        await cartService.addItem(product.id, quantity);

        // Refresh cart to get updated data
        await refreshCart();

        console.log(`[useCart] Added ${product.title} to cart (API)`);
      } else {
        // Guest: Add to localStorage
        const currentCart = [...cartItems];
        const existingIndex = currentCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          // Update quantity if item exists
          currentCart[existingIndex].qty += quantity;
        } else {
          // Add new item
          const newItem: LocalCartItem = {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0] || "/placeholder.jpg",
            color: color || "#000",
            qty: quantity,
          };
          currentCart.push(newItem);
        }

        // Save to localStorage
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

  /**
   * Update item quantity
   * @param productId - Product ID
   * @param quantity - New quantity
   */
  const updateQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    try {
      if (quantity < 1) {
        // If quantity is 0, remove item
        return removeFromCart(productId);
      }

      if (isAuthenticated) {
        // Authenticated: Update via API
        await cartService.updateItem(productId, quantity);
        await refreshCart();

        console.log(`[useCart] Updated item ${productId} to qty ${quantity} (API)`);
      } else {
        // Guest: Update in localStorage
        const currentCart = cartItems.map((item) =>
          item.id === productId ? { ...item, qty: quantity } : item
        );

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
   */
  const removeFromCart = async (productId: string): Promise<void> => {
    try {
      if (isAuthenticated) {
        // Authenticated: Remove via API
        await cartService.removeItem(productId);
        await refreshCart();

        console.log(`[useCart] Removed item ${productId} (API)`);
      } else {
        // Guest: Remove from localStorage
        const currentCart = cartItems.filter((item) => item.id !== productId);

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
        // Authenticated: Clear via API
        await cartService.clearCart();
        setCartItems([]);

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
    (total, item) => total + item.price * item.qty,
    0
  );

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

  return {
    // State
    cartItems,
    loading,
    error,
    totalPrice,
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
