import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { authService } from "@/services/authService";

export const useCart = () => {
  const store = useCartStore();
  const isAuthenticated = authService.isAuthenticated();

  // Initialize cart on mount (only once per app session)
  useEffect(() => {
    if (!store.initialized) {
      store.refreshCart();
    }
  }, [store.initialized, store.refreshCart]);

  /**
   * Get total price
   */
  const totalPrice = store.cartItems.reduce(
    (total, item) => {
      const discount = item.discount || 0;
      const price = item.price * (1 - discount / 100);
      const itemTotal = price * item.qty;
      return total + itemTotal;
    },
    0
  );

  /**
   * Get item count
   */
  const itemCount = store.cartItems.reduce((total, item) => total + item.qty, 0);

  /**
   * Check if product is in cart
   */
  const isInCart = (productId: string): boolean => {
    return store.cartItems.some((item) => item.id === productId);
  };

  /**
   * Get item quantity by product ID
   */
  const getItemQuantity = (productId: string): number => {
    const item = store.cartItems.find((item) => item.id === productId);
    return item?.qty || 0;
  };

  /**
   * Get total original price (before discounts)
   */
  const totalOriginalPrice = store.cartItems.reduce(
    (total, item) => total + (item.price * item.qty),
    0
  );

  /**
   * Get total profit (savings from product discounts)
   */
  const totalProfit = totalOriginalPrice - totalPrice;

  return {
    // State
    cartItems: store.cartItems,
    loading: store.loading,
    error: store.error,
    totalPrice,
    totalOriginalPrice,
    totalProfit,
    itemCount,

    // Methods
    addToCart: store.addToCart,
    updateQuantity: store.updateQuantity,
    removeFromCart: store.removeFromCart,
    clearCart: store.clearCart,
    refreshCart: store.refreshCart,
    isInCart,
    getItemQuantity,

    // Flags
    isEmpty: store.cartItems.length === 0,
    isAuthenticated,
  };
};

