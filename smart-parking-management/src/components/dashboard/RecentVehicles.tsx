"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: string;
  licensePlate: string;
  entryTime: string;
  parkingSpot: string;
  type: string;
  status: string;
  isMonthly: boolean;
}

interface RecentVehiclesProps {
  vehicles: Vehicle[];
}

export function RecentVehicles({ vehicles }: RecentVehiclesProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Xe đang gửi gần đây</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Biển số</TableHead>
                <TableHead>Loại xe</TableHead>
                <TableHead>Thời gian vào</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {vehicle.licensePlate}
                    {vehicle.isMonthly && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-xs">
                        Xe tháng
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.entryTime}</TableCell>
                  <TableCell>{vehicle.parkingSpot}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
