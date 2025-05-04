import React from "react";
import { Card } from "@/components/ui/card";

const ParkingSlot = ({
  label,
  status,
  assignedSlot,
}: {
  label: string;
  status: "available" | "occupied";
  assignedSlot: string | null;
}) => {
  const isOccupied = status === "occupied";
  const isAssigned = assignedSlot === label;

  const baseStyle =
    "w-24 h-12 text-base rounded-md flex items-center justify-center text-white cursor-default transition-all flex-col";

  let bgColor = isOccupied ? "bg-red-500" : "bg-green-600";
  let borderStyle = isAssigned ? "border-4 border-yellow-300" : "";

  return (
    <div className={`${baseStyle} ${bgColor} ${borderStyle}`}>
      <div>{label}</div>
      {isAssigned && (
        <div className="text-xs text-yellow-200 mt-1">(Đã gán)</div>
      )}
    </div>
  );
};

export default function TasksTabs({
  assignedSlot,
  checkInCars,
}: {
  assignedSlot: string | null;
  checkInCars: any[];
}) {
  const [slotStatuses, setSlotStatuses] = React.useState<
    Record<string, "available" | "occupied">
  >({});

  React.useEffect(() => {
    // Tạo danh sách tất cả các slot
    const allSlots = Array.from("ABCDEFGHIKL".split("")).flatMap((row) =>
      [1, 2, 3, 4].map((col) => `${row}${col}`)
    );

    const newStatuses: Record<string, "available" | "occupied"> = {};

    // Đặt tất cả slot thành available ban đầu
    allSlots.forEach((slot) => {
      newStatuses[slot] = "available";
    });

    // Đánh dấu occupied theo dữ liệu DB
    checkInCars.forEach((car) => {
      if (car.assignedSlot) {
        newStatuses[car.assignedSlot] = "occupied";
      }
    });

    setSlotStatuses(newStatuses);
  }, [checkInCars]);

  return (
    <div className="w-full h-[85vh] flex flex-col items-center justify-start space-y-6 p-4 relative">
      <div className="w-full flex justify-between text-lg font-semibold text-red-600 px-8">
        <div className="border border-red-500 px-6 py-2 rounded">Lối ra</div>
        <div className="border border-red-500 px-6 py-2 rounded">Lối ra</div>
      </div>

      <div className="flex flex-row justify-center items-center gap-24 flex-1 w-full">
        <div className="flex flex-col space-y-4">
          {["A", "B", "C", "D", "E", "F"].map((row) => (
            <div key={row} className="flex space-x-4">
              {[1, 2, 3, 4].map((col) => {
                const label = `${row}${col}`;
                return (
                  <ParkingSlot
                    key={label}
                    label={label}
                    status={slotStatuses[label] || "available"}
                    assignedSlot={assignedSlot}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-end justify-center h-full">
          <div className="border border-red-500 px-4 py-20 rounded text-red-600 text-xl font-semibold">
            Lối vào
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {["G", "H", "I", "J", "K", "L"].map((row) => (
            <div key={row} className="flex space-x-4">
              {[1, 2, 3, 4].map((col) => {
                const label = `${row}${col}`;
                return (
                  <ParkingSlot
                    key={label}
                    label={label}
                    status={slotStatuses[label] || "available"}
                    assignedSlot={assignedSlot}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
