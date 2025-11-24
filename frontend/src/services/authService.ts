import api from "@/lib/api";

/**
 * User Interface - Frontend representation
 */
export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  wallet?: number;
  role?: string;
  isActive: boolean;
}

/**
 * Auth Response from Backend
 */
interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: any;
    token: string;
  };
  token?: string;
  accessToken?: string;
}

/**
 * OTP Response from Backend
 */
interface OtpResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

/**
 * Authentication Service
 *
 * OTP-based authentication for customer users.
 *
 * Backend Endpoints:
 * - POST /api/auth/send-otp - Send OTP to mobile number
 * - POST /api/auth/verify-otp - Verify OTP and return JWT token
 * - GET /api/auth/profile - Get current user profile (requires token)
 *
 * Status: ✅ Connected to Real Backend API
 */
export const authService = {
  /**
   * Step 1: Request OTP Code
   * Sends OTP to the provided mobile number
   *
   * @param mobile - Mobile number (e.g., "09123456789")
   * @returns Promise with success status and message
   */
  sendOtp: async (mobile: string): Promise<OtpResponse> => {
    try {
      console.log(`[AUTH] Sending OTP to ${mobile}`);

      const response = await api.post("/auth/send-otp", { mobile });

      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      throw new Error(error.response?.data?.message || "خطا در ارسال کد تایید");
    }
  },

  /**
   * Step 2: Verify OTP and Login
   * Verifies the OTP code and returns JWT token
   *
   * @param mobile - Mobile number
   * @param code - OTP code (4 digits)
   * @returns Promise with user data and token
   */
  verifyOtp: async (mobile: string, code: string): Promise<AuthResponse> => {
    try {
      console.log(`[AUTH] Verifying OTP for ${mobile}: ${code}`);

      const response = await api.post("/auth/verify-otp", { mobile, code });

      if (response.data.success && response.data.data?.token) {
        const token = response.data.data.token;
        const user = response.data.data.user;

        // Persist authentication
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Set authorization header
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return response.data;
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      throw new Error(error.response?.data?.message || "کد تایید نامعتبر است");
    }
  },

  /**
   * Get Current User Profile
   * Fetches authenticated user's profile data
   *
   * @returns Promise with user data
   */
  getProfile: async (): Promise<User> => {
    try {
      const token = authService.getToken();

      if (!token) {
        throw new Error("لطفا ابتدا وارد حساب کاربری خود شوید");
      }

      console.log("[AUTH] Fetching user profile");

      const response = await api.get("/auth/profile");
      const userData = response.data.data || response.data;

      // Map backend user to frontend User interface
      return {
        id: userData._id || userData.id,
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email,
        wallet: userData.wallet || 0,
        role: userData.role || "user",
        isActive: userData.isActive !== false,
      };
    } catch (error: any) {
      console.error("Error fetching profile:", error);

      // If unauthorized, clear auth data
      if (error.response?.status === 401) {
        authService.logout();
      }

      throw new Error(error.response?.data?.message || "خطا در دریافت اطلاعات کاربر");
    }
  },

  /**
   * Check if user is authenticated
   * @returns boolean
   */
  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    return !!token;
  },

  /**
   * Get stored authentication token
   * @returns token string or null
   */
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  /**
   * Get stored user data
   * @returns User object or null
   */
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      const userData = JSON.parse(userStr);
      return {
        id: userData._id || userData.id,
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email,
        wallet: userData.wallet || 0,
        role: userData.role || "user",
        isActive: userData.isActive !== false,
      };
    } catch {
      return null;
    }
  },

  /**
   * Logout
   * Clears authentication data and redirects to home
   */
  logout: (): void => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear axios default header
    delete api.defaults.headers.common["Authorization"];

    // Redirect to home
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  },

  /**
   * Initialize auth state
   * Sets up axios interceptor with stored token
   * Call this on app initialization
   */
  initializeAuth: (): void => {
    const token = authService.getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};

// Initialize auth on service load
if (typeof window !== "undefined") {
  authService.initializeAuth();
}
