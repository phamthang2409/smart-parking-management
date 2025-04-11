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

type SlotStatus = "booked" | "selected" | "regular" | "vip" | "sweetbox" | "center";

const ParkingSlot = ({ label, status }: { label: string; status: SlotStatus }) => {
  const isRed = ["booked", "selected", "vip", "sweetbox", "center"].includes(status);
  return (
    <div
      className={`w-24 h-12 text-base rounded-md flex items-center justify-center text-white 
      ${isRed ? "bg-red-500" : "bg-green-600"}`}
    >
      {label}
    </div>
  );
};

const getStatus = (label: string): SlotStatus => {
  const booked = ["A3", "G1", "H1", "K4"];
  const center = ["H2", "H3", "I2", "I3"];
  const vip = ["E", "F", "G", "H", "I", "J", "K", "L"];
  if (booked.includes(label)) return "booked";
  if (center.includes(label)) return "center";
  if (vip.some((row) => label.startsWith(row))) return "vip";
  return "regular";
};


export default function DashboardPage() {

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

          {/* THÔNG TIN XE */}
          <TabsContent value="vehicle-info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin vé xe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Giờ vào:</strong> {vehicleData.time}</p>
                    <p><strong>Vé:</strong> {vehicleData.ticketNumber}</p>
                  </CardContent>
                </Card>
              </div>

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
                  <CardTitle>Nhận diện biển số</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {image && <PlateRecognition image={image} />}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* BÃI GIỮ XE */}
          <TabsContent value="tasks">
            <div className="w-full h-[85vh] flex flex-col items-center justify-start space-y-6 p-4 relative">
              <div className="w-full flex justify-between text-lg font-semibold text-red-600 px-8">
                <div className="border border-red-500 px-6 py-2 rounded">Lối ra</div>
                <div className="border border-red-500 px-6 py-2 rounded">Lối Ra</div>
              </div>

              <div className="flex flex-row justify-center items-center gap-24 flex-1 w-full">
                {/* Bên trái */}
                <div className="flex flex-col space-y-4">
                  {["A", "B", "C", "D", "E", "F"].map((row) => (
                    <div key={row} className="flex space-x-4">
                      {[1, 2, 3, 4].map((col) => {
                        const label = `${row}${col}`;
                        return (
                          <ParkingSlot
                            key={label}
                            label={label}
                            status={getStatus(label)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Lối vào */}
                <div className="flex items-end justify-center h-full">
                <div className="border border-red-500 px-4 py-20 rounded text-red-600 text-xl font-semibold rotate-360">
                  Lối vào
                </div>
</div>


                {/* Bên phải */}
                <div className="flex flex-col space-y-4">
                  {["G", "H", "I", "J", "K", "L"].map((row) => (
                    <div key={row} className="flex space-x-4">
                      {[1, 2, 3, 4].map((col) => {
                        const label = `${row}${col}`;
                        return (
                          <ParkingSlot
                            key={label}
                            label={label}
                            status={getStatus(label)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
