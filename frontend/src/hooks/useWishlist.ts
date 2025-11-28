import { useEffect } from "react";
import { useWishlistStore, WishlistItem } from "@/store/wishlistStore";

export type { WishlistItem };

export const useWishlist = () => {
    const store = useWishlistStore();

    // Initial load (only once)
    useEffect(() => {
        if (!store.initialized) {
            store.refreshWishlist();
        }
    }, [store.initialized, store.refreshWishlist]);

    const isInWishlist = (productId: string) => {
        return store.wishlistItems.some((item) => item.id === productId);
    };

    return {
        wishlistItems: store.wishlistItems,
        loading: store.loading,
        addToWishlist: store.addToWishlist,
        removeFromWishlist: store.removeFromWishlist,
        toggleWishlist: store.toggleWishlist,
        isInWishlist,
        refreshWishlist: store.refreshWishlist,
    };
};
