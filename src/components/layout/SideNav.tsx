"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

type IconType = keyof typeof Icons;

export function SideNav() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="flex h-full w-[260px] flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Icons.CircleParking className="h-5 w-5 text-primary" />
          <span>Smart Parking</span>
        </Link>
      </div>

      {user && (
        <div className="border-b py-4 px-6">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-xs">
            <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
              {user.role === "admin" ? "Quản trị viên" : user.role === "staff" ? "Nhân viên" : "Khách hàng"}
            </span>
          </p>
        </div>
      )}

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => {
            const IconComponent = Icons[item.icon as IconType] as LucideIcon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => logout()}
        >
          <Icons.LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
