"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleCheckInForm } from "@/components/vehicles/VehicleCheckInForm";
import { VehicleCheckOutForm } from "@/components/vehicles/VehicleCheckOutForm";
import { VehicleHistoryTable } from "@/components/vehicles/VehicleHistoryTable";

export default function VehiclesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý xe</h1>
          <p className="text-muted-foreground">
            Ghi nhận xe vào/ra và xem lịch sử ra vào của xe
          </p>
        </div>

        <Tabs defaultValue="check-in" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="check-in">Xe vào bãi</TabsTrigger>
            <TabsTrigger value="check-out">Xe ra bãi</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
          </TabsList>

          <TabsContent value="check-in" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ghi nhận xe vào bãi</CardTitle>
                <CardDescription>
                  Nhập thông tin xe vào bãi để ghi nhận
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleCheckInForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="check-out" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ghi nhận xe ra bãi</CardTitle>
                <CardDescription>
                  Tìm kiếm xe theo biển số và ghi nhận ra bãi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleCheckOutForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử ra vào</CardTitle>
                <CardDescription>
                  Lịch sử các xe đã vào và ra khỏi bãi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleHistoryTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
