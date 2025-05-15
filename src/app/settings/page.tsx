"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserManagement } from "@/components/settings/UserManagement";
import { SystemSettings } from "@/components/settings/SystemSettings";
import { userRoles } from "@/lib/constants";

export default function SettingsPage() {
  return (
    <DashboardLayout requiredRoles={[userRoles.ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
          <p className="text-muted-foreground">
            Quản lý người dùng và cấu hình hệ thống
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="users">Quản lý tài khoản</TabsTrigger>
            <TabsTrigger value="system">Cài đặt hệ thống</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý tài khoản</CardTitle>
                <CardDescription>
                  Thêm, sửa, xóa tài khoản người dùng và phân quyền
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hệ thống</CardTitle>
                <CardDescription>
                  Cấu hình các thông số và cài đặt cho hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
