"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash, Save } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

// Định nghĩa loại xe
export interface VehicleType {
  id: string;
  name: string;
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  quarterlyRate: number;
  yearlyRate: number;
  active: boolean;
}

// Dữ liệu mẫu về loại xe
const initialVehicleTypes: VehicleType[] = [
  {
    id: "motorcycle",
    name: "Xe máy",
    hourlyRate: 5000,
    dailyRate: 50000,
    monthlyRate: 500000,
    quarterlyRate: 1350000,
    yearlyRate: 4800000,
    active: true,
  },
  {
    id: "car-small",
    name: "Ô tô dưới 7 chỗ",
    hourlyRate: 20000,
    dailyRate: 200000,
    monthlyRate: 2000000,
    quarterlyRate: 5400000,
    yearlyRate: 19200000,
    active: true,
  },
  {
    id: "car-large",
    name: "Ô tô từ 7 chỗ trở lên",
    hourlyRate: 25000,
    dailyRate: 250000,
    monthlyRate: 2500000,
    quarterlyRate: 6750000,
    yearlyRate: 24000000,
    active: true,
  },
  {
    id: "truck",
    name: "Xe tải",
    hourlyRate: 30000,
    dailyRate: 300000,
    monthlyRate: 3000000,
    quarterlyRate: 8100000,
    yearlyRate: 28800000,
    active: true,
  },
];

// Schema xác thực form
const vehicleTypeSchema = z.object({
  name: z.string().min(1, "Tên loại xe không được để trống"),
  hourlyRate: z.coerce.number().min(0, "Giá theo giờ không được âm"),
  dailyRate: z.coerce.number().min(0, "Giá theo ngày không được âm"),
  monthlyRate: z.coerce.number().min(0, "Giá gói tháng không được âm"),
  quarterlyRate: z.coerce.number().min(0, "Giá gói quý không được âm"),
  yearlyRate: z.coerce.number().min(0, "Giá gói năm không được âm"),
  active: z.boolean().default(true),
});

type VehicleTypeFormValues = z.infer<typeof vehicleTypeSchema>;

export function VehicleTypeManager() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(initialVehicleTypes);
  const [editingType, setEditingType] = useState<VehicleType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form cho thêm/sửa loại xe
  const form = useForm<VehicleTypeFormValues>({
    resolver: zodResolver(vehicleTypeSchema),
    defaultValues: {
      name: "",
      hourlyRate: 0,
      dailyRate: 0,
      monthlyRate: 0,
      quarterlyRate: 0,
      yearlyRate: 0,
      active: true,
    },
  });

  // Mở dialog để thêm loại xe mới
  const handleAddNew = () => {
    setEditingType(null);
    form.reset({
      name: "",
      hourlyRate: 0,
      dailyRate: 0,
      monthlyRate: 0,
      quarterlyRate: 0,
      yearlyRate: 0,
      active: true,
    });
    setIsDialogOpen(true);
  };

  // Mở dialog để chỉnh sửa loại xe
  const handleEdit = (vehicleType: VehicleType) => {
    setEditingType(vehicleType);
    form.reset({
      name: vehicleType.name,
      hourlyRate: vehicleType.hourlyRate,
      dailyRate: vehicleType.dailyRate,
      monthlyRate: vehicleType.monthlyRate,
      quarterlyRate: vehicleType.quarterlyRate,
      yearlyRate: vehicleType.yearlyRate,
      active: vehicleType.active,
    });
    setIsDialogOpen(true);
  };

  // Xử lý khi submit form
  const onSubmit = (values: VehicleTypeFormValues) => {
    if (editingType) {
      // Cập nhật loại xe đã tồn tại
      setVehicleTypes(
        vehicleTypes.map((type) =>
          type.id === editingType.id
            ? { ...type, ...values }
            : type
        )
      );
      toast.success(`Đã cập nhật loại xe "${values.name}"`);
    } else {
      // Thêm loại xe mới
      const newId = `vehicle-${Date.now()}`;
      setVehicleTypes([
        ...vehicleTypes,
        {
          id: newId,
          ...values,
        },
      ]);
      toast.success(`Đã thêm loại xe "${values.name}"`);
    }
    setIsDialogOpen(false);
  };

  // Xử lý xóa loại xe
  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa loại xe này?")) {
      setVehicleTypes(vehicleTypes.filter((type) => type.id !== id));
      toast.success("Đã xóa loại xe");
    }
  };

  // Xử lý thay đổi trạng thái active
  const toggleActive = (id: string) => {
    setVehicleTypes(
      vehicleTypes.map((type) =>
        type.id === id ? { ...type, active: !type.active } : type
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Quản lý loại xe</h3>
        <Button size="sm" onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm loại xe
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên loại xe</TableHead>
              <TableHead>Giá theo giờ</TableHead>
              <TableHead>Giá theo ngày</TableHead>
              <TableHead>Gói tháng</TableHead>
              <TableHead>Gói quý</TableHead>
              <TableHead>Gói năm</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleTypes.map((vehicleType) => (
              <TableRow key={vehicleType.id}>
                <TableCell className="font-medium">{vehicleType.name}</TableCell>
                <TableCell>{formatCurrency(vehicleType.hourlyRate)}</TableCell>
                <TableCell>{formatCurrency(vehicleType.dailyRate)}</TableCell>
                <TableCell>{formatCurrency(vehicleType.monthlyRate)}</TableCell>
                <TableCell>{formatCurrency(vehicleType.quarterlyRate)}</TableCell>
                <TableCell>{formatCurrency(vehicleType.yearlyRate)}</TableCell>
                <TableCell>
                  <Button
                    variant={vehicleType.active ? "outline" : "ghost"}
                    size="sm"
                    onClick={() => toggleActive(vehicleType.id)}
                    className={
                      vehicleType.active
                        ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
                    }
                  >
                    {vehicleType.active ? "Đang sử dụng" : "Không sử dụng"}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(vehicleType)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100 hover:text-red-600"
                      onClick={() => handleDelete(vehicleType.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog thêm/sửa loại xe */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingType ? `Chỉnh sửa: ${editingType.name}` : "Thêm loại xe mới"}
            </DialogTitle>
            <DialogDescription>
              {editingType
                ? "Cập nhật thông tin loại xe và giá tương ứng"
                : "Thêm thông tin loại xe mới và thiết lập giá"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên loại xe</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên loại xe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá theo giờ (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá theo giờ"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá theo ngày (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá theo ngày"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="monthlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gói tháng (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá gói tháng"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quarterlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gói quý (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá gói quý"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gói năm (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá gói năm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Kích hoạt</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Loại xe này sẽ được hiển thị trong hệ thống
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {editingType ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
