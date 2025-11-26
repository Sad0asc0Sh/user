"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * Google OAuth Provider Wrapper
 *
 * Wraps the application with GoogleOAuthProvider for Google authentication.
 * Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.
 */
export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.warn("[GOOGLE AUTH] NEXT_PUBLIC_GOOGLE_CLIENT_ID not configured");
    // Return children without Google OAuth if client ID is not configured
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
