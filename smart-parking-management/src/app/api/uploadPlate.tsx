import { toast } from "sonner";

export const sendToBackend = async (dataURL: string) => {
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
  formData.append("imageFile", blob, "plate.jpg");

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
    const filePath = result.filePath; // ví dụ: "UploadedFiles/plate.jpg"

    toast.success("Ảnh đã gửi thành công!");

    return filePath; // trả về URL để dùng tiếp nếu cần
  } catch (error) {
    console.error("Gửi ảnh thất bại!", error);
    toast.error("Không thể gửi ảnh đến máy chủ.");
  }
};
