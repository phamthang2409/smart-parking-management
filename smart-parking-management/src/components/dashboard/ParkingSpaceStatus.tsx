"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ParkingSpaceStatusProps {
  available: number;
  total: number;
}

export function ParkingSpaceStatus({
  available,
  total,
}: ParkingSpaceStatusProps) {
  const occupied = total - available;
  const occupancyRate = Math.round((occupied / total) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Trạng thái bãi đỗ xe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span>Tỷ lệ lấp đầy</span>
            <span className="font-medium">{occupancyRate}%</span>
          </div>
          <Progress className="mt-2 h-2" value={occupancyRate} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-1 rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <div className="text-xs text-green-600 dark:text-green-400">
              Vị trí trống
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {available}
            </div>
          </div>
          <div className="space-y-1 rounded-lg bg-red-50 p-4 dark:bg-red-950">
            <div className="text-xs text-red-600 dark:text-red-400">
              Vị trí đang sử dụng
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {occupied}
            </div>
          </div>
          <div className="col-span-2 space-y-1 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Tổng sức chứa
            </div>
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-300">
              {total}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
