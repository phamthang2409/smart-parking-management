"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/registrations/RegistrationForm";
import { RegistrationsList } from "@/components/registrations/RegistrationsList";

export default function RegistrationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Đăng ký xe tháng</h1>
          <p className="text-muted-foreground">
            Quản lý đăng ký xe tháng và xem danh sách xe đã đăng ký
          </p>
        </div>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="new">Đăng ký mới</TabsTrigger>
            <TabsTrigger value="list">Danh sách đã đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Đăng ký xe tháng</CardTitle>
                <CardDescription>
                  Đăng ký gửi xe theo gói tháng, quý hoặc năm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách xe đăng ký</CardTitle>
                <CardDescription>
                  Quản lý danh sách xe đã đăng ký gửi theo tháng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
