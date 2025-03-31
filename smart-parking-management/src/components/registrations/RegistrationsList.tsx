"use client";

import { useState } from "react";
import { monthlyRegistrations } from "@/lib/data/mockData";
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
import { Search, MoreHorizontal, Calendar, CheckCircle, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function RegistrationsList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter registrations based on search term
  const filteredRegistrations = monthlyRegistrations.filter(
    (registration) =>
      registration.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExtend = (id: string) => {
    toast.success(`Gia hạn đăng ký ${id} thành công`);
  };

  const handleCancel = (id: string) => {
    toast.success(`Đã hủy đăng ký ${id}`);
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
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    {registration.customerName}
                  </TableCell>
                  <TableCell>{registration.licensePlate}</TableCell>
                  <TableCell>{registration.vehicleType}</TableCell>
                  <TableCell>{registration.plan}</TableCell>
                  <TableCell>{registration.startDate}</TableCell>
                  <TableCell>{registration.endDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={registration.status === "Hiệu lực" ? "outline" : "secondary"}
                      className={
                        registration.status === "Hiệu lực"
                          ? "bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600"
                          : "bg-red-50 text-red-600 hover:bg-red-50 hover:text-red-600"
                      }
                    >
                      {registration.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleExtend(registration.id)}
                          className="flex items-center"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Gia hạn</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancel(registration.id)}
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
                <TableCell
                  colSpan={8}
                  className="h-24 text-center"
                >
                  Không tìm thấy dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
