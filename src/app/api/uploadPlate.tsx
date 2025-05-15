import { toast } from "sonner";

export const sendToBackend = async (dataURL: string, plateNumber: string) => {
  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const blob = dataURLToBlob(dataURL);
  const formData = new FormData();

  // Tạo tên file dựa trên biển số và thời gian hiện tại
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14); // YYYYMMDDHHMMSS
  const sanitizedPlate = plateNumber.replace(/\s+/g, ""); // Loại bỏ khoảng trắng nếu có
  const fileName = `${sanitizedPlate}_${timestamp}.jpg`; // Ví dụ: "30A12345_20230501_153123.jpg"

  formData.append("imageFile", blob, fileName); // Dùng tên file mới

  try {
    const response = await fetch(
      "https://localhost:7107/api/CheckInCar/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const result = await response.json();
    const filePath = result.filePath; // Ví dụ: "UploadedFiles/30A12345_20230501_153123.jpg"

    toast.success("Ảnh đã gửi thành công!");

    return filePath; // Trả về URL của file đã lưu
  } catch (error) {
    console.error("Gửi ảnh thất bại!", error);
    toast.error("Không thể gửi ảnh đến máy chủ.");
  }
};
