// Mock data for demo purposes
import { format, subDays, subHours, addDays } from "date-fns";

// Dashboard stats
export const dashboardStats = {
  totalVehicles: 158,
  vehiclesIn: 116,
  vehiclesOut: 42,
  availableSpaces: 84,
  totalCapacity: 200,
  occupancyRate: 58,
  registeredVehicles: 87,
  dailyRevenue: 8500000,
};

// Vehicle activity data for charts
export const vehicleActivityData = Array.from({ length: 7 }, (_, i) => {
  const date = subDays(new Date(), 6 - i);
  return {
    date: format(date, "dd/MM"),
    vehiclesIn: 100 + Math.floor(Math.random() * 50),
    vehiclesOut: 80 + Math.floor(Math.random() * 40),
  };
});

// Hourly data for today
export const hourlyData = Array.from({ length: 24 }, (_, i) => {
  return {
    hour: `${i}:00`,
    vehicles: i < new Date().getHours()
      ? Math.floor(Math.random() * 30) + 5
      : null,
  };
});

// Revenue data
export const revenueData = Array.from({ length: 7 }, (_, i) => {
  const date = subDays(new Date(), 6 - i);
  return {
    date: format(date, "dd/MM"),
    amount: Math.floor(Math.random() * 5000000) + 5000000,
  };
});

// Vehicles currently in parking lot
export const currentVehicles = Array.from({ length: 20 }, (_, i) => {
  return {
    id: `VEH-${1000 + i}`,
    licensePlate: `${Math.floor(Math.random() * 90) + 10}A-${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 90) + 10}`,
    entryTime: format(subHours(new Date(), Math.floor(Math.random() * 10)), "HH:mm:ss dd/MM/yyyy"),
    parkingSpot: `A-${Math.floor(Math.random() * 100) + 1}`,
    type: i % 3 === 0 ? "Xe máy" : (i % 3 === 1 ? "Ô tô" : "Xe tải"),
    status: "Đang đỗ",
    isMonthly: i % 4 === 0,
  };
});

// Vehicle history
export const vehicleHistory = Array.from({ length: 50 }, (_, i) => {
  const entryDate = subDays(new Date(), Math.floor(Math.random() * 30));
  const exitDate = addDays(entryDate, Math.random() < 0.8 ? Math.random() * 1 : 0);
  const duration = Math.round((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60));

  return {
    id: `VEH-${2000 + i}`,
    licensePlate: `${Math.floor(Math.random() * 90) + 10}A-${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 90) + 10}`,
    entryTime: format(entryDate, "HH:mm:ss dd/MM/yyyy"),
    exitTime: format(exitDate, "HH:mm:ss dd/MM/yyyy"),
    duration: `${duration} giờ`,
    fee: duration * 20000,
    status: "Đã rời đi",
    type: i % 3 === 0 ? "Xe máy" : (i % 3 === 1 ? "Ô tô" : "Xe tải"),
  };
});

// Monthly registrations
export const monthlyRegistrations = Array.from({ length: 15 }, (_, i) => {
  const startDate = subDays(new Date(), Math.floor(Math.random() * 60));
  const endDate = addDays(startDate, 30);

  return {
    id: `REG-${3000 + i}`,
    customerName: `Khách hàng ${i + 1}`,
    customerPhone: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
    licensePlate: `${Math.floor(Math.random() * 90) + 10}A-${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 90) + 10}`,
    vehicleType: i % 3 === 0 ? "Xe máy" : (i % 3 === 1 ? "Ô tô" : "Xe tải"),
    startDate: format(startDate, "dd/MM/yyyy"),
    endDate: format(endDate, "dd/MM/yyyy"),
    plan: i % 3 === 0 ? "Gói tháng" : (i % 3 === 1 ? "Gói quý" : "Gói năm"),
    fee: i % 3 === 0 ? 500000 : (i % 3 === 1 ? 1350000 : 4800000),
    status: new Date() < endDate ? "Hiệu lực" : "Hết hạn",
  };
});

// Users
export const users = [
  {
    id: "USR-001",
    name: "Admin",
    email: "admin@smartparking.com",
    role: "admin",
    password: "admin123",
  },
  {
    id: "USR-002",
    name: "Nhân viên 1",
    email: "staff1@smartparking.com",
    role: "staff",
    password: "staff123",
  },
  {
    id: "USR-003",
    name: "Khách hàng 1",
    email: "customer1@example.com",
    role: "customer",
    password: "customer123",
  },
];
