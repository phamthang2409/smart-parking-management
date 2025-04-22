import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";

const PlateRecognition = ({ image }) => {
  const [text, setText] = useState("");
  const [rawText, setRawText] = useState(""); // Kết quả OCR thô
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    if (image) recognizePlate();
  }, [image]);

  const cleanPlateText = (rawText) => {
    let cleaned = rawText
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "") // Loại bỏ ký tự không cần thiết
      .replace(/O/g, "0")
      .replace(/I/g, "1")
      .replace(/Z/g, "2")
      .replace(/S/g, "5");

    const regex = /\d{2}[A-Z]{1,2}\d{4,5}/;
    const match = cleaned.match(regex);
    return match ? match[0] : "";
  };

  const preprocessImage = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const videoW = img.width;
        const videoH = img.height;

        // Cắt vùng giữa ảnh
        const cropW = videoW * 0.9;
        const cropH = videoH * 0.4;
        const cropX = (videoW - cropW) / 2;
        const cropY = videoH * 0.55 - cropH / 2;

        // Vẽ ảnh gốc lên canvas (giữ nguyên độ phân giải)
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        // Bước 1: Phát hiện góc nghiêng và xoay ảnh
        const rotatedCanvas = document.createElement("canvas");
        const rotatedCtx = rotatedCanvas.getContext("2d");

        // Kiểm tra góc của biển số và xoay ảnh
        rotatedCanvas.width = cropW;
        rotatedCanvas.height = cropH;

        // Giả sử ảnh là vuông và chúng ta cần xoay lại
        const angle = 0; // Nếu có góc nghiêng, tính toán góc này
        rotatedCtx.translate(cropW / 2, cropH / 2);
        rotatedCtx.rotate((angle * Math.PI) / 180);
        rotatedCtx.translate(-cropW / 2, -cropH / 2);

        rotatedCtx.drawImage(canvas, 0, 0);

        // Bước 2: Tăng độ phân giải của ảnh
        const scale = 2; // Phóng đại ảnh crop
        const scaledCanvas = document.createElement("canvas");
        const scaledCtx = scaledCanvas.getContext("2d");
        scaledCanvas.width = cropW * scale;
        scaledCanvas.height = cropH * scale;

        scaledCtx.scale(scale, scale); // Áp dụng phóng đại
        scaledCtx.drawImage(rotatedCanvas, 0, 0);

        const imageData = scaledCtx.getImageData(
          0,
          0,
          scaledCanvas.width,
          scaledCanvas.height
        );

        // Bước 3: Chuyển sang grayscale (đen trắng)
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const avg = (r + g + b) / 3;
          const threshold = avg > 120 ? 255 : 0;

          imageData.data[i] =
            imageData.data[i + 1] =
            imageData.data[i + 2] =
              threshold;
        }

        scaledCtx.putImageData(imageData, 0, 0);

        // Trả lại ảnh đã xử lý
        resolve(scaledCanvas.toDataURL());
      };
    });
  };

  const recognizePlate = async () => {
    setLoading(true);
    try {
      const processedImage = await preprocessImage();

      const { data } = await Tesseract.recognize(processedImage, "eng", {
        logger: (m) => console.log(m),
      });

      console.log("OCR thô:", data.text); // Debug log
      setRawText(data.text);

      const plate = cleanPlateText(data.text);
      setText(plate || "Không tìm thấy biển số phù hợp");
    } catch (err) {
      console.error("Lỗi nhận diện:", err);
      setText("Không thể nhận diện");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">📸 Quét biển số xe</h3>
      {image && (
        <>
          <img
            src={image}
            alt="Ảnh đã chụp"
            className="w-full mb-2 rounded shadow"
          />
          <p className="text-sm text-gray-600">🎯 Vùng crop đang được quét:</p>
          <canvas ref={canvasRef} className="border mt-1 rounded shadow" />
        </>
      )}
      {loading ? (
        <p className="text-blue-500 mt-2">🔄 Đang nhận diện...</p>
      ) : (
        <>
          <p className="mt-2">
            📌 <strong>Biển số:</strong> {text}
          </p>
          <p className="text-sm text-gray-500">
            🧪 <strong>Kết quả OCR thô:</strong> {rawText}
          </p>
        </>
      )}
    </div>
  );
};

export default PlateRecognition;
