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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { registrationPlans } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  customerName: z.string().min(1, {
    message: "Vui lòng nhập tên khách hàng.",
  }),
  customerPhone: z.string().min(1, {
    message: "Vui lòng nhập số điện thoại.",
  }),
  customerEmail: z.string().email({
    message: "Vui lòng nhập email hợp lệ.",
  }),
  licensePlate: z.string().min(1, {
    message: "Vui lòng nhập biển số xe.",
  }),
  vehicleType: z.string().min(1, {
    message: "Vui lòng chọn loại xe.",
  }),
  planId: z.string().min(1, {
    message: "Vui lòng chọn gói đăng ký.",
  }),
});

export function RegistrationForm() {
  const [selectedPlan, setSelectedPlan] = useState<typeof registrationPlans[0] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      licensePlate: "",
      vehicleType: "",
      planId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission (API call would go here in a real app)
    console.log(values);

    // Show success state
    setIsSuccess(true);
    toast.success("Đăng ký xe tháng thành công");
  }

  function handleReset() {
    form.reset();
    setSelectedPlan(null);
    setIsSuccess(false);
  }

  function updateSelectedPlan(planId: string) {
    const plan = registrationPlans.find((p) => p.id === planId);
    setSelectedPlan(plan || null);
  }

  if (isSuccess) {
    return (
      <Card className="py-8">
        <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h3 className="text-2xl font-bold">Đăng ký thành công!</h3>
          <p className="text-muted-foreground">
            Thông tin đăng ký của bạn đã được lưu vào hệ thống.
          </p>
          <Button onClick={handleReset}>Đăng ký mới</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin khách hàng</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin xe</h3>
              <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Gói đăng ký</h3>
              <FormField
                control={form.control}
                name="planId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateSelectedPlan(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn gói đăng ký" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {registrationPlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - {formatCurrency(plan.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-2">
        {selectedPlan ? (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium">{selectedPlan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedPlan.description}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Thời hạn:</span>
                  <span className="font-medium">
                    {selectedPlan.duration} ngày
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phí đăng ký:</span>
                  <span className="font-medium">
                    {formatCurrency(selectedPlan.price)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex h-full items-center justify-center p-6 text-center">
              <p className="text-muted-foreground">
                Vui lòng chọn gói đăng ký để xem chi tiết
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
