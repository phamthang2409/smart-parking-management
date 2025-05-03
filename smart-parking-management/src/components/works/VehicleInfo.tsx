"use client";

import { useState, useEffect } from "react";
import CameraCapture from "@/components/CameraCapture";
import PlateRecognition from "@/components/PlateRecognition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { sendToBackend } from "@/app/api/uploadPlate";

export default function VehicleInfo({
  sendToBackend,
  image,
  setImage,
  plateText,
  setPlateText,
  rawPlateText,
  setRawPlateText,
  vehicleInfo,
  setVehicleInfo,
  registeredCars,
  checkInCars,
  assignedSlot,
  setAssignedSlot,
  slotStatuses,
  setSlotStatuses,
  isCheckedIn,
  setIsCheckedIn,
  idCheckIn,
  setIdCheckIn,
}: any) {
  const [vehicleType, setVehicleType] = useState("Xe máy"); // ✅ Thêm state này
  const [hasPlateData, setHasPlateData] = useState(false);
  const getPrice = (type: string): string => {
    if (type === "Xe máy") return "5,000₫";
    if (type === "Ô tô") return "10,000₫";
    return "Không xác định";
  };
  
  

  const formatData = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatPlate = (raw?: string) => {
    if (!raw) return "";

    const replaceFirstNumberWithChar: { [key: string]: string } = {
      "0": "O",
      "1": "I",
      "2": "Z",
      "3": "B",
      "5": "S",
      "6": "G",
      "8": "B",
    };

    let cleanedRaw = raw
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    if (cleanedRaw.length <= 6) return "";

    if (cleanedRaw.length >= 3 && /\d/.test(cleanedRaw[2])) {
      const replacedChar =
        replaceFirstNumberWithChar[cleanedRaw[2]] || cleanedRaw[2];
      cleanedRaw = cleanedRaw.slice(0, 2) + replacedChar + cleanedRaw.slice(3);
    }

    const provinceCode = cleanedRaw.slice(0, 2);
    const typeChar = cleanedRaw.slice(2, 4);
    const numberPart = cleanedRaw.slice(4);

    if (numberPart.length >= 5) {
      return `${provinceCode} ${typeChar} ${numberPart.slice(
        0,
        3
      )}.${numberPart.slice(3)}`;
    } else {
      return `${provinceCode}-${typeChar} ${numberPart}`;
    }
  };

  const handlePlateData = async (text: string, raw: string) => {
    setPlateText(text);
    setRawPlateText(raw);
    setHasPlateData(true);

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

  async function handleCheckIn() {
    const fullNameToSave = vehicleInfo?.ownerName || "Khách / Vãng lai";
    let urlImage: string | null = null;

    try {
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
          Price: getPrice(vehicleType) === "5,000₫" ? 5000 : 20000,
          CarType: vehicleInfo?.carName || vehicleType,
          Checkin_images: urlImage,
        }),
      });

      if (!response.ok) {
        toast.error("Check in thất bại");
        return;
      }

      toast.success("Check in thành công");

      if (assignedSlot) {
        setSlotStatuses((prev: any) => ({
          ...prev,
          [assignedSlot]: "occupied",
        }));
      }
      setIsCheckedIn(true);
    } catch {
      toast.error("Có lỗi xảy ra khi check in");
    }
  }

  async function handleCheckOut() {
    try {
      await fetch(`https://localhost:7107/api/CheckInCar/${idCheckIn}`, {
        method: "DELETE",
      });

      toast.success(`Check out ${idCheckIn} thành công`);
      window.location.reload();
    } catch {
      toast.error("Xảy ra lỗi khi Check out");
    }
  }

  useEffect(() => {
    if (hasPlateData && registeredCars.length > 0) {
      const found = registeredCars.find(
        (car: any) =>
          car.licensePlate.replace(/\s/g, "") ===
          formatPlate(plateText).replace(/\s/g, "")
      );
      if (found) {
        setVehicleInfo(found);
        setIdCheckIn(found.id);
      } else {
        setVehicleInfo(null);
      }

      const foundCheckIn = checkInCars.find(
        (car: any) =>
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

  // ... (các import và state giữ nguyên như bạn có ở đầu)

return (
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
              <p className="text-2xl font-bold">{formatPlate(plateText)}</p>

              {/* Lựa chọn loại xe */}
              <div className="flex gap-2 mt-4">
                <button
                  className={`px-3 py-1 rounded border ${
                    vehicleType === "Xe máy"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                  onClick={() => setVehicleType("Xe máy")}
                >
                  Xe máy
                </button>
                <button
                  className={`px-3 py-1 rounded border ${
                    vehicleType === "Ô tô"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                  onClick={() => setVehicleType("Ô tô")}
                >
                  Ô tô
                </button>
              </div>

              {/* Nút Check In/Out */}
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
                    <strong>Loại xe:</strong> {vehicleType}
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

    {/* Cột camera */}
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

    {/* Cột kết quả nhận diện */}
    <Card className="bg-blue-50 w-full md:w-[500px]">
      <CardHeader>
        <CardTitle>Nhận diện biển số</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {image && <PlateRecognition image={image} onResult={handlePlateData} />}
      </CardContent>
    </Card>
  </div>
);
}
