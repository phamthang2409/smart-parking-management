import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { checkInCar } from "@/app/hooks/useCheckInCar";
import { checkOutCar } from "@/app/hooks/useCheckOutCar";

interface RevenueChartProps {
  title: string;
}

// Dữ liệu biểu đồ doanh thu
export function RevenueChart({ title }: RevenueChartProps) {
  const [vehicleActivityData, setVehicleActivityData] = useState<any[]>([]);
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
    //Get check in car
    fetchDataCheckInCar();
    //Get check out car
    fetchDataCheckOutCar();
    //Get registered car
  }, []);

  // Tính doanh thu và các thông tin xe check-in/check-out trong 7 ngày
  useEffect(() => {
    const data = Array.from({ length: 7 }, (_, i) => {
      const dateObj = subDays(new Date(), 6 - i);
      const dateKey = format(dateObj, "yyyy-MM-dd"); // Key chuẩn để so sánh
      const displayDate = format(dateObj, "dd/MM"); // Để hiển thị

      // Tính doanh thu trong ngày từ check-out
      const dailyRevenue = checkOutCars
        .filter((car) => {
          const checkOutDate = car.checkOutTime
            ? format(new Date(car.checkOutTime), "yyyy-MM-dd")
            : null;
          return checkOutDate === dateKey;
        })
        .reduce((total, car) => total + car.price, 0); // Tính tổng doanh thu

      return {
        date: displayDate,
        dailyRevenue, // Doanh thu trong ngày
      };
    });

    setVehicleActivityData(data);
  }, [checkInCars, checkOutCars]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const tooltipFormatter = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={vehicleActivityData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Area
                type="monotone"
                dataKey="dailyRevenue" // Dùng dữ liệu doanh thu trong biểu đồ
                name="Doanh thu"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
