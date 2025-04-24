"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, Calendar, XCircle } from "lucide-react";
import { toast } from "sonner";

type Registration = {
  Id: string;
  CustomerName: string;
  LicensedPlate: string;
  CarName: string;
  PackageName: string;
  StartDate: string;
  EndDate: string;
  State: string;
};

type Props = {
  data: Registration[];
  fetchData: () => void;
};

export function RegistrationsList({ data, fetchData }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const filteredRegistrations = Array.isArray(data)
    ? data.filter(
        (registration) =>
          registration.CarName?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          registration.LicensedPlate?.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      )
    : [];

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleExtendSubmit = () => {
    if (!selectedId || !selectedPackage || !startDate) {
      toast.error("Vui lòng nhập đầy đủ thông tin gia hạn.");
      return;
    }

    fetch(`https://localhost:7107/api/RegistrationCar/${selectedId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageName: selectedPackage,
        startDate: startDate,
      }),
    })
      .then(() => {
        toast.success(`Gia hạn thành công cho đăng ký ${selectedId}`);
        fetchData();
        setOpenDialog(false);
      })
      .catch(() => toast.error("Xảy ra lỗi khi gia hạn"));
  };

  const handleCancel = (id: string) => {
    fetch(`https://localhost:7107/api/RegistrationCar/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        toast.success(`Hủy đăng ký ${id} thành công`);
      })
      .catch(() => toast.error("Xảy ra lỗi khi hủy"));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, biển số hoặc loại xe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="secondary">Xuất danh sách</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Biển số xe</TableHead>
              <TableHead>Loại xe</TableHead>
              <TableHead>Gói đăng ký</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration) => (
                <TableRow key={registration.Id}>
                  <TableCell className="font-medium">
                    {registration.CustomerName}
                  </TableCell>
                  <TableCell>{registration.LicensedPlate}</TableCell>
                  <TableCell>{registration.CarName}</TableCell>
                  <TableCell>{registration.PackageName}</TableCell>
                  <TableCell>{registration.StartDate}</TableCell>
                  <TableCell>{registration.EndDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        registration.State === "Hiệu lực"
                          ? "outline"
                          : "secondary"
                      }
                      className={
                        registration.State === "Hiệu lực"
                          ? "bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600"
                          : "bg-red-50 text-red-600 hover:bg-red-50 hover:text-red-600"
                      }
                    >
                      {registration.State}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleOpenDialog(registration.Id)}
                          className="flex items-center"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Gia hạn</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancel(registration.Id)}
                          className="flex items-center"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Hủy đăng ký</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Không tìm thấy dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal Gia hạn */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Gia hạn đăng ký</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Gói đăng ký mới</Label>
              <Select onValueChange={setSelectedPackage}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn gói đăng ký" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gói tháng">Gói 1 tháng</SelectItem>
                  <SelectItem value="Gói quý">Gói quý (3 tháng)</SelectItem>
                  <SelectItem value="Gói năm">Gói 1 năm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleExtendSubmit}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
