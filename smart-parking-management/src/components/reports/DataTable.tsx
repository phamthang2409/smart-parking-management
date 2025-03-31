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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Calendar } from "lucide-react";
import { vehicleHistory } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { exportToPDF, exportToExcel, exportToCSV } from "@/lib/utils/export-utils";

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [exportFormat, setExportFormat] = useState("excel");
  const [isExporting, setIsExporting] = useState(false);

  // Filter data based on search term
  const filteredData = vehicleHistory.filter(
    (item) =>
      item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary data
  const totalVehicles = filteredData.length;
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.fee, 0);
  const vehicleTypes = filteredData.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExport = () => {
    setIsExporting(true);

    try {
      // Chuẩn bị cột cho xuất báo cáo
      const columns = [
        { header: 'Biển số', key: 'licensePlate' },
        { header: 'Loại xe', key: 'type' },
        { header: 'Thời gian vào', key: 'entryTime' },
        { header: 'Thời gian ra', key: 'exitTime' },
        { header: 'Thời gian gửi', key: 'duration' },
        {
          header: 'Phí gửi xe',
          key: 'fee',
          format: (value: number) => formatCurrency(value)
        },
      ];

      // Tên file
      const rangeText =
        timeRange === 'today'
          ? 'Hom-nay'
          : timeRange === 'week'
            ? 'Tuan-nay'
            : timeRange === 'month'
              ? 'Thang-nay'
              : 'Nam-nay';

      const filename = `Bao-cao-giao-dich-${rangeText}-${new Date().getTime()}`;

      // Tiêu đề
      const title = 'BÁO CÁO GIAO DỊCH BÃI ĐỖ XE';
      const subtitle = `Khoảng thời gian: ${
        timeRange === 'today'
          ? 'Hôm nay'
          : timeRange === 'week'
            ? 'Tuần này'
            : timeRange === 'month'
              ? 'Tháng này'
              : 'Năm nay'
      }`;

      // Xuất theo định dạng đã chọn
      if (exportFormat === 'excel') {
        exportToExcel(filteredData, columns, filename, 'Giao dịch bãi đỗ xe');
      } else if (exportFormat === 'pdf') {
        exportToPDF(filteredData, columns, filename, title, subtitle);
      } else if (exportFormat === 'csv') {
        exportToCSV(filteredData, columns, filename);
      }

      toast.success(`Xuất báo cáo dạng ${exportFormat.toUpperCase()} thành công`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Có lỗi xảy ra khi xuất báo cáo');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={exportFormat}
            onValueChange={setExportFormat}
          >
            <SelectTrigger>
              <SelectValue placeholder="Định dạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleExport}
            className="w-12 px-0"
            disabled={isExporting || filteredData.length === 0}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Tổng số xe</div>
          <div className="text-2xl font-bold">{totalVehicles}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Tổng doanh thu</div>
          <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Khoảng thời gian</div>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Calendar className="h-4 w-4" />
            {timeRange === "today" && "Hôm nay"}
            {timeRange === "week" && "Tuần này"}
            {timeRange === "month" && "Tháng này"}
            {timeRange === "year" && "Năm nay"}
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Biển số</TableHead>
              <TableHead>Loại xe</TableHead>
              <TableHead>Thời gian vào</TableHead>
              <TableHead>Thời gian ra</TableHead>
              <TableHead>Thời gian gửi</TableHead>
              <TableHead className="text-right">Phí gửi xe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, 10).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.licensePlate}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.entryTime}</TableCell>
                  <TableCell>{item.exitTime}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.fee)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium">Phân loại xe</div>
          <div className="mt-2 space-y-1">
            {Object.entries(vehicleTypes).map(([type, count]) => (
              <div key={type} className="flex justify-between text-sm">
                <span>{type}</span>
                <span className="font-medium">{count} xe</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium">Tóm tắt báo cáo</div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Số xe trung bình mỗi ngày:</span>
              <span className="font-medium">{Math.round(totalVehicles / 7)}</span>
            </div>
            <div className="flex justify-between">
              <span>Doanh thu trung bình mỗi xe:</span>
              <span className="font-medium">
                {formatCurrency(totalVehicles > 0 ? Math.round(totalRevenue / totalVehicles) : 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian đỗ trung bình:</span>
              <span className="font-medium">2 giờ 30 phút</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
