// Site configuration
export const siteConfig = {
  name: "Smart Parking",
  description: "Hệ thống quản lý bãi xe thông minh",
};

// Navigation
export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "layout-dashboard",
  },
  {
    title: "Quản lý xe",
    href: "/vehicles",
    icon: "car",
  },
  {
    title: "Đăng ký xe tháng",
    href: "/registrations",
    icon: "calendar",
  },
  {
    title: "Báo cáo & Thống kê",
    href: "/reports",
    icon: "bar-chart-2",
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: "settings",
  },
];

// User roles
export const userRoles = {
  ADMIN: "admin",
  STAFF: "staff",
  CUSTOMER: "customer",
};

// Vehicle statuses
export const vehicleStatuses = {
  PARKED: "Đang đỗ",
  LEFT: "Đã rời đi",
  REGISTERED: "Đã đăng ký",
  EXPIRED: "Hết hạn",
};

// Registration plans
export const registrationPlans = [
  {
    id: "monthly",
    name: "Gói tháng",
    price: 500000,
    duration: 30,
    description: "Đăng ký gửi xe trong 1 tháng",
  },
  {
    id: "quarterly",
    name: "Gói quý",
    price: 1350000,
    duration: 90,
    description: "Đăng ký gửi xe trong 3 tháng",
  },
  {
    id: "yearly",
    name: "Gói năm",
    price: 4800000,
    duration: 365,
    description: "Đăng ký gửi xe trong 1 năm",
  },
];

// Dashboard demo data
export const parkingLotCapacity = 200;
export const parkingSpaceAvailable = 42;
