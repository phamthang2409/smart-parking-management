"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({
  children,
  requiredRoles = []
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      router.push("/");
      return;
    }

    // Check role-based access if requiredRoles is provided
    if (!isLoading && isAuthenticated && user && requiredRoles.length > 0) {
      if (!requiredRoles.includes(user.role)) {
        toast.error("Bạn không có quyền truy cập vào trang này");
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRoles, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Show children only if authenticated and has required role
  if (isAuthenticated) {
    if (requiredRoles.length === 0 || (user && requiredRoles.includes(user.role))) {
      return <>{children}</>;
    }
  }

  // Otherwise return null (in case of redirect logic not completing yet)
  return null;
}
