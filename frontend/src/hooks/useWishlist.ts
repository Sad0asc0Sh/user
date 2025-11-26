import { useState, useEffect, useCallback } from "react";
import { Product } from "@/services/productService";
import { wishlistService } from "@/services/wishlistService";
import { authService } from "@/services/authService";

const LOCAL_WISHLIST_KEY = "welfvita_wishlist";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

export const useWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = authService.isAuthenticated();

    // Transform backend item to local format
    const transformBackendItem = (item: any): WishlistItem => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price,
        image: item.images && item.images.length > 0 ? item.images[0].url : (item.image || "/placeholder.jpg"),
        description: item.description,
    });

    // Load wishlist
    const refreshWishlist = useCallback(async () => {
        try {
            setLoading(true);
            if (isAuthenticated) {
                // Authenticated: Fetch from server
                const items = await wishlistService.getWishlist();
                setWishlistItems(items.map(transformBackendItem));
            } else {
                // Guest: Load from localStorage
                if (typeof window !== "undefined") {
                    const localWishlist = localStorage.getItem(LOCAL_WISHLIST_KEY);
                    if (localWishlist) {
                        setWishlistItems(JSON.parse(localWishlist));
                    }
                }
            }
        } catch (error) {
            console.error("Error loading wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // Initial load
    useEffect(() => {
        refreshWishlist();
    }, [refreshWishlist]);

    // Save to localStorage for guests
    useEffect(() => {
        if (!isAuthenticated && typeof window !== "undefined" && !loading) {
            localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, loading, isAuthenticated]);

    const addToWishlist = async (product: Product) => {
        // Optimistic update
        const previousItems = [...wishlistItems];
        const newItem: WishlistItem = {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0] || "/placeholder.jpg",
            description: product.description,
        };

        if (!wishlistItems.some(item => item.id === product.id)) {
            setWishlistItems(prev => [...prev, newItem]);
        }

        try {
            if (isAuthenticated) {
                await wishlistService.addToWishlist(product.id);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            setWishlistItems(previousItems); // Revert on error
        }
    };

    const removeFromWishlist = async (productId: string) => {
        // Optimistic update
        const previousItems = [...wishlistItems];
        setWishlistItems(prev => prev.filter(item => item.id !== productId));

        try {
            if (isAuthenticated) {
                await wishlistService.removeFromWishlist(productId);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            setWishlistItems(previousItems); // Revert on error
        }
    };

    const toggleWishlist = async (product: Product) => {
        if (isInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    return {
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        refreshWishlist,
    };
};
