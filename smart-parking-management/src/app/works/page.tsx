"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registrationCar } from "@/app/hooks/useRegistrationCar";
import { checkInCar } from "@/app/hooks/useCheckInCar";

import VehicleInfoTabs from "../../components/works/vehicleInfo";
import TasksTabs from "../../components/works/Tasks";

type SlotStatus = "available" | "occupied";

const getInitialStatus = (): Record<string, SlotStatus> => {
  const allSlots = Array.from("ABCDEFGHIKL".split("")).flatMap((row) =>
    [1, 2, 3, 4].map((col) => `${row}${col}`)
  );
  const status: Record<string, SlotStatus> = {};
  allSlots.forEach((label) => {
    status[label] = "available";
  });
  return status;
};

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState("vehicle-info");
  const [image, setImage] = useState<string | null>(null);
  const [slotStatuses, setSlotStatuses] = useState(getInitialStatus());
  const [vehicleType, setVehicleType] = useState("Xe máy");
  const [plateText, setPlateText] = useState("");
  const [rawPlateText, setRawPlateText] = useState("");
  const [hasPlateData, setHasPlateData] = useState(false);
  const [registeredCars, setRegisteredCars] = useState<any[]>([]);
  const [checkInCars, setCheckInCars] = useState<any[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [idCheckIn, setIdCheckIn] = useState<number>(0);
  const [assignedSlot, setAssignedSlot] = useState<string | null>(null);

  const fetchData = async () => {
    const data = await registrationCar();
    setRegisteredCars(data);
  };

  const fetchDataCheckInCar = async () => {
    const data = await checkInCar();
    setCheckInCars(data);
  };

  useEffect(() => {
    if (currentTab === "tasks") setCurrentTab("tasks");
    if (hasPlateData && registeredCars.length > 0) {
      const formattedPlate = plateText.replace(/\s/g, "");
      const found = registeredCars.find(
        (car) => car.licensePlate.replace(/\s/g, "") === formattedPlate
      );
      if (found) {
        setVehicleInfo(found);
        setIdCheckIn(found.id);
      } else {
        setVehicleInfo(null);
      }

      const foundCheckIn = checkInCars.find(
        (car) => car.licensePlate.replace(/\s/g, "") === formattedPlate
      );
      if (foundCheckIn) {
        setIsCheckedIn(true);
        setIdCheckIn(foundCheckIn.id);
      } else {
        setIsCheckedIn(false);
        setIdCheckIn(0);
      }
    }
  }, [hasPlateData, registeredCars, plateText, checkInCars]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Công việc</h1>
        <Tabs
          defaultValue="vehicle-info"
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="tasks">Bãi giữ xe</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicle-info">
            <VehicleInfoTabs
              image={image}
              setImage={setImage}
              vehicleType={vehicleType}
              plateText={plateText}
              rawPlateText={rawPlateText}
              setPlateText={setPlateText}
              setRawPlateText={setRawPlateText}
              setHasPlateData={setHasPlateData}
              slotStatuses={slotStatuses}
              setSlotStatuses={setSlotStatuses}
              registeredCars={registeredCars}
              setRegisteredCars={setRegisteredCars}
              checkInCars={checkInCars}
              setCheckInCars={setCheckInCars}
              vehicleInfo={vehicleInfo}
              setVehicleInfo={setVehicleInfo}
              isCheckedIn={isCheckedIn}
              setIsCheckedIn={setIsCheckedIn}
              assignedSlot={assignedSlot}
              setAssignedSlot={setAssignedSlot}
              idCheckIn={idCheckIn}
              setIdCheckIn={setIdCheckIn}
              fetchData={fetchData}
              fetchDataCheckInCar={fetchDataCheckInCar}
            />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTabs
              slotStatuses={slotStatuses}
              assignedSlot={assignedSlot}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
