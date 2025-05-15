"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

const formSchema = z.object({
  licensePlate: z.string().min(1, {
    message: "Vui lòng nhập biển số xe.",
  }),
  vehicleType: z.string().min(1, {
    message: "Vui lòng chọn loại xe.",
  }),
  driverName: z.string().optional(),
  driverPhone: z.string().optional(),
  parkingSpot: z.string().min(1, {
    message: "Vui lòng nhập vị trí đỗ xe.",
  }),
  notes: z.string().optional(),
});

export function VehicleCheckInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
      vehicleType: "",
      driverName: "",
      driverPhone: "",
      parkingSpot: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission (API call would go here in a real app)
    console.log(values);

    // Show success toast and reset form
    toast.success(`Xe ${values.licensePlate} đã được ghi nhận vào bãi thành công`);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biển số xe *</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập biển số xe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại xe *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại xe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Xe máy">Xe máy</SelectItem>
                    <SelectItem value="Ô tô">Ô tô</SelectItem>
                    <SelectItem value="Xe tải">Xe tải</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên người lái</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người lái (nếu có)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại (nếu có)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="parkingSpot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vị trí đỗ xe *</FormLabel>
              <FormControl>
                <Input placeholder="Nhập vị trí đỗ xe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Input placeholder="Nhập ghi chú (nếu có)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Ghi nhận xe vào bãi</Button>
        </div>
      </form>
    </Form>
  );
}
