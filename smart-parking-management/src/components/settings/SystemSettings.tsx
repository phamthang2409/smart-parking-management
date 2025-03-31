"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function SystemSettings() {
  const [parkingFees, setParkingFees] = useState({
    motorcycle: {
      hourly: 5000,
      daily: 50000,
    },
    car: {
      hourly: 20000,
      daily: 200000,
    },
    truck: {
      hourly: 30000,
      daily: 300000,
    },
  });

  const [generalSettings, setGeneralSettings] = useState({
    parkingCapacity: 200,
    reservedSlotsPercentage: 15,
    enableAutoCheckout: true,
    notificationEnabled: true,
    backupFrequency: "daily",
    businessHours: "06:00 - 22:00",
  });

  const [securitySettings, setSecuritySettings] = useState({
    requirePhotosOnEntry: true,
    storeDataDays: 90,
    allowManualOverride: true,
    twoFactorEnabled: false,
  });

  const handleSaveParkingFees = () => {
    // Here would be an API call to save the parking fees
    toast.success("Đã lưu cấu hình phí gửi xe");
  };

  const handleSaveGeneralSettings = () => {
    // Here would be an API call to save the general settings
    toast.success("Đã lưu cài đặt chung");
  };

  const handleSaveSecuritySettings = () => {
    // Here would be an API call to save the security settings
    toast.success("Đã lưu cài đặt bảo mật");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cấu hình phí gửi xe</h3>
        <p className="text-sm text-muted-foreground">
          Thiết lập mức phí gửi xe cho từng loại phương tiện
        </p>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Xe máy (giờ)</label>
              <Input
                type="number"
                value={parkingFees.motorcycle.hourly}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    motorcycle: {
                      ...parkingFees.motorcycle,
                      hourly: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Xe máy (ngày)</label>
              <Input
                type="number"
                value={parkingFees.motorcycle.daily}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    motorcycle: {
                      ...parkingFees.motorcycle,
                      daily: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ô tô (giờ)</label>
              <Input
                type="number"
                value={parkingFees.car.hourly}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    car: {
                      ...parkingFees.car,
                      hourly: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ô tô (ngày)</label>
              <Input
                type="number"
                value={parkingFees.car.daily}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    car: {
                      ...parkingFees.car,
                      daily: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Xe tải (giờ)</label>
              <Input
                type="number"
                value={parkingFees.truck.hourly}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    truck: {
                      ...parkingFees.truck,
                      hourly: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Xe tải (ngày)</label>
              <Input
                type="number"
                value={parkingFees.truck.daily}
                onChange={(e) =>
                  setParkingFees({
                    ...parkingFees,
                    truck: {
                      ...parkingFees.truck,
                      daily: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveParkingFees}>Lưu cấu hình phí</Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Cài đặt chung</h3>
        <p className="text-sm text-muted-foreground">
          Thiết lập các thông số chung cho hệ thống
        </p>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sức chứa bãi đỗ xe</label>
              <Input
                type="number"
                value={generalSettings.parkingCapacity}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    parkingCapacity: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tỷ lệ vị trí đặt trước (%)</label>
              <Input
                type="number"
                value={generalSettings.reservedSlotsPercentage}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    reservedSlotsPercentage: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Thời gian hoạt động</label>
              <Input
                value={generalSettings.businessHours}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    businessHours: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tần suất sao lưu dữ liệu</label>
              <Input
                value={generalSettings.backupFrequency}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    backupFrequency: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-checkout"
                checked={generalSettings.enableAutoCheckout}
                onCheckedChange={(checked) =>
                  setGeneralSettings({
                    ...generalSettings,
                    enableAutoCheckout: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="auto-checkout"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bật tự động checkout khi xe rời bãi
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notification"
                checked={generalSettings.notificationEnabled}
                onCheckedChange={(checked) =>
                  setGeneralSettings({
                    ...generalSettings,
                    notificationEnabled: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="notification"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bật thông báo qua SMS và email
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveGeneralSettings}>Lưu cài đặt chung</Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Cài đặt bảo mật</h3>
        <p className="text-sm text-muted-foreground">
          Thiết lập các thông số bảo mật cho hệ thống
        </p>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Thời gian lưu trữ dữ liệu (ngày)</label>
              <Input
                type="number"
                value={securitySettings.storeDataDays}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    storeDataDays: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="photos-entry"
                checked={securitySettings.requirePhotosOnEntry}
                onCheckedChange={(checked) =>
                  setSecuritySettings({
                    ...securitySettings,
                    requirePhotosOnEntry: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="photos-entry"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Yêu cầu chụp ảnh khi xe vào bãi
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manual-override"
                checked={securitySettings.allowManualOverride}
                onCheckedChange={(checked) =>
                  setSecuritySettings({
                    ...securitySettings,
                    allowManualOverride: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="manual-override"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cho phép nhân viên ghi đè thủ công
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="two-factor"
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={(checked) =>
                  setSecuritySettings({
                    ...securitySettings,
                    twoFactorEnabled: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="two-factor"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bật xác thực hai yếu tố cho tài khoản quản trị
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSecuritySettings}>Lưu cài đặt bảo mật</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
