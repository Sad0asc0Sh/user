import { useState, useEffect } from 'react';
import { authService, User } from '@/services/authService';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            const currentUser = authService.getUser();

            setIsAuthenticated(isAuth);
            setUser(currentUser);
            setLoading(false);
        };

        checkAuth();

        // Listen for storage events to update state across tabs/windows
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return {
        user,
        isAuthenticated,
        loading,
        login: authService.loginWithPassword,
        logout: authService.logout,
        // Add other methods as needed
    };
};
