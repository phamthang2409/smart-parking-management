import { useEffect, useState } from "react";
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
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { checkInCar } from "@/app/hooks/useCheckInCar";
import { checkOutCar } from "@/app/hooks/useCheckOutCar";
import {
  format,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  isAfter,
} from "date-fns";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/lib/utils/export-utils";

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [exportFormat, setExportFormat] = useState("excel");
  const [isExporting, setIsExporting] = useState(false);
  const [checkOutCars, setCheckOutCars] = useState<any[]>([]);

  const fetchDataCheckOutCar = async () => {
    const data = await checkOutCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      licensePlate: item.licensePlate,
      price: item.price,
      carType: item.carType,
      checkInTime: item.checkInTime,
      checkOutTime: item.checkOutTime,
    }));
    setCheckOutCars(formattedData);
    return formattedData;
  };

  useEffect(() => {
    const getData = async () => {
      fetchDataCheckOutCar();
    };
    getData();
  }, []);

  const filterDataByTimeRange = (data: any[]) => {
    const now = new Date();
    let startDate: Date | null = null;

    switch (timeRange) {
      case "today":
        startDate = startOfDay(now);
        break;
      case "week":
        startDate = startOfWeek(now, { weekStartsOn: 1 }); // Tuần bắt đầu từ thứ Hai
        break;
      case "month":
        startDate = startOfMonth(now);
        break;
      case "year":
        startDate = startOfYear(now);
        break;
      default:
        return data;
    }

    // Lọc dữ liệu dựa trên mốc thời gian
    return data.filter((item) => {
      const checkInDate = item.checkInTime ? new Date(item.checkInTime) : null;
      const checkOutDate = item.checkOutTime
        ? new Date(item.checkOutTime)
        : null;
      return (
        (checkInDate && isAfter(checkInDate, startDate)) ||
        (checkOutDate && isAfter(checkOutDate, startDate))
      );
    });
  };

  // Filter data based on search term and time range
  const filteredData = filterDataByTimeRange(
    checkOutCars.filter(
      (item) =>
        item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.carType.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate summary data
  const totalVehicles = filteredData.length;
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.price, 0);

  const handleExport = () => {
    setIsExporting(true);

    try {
      // Chuẩn bị cột cho xuất báo cáo
      const columns = [
        { header: "Biển số", key: "licensePlate" },
        { header: "Loại xe", key: "carType" },
        { header: "Thời gian vào", key: "checkInTime" },
        { header: "Thời gian ra", key: "checkOutTime" },
        {
          header: "Phí gửi xe",
          key: "price",
          format: (value: number) => formatCurrency(value),
        },
      ];

      // Tên file
      const rangeText =
        timeRange === "today"
          ? "Hom-nay"
          : timeRange === "week"
          ? "Tuan-nay"
          : timeRange === "month"
          ? "Thang-nay"
          : "Nam-nay";

      const filename = `Bao-cao-giao-dich-${rangeText}-${new Date().getTime()}`;

      // Tiêu đề
      const title = "BÁO CÁO GIAO DỊCH BÃI ĐỖ XE";
      const subtitle = `Khoảng thời gian: ${
        timeRange === "today"
          ? "Hôm nay"
          : timeRange === "week"
          ? "Tuần này"
          : timeRange === "month"
          ? "Tháng này"
          : "Năm nay"
      }`;

      // Xuất theo định dạng đã chọn
      if (exportFormat === "excel") {
        exportToExcel(filteredData, columns, filename, "Giao dịch bãi đỗ xe");
      } else if (exportFormat === "pdf") {
        exportToPDF(filteredData, columns, filename, title, subtitle);
      } else if (exportFormat === "csv") {
        exportToCSV(filteredData, columns, filename);
      }

      toast.success(
        `Xuất báo cáo dạng ${exportFormat.toUpperCase()} thành công`
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Có lỗi xảy ra khi xuất báo cáo");
    } finally {
      setIsExporting(false);
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return "-";
    const formattedTime = format(new Date(time), "dd/MM/yyyy HH:mm");
    return formattedTime;
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
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
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
          <Select defaultValue={exportFormat} onValueChange={setExportFormat}>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Biển số</TableHead>
              <TableHead>Loại xe</TableHead>
              <TableHead>Thời gian vào</TableHead>
              <TableHead>Thời gian ra</TableHead>
              <TableHead className="text-right">Phí gửi xe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, 10).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.licensePlate}
                  </TableCell>
                  <TableCell>{item.carType}</TableCell>
                  <TableCell>{formatTime(item.checkInTime)}</TableCell>
                  <TableCell>{formatTime(item.checkOutTime)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price)}
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
    </div>
  );
}
