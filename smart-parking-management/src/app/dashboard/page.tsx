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
import { dashboardStats, currentVehicles } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";
import { registrationCar } from "../hooks/useRegistrationCar";
import { format, subDays } from "date-fns";

export default function DashboardPage() {
  const formatMoney = (amount: number) => {
    return formatCurrency(amount, "VND");
  };
  const [currentTime, setCurrentTime] = useState("");
  const [checkInCars, setCheckInCars] = useState<any[]>([]);
  const [checkOutCars, setCheckOutCars] = useState<any[]>([]);
  const [registeredCars, setRegisteredCars] = useState<any[]>([]);
  const [receipts, setReceipts] = useState(0);

  const allSlots = Array.from("ABCDEFGHIKL".split("")).flatMap((row) =>
    [1, 2, 3, 4].map((col) => `${row}${col}`)
  );

  const totalSlots = allSlots.length;

  const fetchDataRegisteredCar = async () => {
    const data = await registrationCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      customerName: item.customerName,
      licensePlate: item.licensePlate,
      carName: item.carName,
      packageName: item.packageName,
      startDate: item.startDate,
      endDate: item.endDate,
      state: item.state,
    }));
    setRegisteredCars(formattedData);
  };

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

  // Vehicle activity data for charts
  const vehicleActivityData = Array.from({ length: 7 }, (_, i) => {
    const dateObj = subDays(new Date(), 6 - i);
    const dateKey = format(dateObj, "yyyy-MM-dd"); // Key chuẩn để so sánh
    const displayDate = format(dateObj, "dd/MM"); // Để hiển thị

    // Đếm số xe check-in trong ngày
    const vehiclesIn = checkInCars.filter((car) => {
      const checkInDate = car.checkInTime
        ? format(new Date(car.checkInTime), "yyyy-MM-dd")
        : null;
      return checkInDate === dateKey;
    }).length;

    // Đếm số xe check-out trong ngày
    const vehiclesOut = checkOutCars.filter((car) => {
      const checkOutDate = car.checkOutTime
        ? format(new Date(car.checkOutTime), "yyyy-MM-dd")
        : null;
      return checkOutDate === dateKey;
    }).length;

    return {
      date: displayDate,
      vehiclesIn,
      vehiclesOut,
    };
  });

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
    //Get registered car
    fetchDataRegisteredCar();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate total receipt when checkOutCars changes
    const receiptActivity = checkOutCars.reduce(
      (total, car) => total + car.price,
      0
    );
    setReceipts(receiptActivity);
  }, [checkOutCars]);

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
            value={formatMoney(receipts)}
            icon={DollarSign}
            trend="up"
            trendValue="+15% so với hôm qua"
          />
          <StatCard
            title="Xe đã đăng ký"
            value={registeredCars.length}
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
            available={totalSlots - checkInCars.length}
            total={totalSlots}
          />
          <div className="col-span-1 lg:col-span-6">
            <RecentVehicles vehicles={currentVehicles.slice(0, 10)} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
