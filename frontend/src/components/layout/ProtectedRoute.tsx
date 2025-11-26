"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 *
 * Higher-Order Component that protects routes requiring authentication.
 *
 * Features:
 * - Checks for token before rendering children
 * - Shows loading spinner while checking
 * - Redirects to /login if no token found (using router.replace)
 * - Prevents flash of unauthenticated content
 * - Prevents unauthorized API calls from firing
 *
 * Usage:
 * ```tsx
 * <ProtectedRoute>
 *   <YourProtectedPage />
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check synchronously for token in localStorage
    const checkAuth = () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") {
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          // No token found - redirect immediately
          console.log("[ProtectedRoute] No token found, redirecting to login");
          router.replace("/login");
          setIsChecking(false);
          return;
        }

        // Token exists - authorize the user
        console.log("[ProtectedRoute] Token found, authorizing access");
        setIsAuthorized(true);
        setIsChecking(false);
      } catch (error) {
        console.error("[ProtectedRoute] Error checking auth:", error);
        router.replace("/login");
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // While checking authentication, show loading spinner
  if (isChecking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-amber-600 mb-3" size={40} />
        <p className="text-sm text-gray-500">در حال بررسی احراز هویت...</p>
      </div>
    );
  }

  // If not authorized (and not redirecting), show nothing
  if (!isAuthorized) {
    return null;
  }

  // Render the protected content ONLY if authorized
  return <>{children}</>;
}
