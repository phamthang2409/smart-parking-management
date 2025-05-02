"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { ParkingSpaceStatus } from "@/components/dashboard/ParkingSpaceStatus";
import { RecentVehicles } from "@/components/dashboard/RecentVehicles";
import { checkInCar } from "../../app/hooks/useCheckInCar";
import { checkOutCar } from "../../app/hooks/useCheckOutCar";
import {
  Car,
  CarFront,
  Clock,
  DollarSign,
  ParkingCircle,
  Users,
} from "lucide-react";
import {
  dashboardStats,
  vehicleActivityData,
  currentVehicles,
} from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const formatMoney = (amount: number) => {
    return formatCurrency(amount, "VND");
  };
  const [currentTime, setCurrentTime] = useState("");
  const [checkInCars, setCheckInCars] = useState<any[]>([]);
  const [checkOutCars, setCheckOutCars] = useState<any[]>([]);

  const fetchDataCheckInCar = async () => {
    const data = await checkInCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      licensePlate: item.licensePlate,
      price: item.price,
      carType: item.carType,
      checkin_images: item.checkin_images,
      checkInTime: item.checkInTime,
      checkOutTime: item.checkOutTime,
    }));
    setCheckInCars(formattedData);
  };

  const fetchDataCheckOutCar = async () => {
    const data = await checkOutCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      licensePlate: item.licensePlate,
      price: item.price,
      carType: item.carType,
      checkOutTime: item.checkOutTime,
    }));
    setCheckOutCars(formattedData);
  };

  useEffect(() => {
    // Set initial time
    const now = new Date();
    setCurrentTime(now.toLocaleString("vi-VN"));

    // Update time every minute
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("vi-VN"));
    }, 60000);

    //Get check in car
    fetchDataCheckInCar();
    //Get check out car
    fetchDataCheckOutCar();

    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Dữ liệu được cập nhật lần cuối: {currentTime}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tổng xe hiện tại"
            value={checkInCars.length}
            icon={Car}
            trend="up"
            trendValue="+10 so với hôm qua"
          />
          <StatCard
            title="Xe đã rời đi"
            value={checkOutCars.length}
            icon={CarFront}
            trend="neutral"
            trendValue="-3 so với hôm qua"
          />
          <StatCard
            title="Doanh thu hôm nay"
            value={formatMoney(dashboardStats.dailyRevenue)}
            icon={DollarSign}
            trend="up"
            trendValue="+15% so với hôm qua"
          />
          <StatCard
            title="Xe đã đăng ký"
            value={dashboardStats.registeredVehicles}
            icon={Users}
            trend="up"
            trendValue="+5 trong tháng này"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <ActivityChart
            data={vehicleActivityData}
            title="Hoạt động xe trong 7 ngày gần đây"
          />
          <ParkingSpaceStatus
            available={dashboardStats.availableSpaces}
            total={dashboardStats.totalCapacity}
          />
          <div className="col-span-1 lg:col-span-6">
            <RecentVehicles vehicles={currentVehicles.slice(0, 10)} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
