"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { currentVehicles } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  licensePlate: z.string().min(1, {
    message: "Vui lòng nhập biển số xe.",
  }),
});

interface VehicleInfo {
  id: string;
  licensePlate: string;
  entryTime: string;
  parkingSpot: string;
  type: string;
  status: string;
  isMonthly: boolean;
  fee?: number;
}

export function VehicleCheckOutForm() {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
    },
  });

  function onSearch(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call
    const foundVehicle = currentVehicles.find(
      (v) => v.licensePlate.toLowerCase() === values.licensePlate.toLowerCase()
    );

    setSearchPerformed(true);

    if (foundVehicle) {
      // Calculate parking fee (random value for demo)
      const hours = Math.floor(Math.random() * 10) + 1;
      const fee = foundVehicle.isMonthly ? 0 : hours * 20000;

      setVehicleInfo({
        ...foundVehicle,
        fee,
      });
    } else {
      setVehicleInfo(null);
      toast.error(`Không tìm thấy xe với biển số ${values.licensePlate}`);
    }
  }

  function handleCheckout() {
    if (vehicleInfo) {
      // In a real app, this would be an API call to record the checkout
      toast.success(`Xe ${vehicleInfo.licensePlate} đã rời bãi`);
      setVehicleInfo(null);
      setSearchPerformed(false);
      form.reset();
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biển số xe</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập biển số xe cần tìm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">Tìm kiếm</Button>
            </div>
          </div>
        </form>
      </Form>

      {searchPerformed && vehicleInfo && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Biển số</p>
                <p className="font-medium">{vehicleInfo.licensePlate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Loại xe</p>
                <p className="font-medium">{vehicleInfo.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Thời gian vào</p>
                <p className="font-medium">{vehicleInfo.entryTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vị trí đỗ</p>
                <p className="font-medium">{vehicleInfo.parkingSpot}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge>{vehicleInfo.status}</Badge>
                {vehicleInfo.isMonthly && (
                  <Badge variant="outline" className="ml-2 bg-blue-50">
                    Xe tháng
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phí gửi xe</p>
                <p className="font-medium">
                  {vehicleInfo.isMonthly
                    ? "Đã thanh toán tháng"
                    : formatCurrency(vehicleInfo.fee || 0)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleCheckout}>
                Ghi nhận xe ra bãi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {searchPerformed && !vehicleInfo && (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground">
            Không tìm thấy xe với biển số đã nhập
          </p>
        </div>
      )}
    </div>
  );
}
