"use client";

import React from "react";
import { SideNav } from "./SideNav";
import { Header } from "./Header";
import { ProtectedRoute } from "@/lib/auth/protected-route";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function DashboardLayout({
  children,
  requiredRoles = []
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute requiredRoles={requiredRoles}>
      <div className="flex h-screen w-full flex-col md:flex-row">
        <div className="hidden md:block">
          <SideNav />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
