// src/contexts/auth-context.tsx
"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { User, AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIXED: Use import.meta.env for Vite instead of process.env
const DJANGO_API_BASE =
  import.meta.env.VITE_DJANGO_API_URL || "http://localhost:8000";

const API_ENDPOINTS = {
  LOGIN: "/api/auth/login/",
  LOGOUT: "/api/auth/logout/",
  REGISTER: "/api/auth/register/",
  USER_PROFILE: "/api/auth/user/",
  REFRESH_TOKEN: "/api/auth/token/refresh/",
};

// ... rest of your code remains the same;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("central-stores-user");
    const authToken = localStorage.getItem("central-stores-token");
    const refreshToken = localStorage.getItem("central-stores-refresh-token");

    if (savedUser && authToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);

        // Verify token is still valid by fetching user profile
        verifyTokenAndFetchUserProfile(authToken);
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        clearAuthStorage();
      }
    }
  }, []);

  const clearAuthStorage = () => {
    localStorage.removeItem("central-stores-user");
    localStorage.removeItem("central-stores-token");
    localStorage.removeItem("central-stores-refresh-token");
    setUser(null);
  };

  const verifyTokenAndFetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(
        `${DJANGO_API_BASE}${API_ENDPOINTS.USER_PROFILE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Token validation failed");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Token verification failed:", err);
      clearAuthStorage();
    }
  };

  const handleDjangoLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${DJANGO_API_BASE}${API_ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || errorData.message || "Login failed"
        );
      }

      const data = await response.json();

      // Django might return different response structures:
      // Option 1: { access: "token", refresh: "refresh-token", user: {...} }
      // Option 2: { token: "token", user: {...} }
      // Option 3: { key: "token" } (DRF token auth)

      const authToken = data.access || data.token || data.key;
      const refreshToken = data.refresh;
      const userData = data.user || data;

      if (!authToken) {
        throw new Error("No authentication token received");
      }

      // Store tokens and user data
      localStorage.setItem("central-stores-token", authToken);
      if (refreshToken) {
        localStorage.setItem("central-stores-refresh-token", refreshToken);
      }
      localStorage.setItem("central-stores-user", JSON.stringify(userData));

      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      throw new Error(errorMessage);
    }
  };

  const handleDjangoRegister = async (userData: any) => {
    try {
      const response = await fetch(
        `${DJANGO_API_BASE}${API_ENDPOINTS.REGISTER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || errorData.message || "Registration failed"
        );
      }

      const data = await response.json();

      // Django registration might return user data directly or require subsequent login
      if (data.user || data.id) {
        // If user data is returned, store it and log the user in
        const userData = data.user || data;
        localStorage.setItem("central-stores-user", JSON.stringify(userData));
        setUser(userData);
        return userData;
      } else {
        // If only success message, require manual login
        return {
          success: true,
          message: "Registration successful. Please login.",
        };
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("central-stores-refresh-token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch(
        `${DJANGO_API_BASE}${API_ENDPOINTS.REFRESH_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newAuthToken = data.access;

      if (newAuthToken) {
        localStorage.setItem("central-stores-token", newAuthToken);
        return newAuthToken;
      } else {
        throw new Error("No access token received from refresh");
      }
    } catch (err) {
      clearAuthStorage();
      throw err;
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    console.log("Starting Django login process for:", credentials.username);
    setLoading(true);
    setError(null);

    try {
      const userData = await handleDjangoLogin(credentials);
      console.log("Django login successful, user role:", userData.role);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.";
      console.error("Django login failed:", errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    console.log("Starting Django registration process for:", userData.username);
    setLoading(true);
    setError(null);

    try {
      const result = await handleDjangoRegister(userData);
      console.log("Django registration successful");
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      console.error("Django registration failed:", errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("central-stores-token");

      // Call Django logout endpoint if token exists
      if (token) {
        await fetch(`${DJANGO_API_BASE}${API_ENDPOINTS.LOGOUT}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).catch((err) => {
          console.warn("Logout API call failed:", err);
          // Continue with client-side cleanup even if API call fails
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuthStorage();
      console.log("User logged out");
    }
  };

  // Add this method for making authenticated API calls
  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ) => {
    let token = localStorage.getItem("central-stores-token");

    if (!token) {
      throw new Error("No authentication token available");
    }

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${DJANGO_API_BASE}${url}`, requestOptions);

      // If token is expired, try to refresh it
      if (response.status === 401) {
        try {
          const newToken = await refreshAuthToken();
          requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // Retry the request with new token
          const retryResponse = await fetch(
            `${DJANGO_API_BASE}${url}`,
            requestOptions
          );
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          return retryResponse;
        } catch (refreshError) {
          clearAuthStorage();
          throw new Error("Session expired. Please login again.");
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (err) {
      console.error("Authenticated request failed:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user, // Add this line
        login,
        register,
        logout,
        loading,
        error,
        makeAuthenticatedRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
