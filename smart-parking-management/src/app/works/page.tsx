"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import CameraCapture from "@/components/CameraCapture";
import PlateRecognition from "@/components/PlateRecognition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registrationCar } from "../../app/hooks/useRegistrationCar";
import { sendToBackend } from "@/app/api/uploadPlate";
import { checkInCar } from "../../app/hooks/useCheckInCar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { url } from "inspector";
import { toast } from "sonner";

type SlotStatus = "available" | "occupied";

const ParkingSlot = ({
  label,
  status,
  onClick,
  assignedSlot,
}: {
  label: string;
  status: SlotStatus;
  onClick: () => void;
  assignedSlot: string | null;
}) => {
  const isOccupied = status === "occupied";
  const isAssigned = assignedSlot === label;

  const baseStyle = `w-24 h-12 text-base rounded-md flex items-center justify-center text-white cursor-pointer`;

  let bgColor = isOccupied ? "bg-red-500" : "bg-green-600";
  if (isAssigned) bgColor = "bg-yellow-400 text-black font-semibold";

  return (
    <div onClick={onClick} className={`${baseStyle} ${bgColor}`}>
      {label}
    </div>
  );
};

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

  // Check In
  async function handleCheckIn() {
    const fullNameToSave = vehicleInfo?.ownerName || "Khách / Vãng lai";
    let urlImage: string | null = null; //
    try {
      // Gửi ảnh về backend nếu có ảnh
      if (image) {
        urlImage = await sendToBackend(
          image,
          formatPlate(vehicleInfo?.plateNumber) || formatPlate(plateText)
        );
      }

      const response = await fetch(`https://localhost:7107/api/CheckInCar/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: fullNameToSave,
          LicensePlate:
            formatPlate(vehicleInfo?.plateNumber) || formatPlate(plateText),
          Price: getPrice != null ? 5000 : 0,
          CarType: vehicleInfo?.carName || formatPlate(plateText),
          Checkin_images: urlImage,
        }),
      });
      if (!response.ok) {
        toast.error("Check in thất bại");
      }

      toast.success("Check in thành công");

      // Gán biển số cho ô
      if (assignedSlot) {
        setSlotStatuses((prev) => ({
          ...prev,
          [assignedSlot]: "occupied", // Đánh dấu đã có xe
        }));
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi check in");
    }
    window.location.reload();
  }

  // Check Out
  async function handleCheckOut() {
    fetch(`https://localhost:7107/api/CheckInCar/${idCheckIn}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success(`Check out ${idCheckIn} thành công`);
        window.location.reload();
      })
      .catch(() => toast.error("Xảy ra lỗi khi Check out"));

    setIsCheckedIn(false);
  }

  const getPrice = (type: string) => (type === "Xe máy" ? "5,000₫" : "20,000₫");

  const handleSlotClick = (label: string) => {
    setSlotStatuses((prev) => ({
      ...prev,
      [label]: prev[label] === "available" ? "occupied" : "available",
    }));
  };

  const fetchData = async () => {
    const data = await registrationCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      customerName: item.customerName,
      licensePlate: item.licensePlate,
      carName: item.carName,
      packageName: item.packageName,
      startDate: item.startDate,
      endDate: item.endDate,
      state: item.state,
    }));
    setRegisteredCars(formattedData);
  };

  const fetchDataCheckInCar = async () => {
    const data = await checkInCar();
    const formattedData = data.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      licensePlate: item.licensePlate,
      price: item.price,
      carType: item.carType,
      checkin_images: item.checkin_images,
      checkInTime: item.checkInTime,
      checkOutTime: item.checkOutTime,
    }));
    setCheckInCars(formattedData);
  };

  const handlePlateData = async (text: string, raw: string) => {
    setPlateText(text);
    setRawPlateText(raw);
    setHasPlateData(true);
    await fetchData();
    await fetchDataCheckInCar();

    // Gán một ô còn trống ngẫu nhiên trong bãi giữ xe
    const availableSlots = Object.entries(slotStatuses)
      .filter(([_, status]) => status === "available")
      .map(([label]) => label);

    if (availableSlots.length > 0) {
      const randomSlot =
        availableSlots[Math.floor(Math.random() * availableSlots.length)];
      setAssignedSlot(randomSlot);
    } else {
      toast.error("Không còn chỗ trống!");
    }
  };

  useEffect(() => {
    if (hasPlateData && registeredCars.length > 0) {
      const found = registeredCars.find(
        (car) =>
          car.licensePlate.replace(/\s/g, "") ===
          formatPlate(plateText).replace(/\s/g, "")
      );
      if (found) {
        setVehicleInfo({
          id: found.id,
          plateNumber: found.licensePlate,
          ownerName: found.customerName,
          carName: found.carName,
          packageName: found.packageName,
          startDate: found.startDate,
          endDate: found.endDate,
        });
        setIdCheckIn(found.id);
      } else {
        setVehicleInfo(null); // Không tìm thấy biển số phù hợp
      }

      const foundCheckIn = checkInCars.find(
        (car) =>
          car.licensePlate.replace(/\s/g, "") ===
          formatPlate(plateText).replace(/\s/g, "")
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

  //Format Plate Number
  const formatPlate = (raw?: string) => {
    if (raw == null) return "";

    const replaceFirstNumberWithChar: { [key: string]: string } = {
      "0": "O",
      "1": "I",
      "2": "Z",
      "3": "B",
      "5": "S",
      "6": "G",
      "8": "B",
    };

    // Loại bỏ khoảng trắng và ký tự đặc biệt, chuyển về in hoa
    let cleanedRaw = raw
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    if (cleanedRaw.length <= 6) return "";
    // Chỉ thay thế ký tự thứ 3 nếu nó là số
    if (cleanedRaw.length >= 3 && /\d/.test(cleanedRaw[2])) {
      const charToReplace = cleanedRaw[2];
      const replacedChar =
        replaceFirstNumberWithChar[charToReplace] || charToReplace;
      cleanedRaw = cleanedRaw.slice(0, 2) + replacedChar + cleanedRaw.slice(3);
    }

    // Format biển số theo chuẩn Việt Nam: XXY-NNN.NN hoặc XXY-NNNN
    if (cleanedRaw.length >= 7) {
      const provinceCode = cleanedRaw.slice(0, 2);
      const typeChar = cleanedRaw.slice(2, 4);
      const numberPart = cleanedRaw.slice(4);

      if (numberPart.length >= 5) {
        const firstThree = numberPart.slice(0, 3);
        const lastTwo = numberPart.slice(3);
        return `${provinceCode} ${typeChar} ${firstThree}.${lastTwo}`;
      } else {
        return `${provinceCode}-${typeChar} ${numberPart}`;
      }
    }

    return cleanedRaw;
  };

  const formatData = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Công việc</h1>
        </div>

        <Tabs defaultValue="vehicle-info" className="w-full">
          <TabsList>
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="tasks">Bãi giữ xe</TabsTrigger>
          </TabsList>

          {/* --- Thông tin xe --- */}
          <TabsContent value="vehicle-info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                {!hasPlateData ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Biển số xe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Chưa có biển số xe</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Biển số xe</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {formatPlate(plateText)}
                        </p>

                        {/* Hiện nút Check In/Out */}
                        <div className="mt-4 space-x-4">
                          {!isCheckedIn ? (
                            <button
                              onClick={handleCheckIn}
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Check In
                            </button>
                          ) : (
                            <button
                              onClick={handleCheckOut}
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Check Out
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông tin chi tiết</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {vehicleInfo ? (
                          <>
                            <p>
                              <strong>Chủ xe:</strong> {vehicleInfo.ownerName}
                            </p>
                            <p>
                              <strong>Xe:</strong> {vehicleInfo.carName}
                            </p>
                            <p>
                              <strong>Gói:</strong> {vehicleInfo.packageName}
                            </p>
                            <p>
                              <strong>Ngày bắt đầu:</strong>{" "}
                              {formatData(vehicleInfo.startDate)}
                            </p>
                            <p>
                              <strong>Ngày kết thúc:</strong>{" "}
                              {formatData(vehicleInfo.endDate)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <strong>Loại xe:</strong> Xe khách / Vãng lai
                            </p>
                            <p>
                              <strong>Phí gửi:</strong> {getPrice(vehicleType)}
                            </p>
                          </>
                        )}

                        {assignedSlot && (
                          <p>
                            <strong>Vị trí đỗ xe:</strong> {assignedSlot}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Camera + Nhận diện luôn hiện */}
              <Card className="bg-blue-50 w-full md:w-[500px]">
                <CardHeader>
                  <CardTitle>Quét biển số xe</CardTitle>
                  <CardDescription>
                    Chụp và nhận diện biển số bằng camera máy tính
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CameraCapture onCapture={setImage} />
                </CardContent>
              </Card>
              <Card className="bg-blue-50 w-full md:w-[500px]">
                <CardHeader>
                  <CardTitle>Nhận diện biển số</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {image && (
                    <PlateRecognition
                      image={image}
                      onResult={handlePlateData}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- Bãi giữ xe --- */}
          <TabsContent value="tasks">
            <div className="w-full h-[85vh] flex flex-col items-center justify-start space-y-6 p-4 relative">
              <div className="w-full flex justify-between text-lg font-semibold text-red-600 px-8">
                <div className="border border-red-500 px-6 py-2 rounded">
                  Lối ra
                </div>
                <div className="border border-red-500 px-6 py-2 rounded">
                  Lối ra
                </div>
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
                            status={slotStatuses[label]}
                            onClick={() => handleSlotClick(label)}
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
                            status={slotStatuses[label]}
                            onClick={() => handleSlotClick(label)}
                            assignedSlot={assignedSlot}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
