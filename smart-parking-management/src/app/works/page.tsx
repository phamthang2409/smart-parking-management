"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Dữ liệu mô phỏng từ hình ảnh
const vehicleData = {
  plateNumber: "30-X6-4617",
  time: "17:25 16/11/2012",
  type: "Xe máy",
  ticketNumber: "XM0033",
  images: [
    "/path/to/image1.jpg", // Thay thế bằng đường dẫn ảnh thực tế
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
  ],
  ownerName: "BUI ANH TUAN",
  dateOfBirth: "2008",
  expiryDate: "01/02/2013",
  address: "AIRBLADE 05/6/2012",
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { title: "Công việc 1", description: "Mô tả công việc 1", isCompleted: false },
    { title: "Công việc 2", description: "Mô tả công việc 2", isCompleted: true },
    { title: "Công việc 3", description: "Mô tả công việc 3", isCompleted: false },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Thông Tin Biển Số Xe</h1>
          <div className="text-sm text-muted-foreground">
            {/* Thêm thông tin phụ nếu cần */}
          </div>
        </div>

        {/* Tabs Component */}
        <Tabs defaultValue="vehicle-info" className="w-full">
          <TabsList>
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="tasks">Công việc</TabsTrigger>
          </TabsList>

          {/* Tab Content for Vehicle Info */}
          <TabsContent value="vehicle-info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin biển số xe */}
              <Card>
                <CardHeader>
                  <CardTitle>Biển số xe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{vehicleData.plateNumber}</p>
                </CardContent>
              </Card>

              {/* Thông tin chi tiết */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Giờ vào:</strong> {vehicleData.time}</p>
                  <p><strong>Loại vé:</strong> {vehicleData.type}</p>
                  <p><strong>Vé:</strong> {vehicleData.ticketNumber}</p>
                  <p><strong>Tên chủ xe:</strong> {vehicleData.ownerName}</p>
                  <p><strong>Ngày sinh:</strong> {vehicleData.dateOfBirth}</p>
                  <p><strong>Ngày hết hạn:</strong> {vehicleData.expiryDate}</p>
                  <p><strong>Địa chỉ:</strong> {vehicleData.address}</p>
                </CardContent>
              </Card>

              {/* Hình ảnh xe */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Hình ảnh xe</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vehicleData.images.map((img, index) => (
                    <Image key={index} src={img} alt={`Hình ảnh xe ${index + 1}`} width={200} height={150} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Content for Tasks */}
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{task.isCompleted ? "Công việc đã hoàn thành." : "Công việc đang thực hiện."}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}