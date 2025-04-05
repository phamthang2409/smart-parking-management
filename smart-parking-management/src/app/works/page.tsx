"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import CameraCapture from "@/components/CameraCapture";
import PlateRecognition from "@/components/PlateRecognition";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Component TaskCard để hiển thị công việc
const TaskCard = ({
  title,
  description,
  isCompleted,
}: {
  title: string;
  description: string;
  isCompleted: boolean;
}) => (
  <Card className={isCompleted ? "bg-green-50" : "bg-yellow-50"}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{isCompleted ? "Công việc đã hoàn thành." : "Công việc đang thực hiện."}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [tasks] = useState([
    { title: "Công việc 1", description: "Mô tả công việc 1", isCompleted: false },
    { title: "Công việc 2", description: "Mô tả công việc 2", isCompleted: true },
    { title: "Công việc 3", description: "Mô tả công việc 3", isCompleted: false },
  ]);

  const [image, setImage] = useState<string | null>(null);
  const vehicleData = {
    plateNumber: "76A-123.45",
    time: "07:30",
    type: "Tháng",
    ticketNumber: "T123456",
    ownerName: "Nguyễn Văn A",
    dateOfBirth: "01/01/1990",
    expiryDate: "01/01/2026",
    address: "Quảng Ngãi",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Công việc</h1>
        </div>

        <Tabs defaultValue="vehicle-info" className="w-full">
          <TabsList>
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="tasks">Bãi giữ xe</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicle-info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Thông tin biển số và chi tiết */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Biển số xe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{vehicleData.plateNumber}</p>
                  </CardContent>
                </Card>

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
              </div>

              {/* Camera chụp và nhận diện */}
              <Card className="bg-blue-50 w-full md:w-[500px]">
                <CardHeader>
                  <CardTitle>Quét biển số xe</CardTitle>
                  <CardDescription>Chụp và nhận diện biển số bằng camera máy tính</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CameraCapture onCapture={setImage} />
                </CardContent>
              </Card>
              <Card className="bg-blue-50 w-full md:w-[500px]">
                <CardHeader>
                  <CardTitle>Quét biển số xe</CardTitle>                  
                </CardHeader>
                <CardContent className="space-y-4">
                  {image && <PlateRecognition image={image} />}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

         
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.isCompleted}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
