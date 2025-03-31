"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { DataTable } from "@/components/reports/DataTable";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground">
            Xem báo cáo thống kê và doanh thu của bãi xe
          </p>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="transactions">Giao dịch</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê doanh thu</CardTitle>
                <CardDescription>
                  Theo dõi doanh thu theo thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <RevenueChart title="Doanh thu 7 ngày gần đây" />
                  <DataTable />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử giao dịch</CardTitle>
                <CardDescription>
                  Thống kê toàn bộ giao dịch theo khoảng thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
