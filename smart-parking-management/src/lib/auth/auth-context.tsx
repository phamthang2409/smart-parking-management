"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JWTPayload } from "./jwt";
import { toast } from "sonner";
import { users } from "@/lib/data/mockData";

// Define the Auth state type
interface AuthState {
  user: JWTPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Define the Auth context type
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Initialize auth state from local storage when the app loads
  useEffect(() => {
    setIsMounted(true);

    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const userData = JSON.parse(user) as JWTPayload;
          setState({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Login function that would normally call an API
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate an API call using mock data
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Simulate JWT
      const payload: JWTPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // In a real app, we'd use signJWT here
      const token = `mock_token_${Date.now()}`;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(payload));
      }

      // Update state
      setState({
        user: payload,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Đăng nhập thành công");
      return true;
    } else {
      toast.error("Email hoặc mật khẩu không đúng");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    router.push("/");
  };

  // Don't render children until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
