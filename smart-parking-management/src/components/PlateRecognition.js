import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";

const PlateRecognition = ({ image }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    if (image) recognizePlate();
  }, [image]);

  const cleanPlateText = (rawText) => {
    let cleaned = rawText.toUpperCase().replace(/\s+/g, "");
    const regex = /\d{2}[A-Z]{1,2}-?\d{4,5}/; // Nhận dạng biển kiểu 99-H7 7060
    const match = cleaned.match(regex);
    return match ? match[0].replace("-", "") : cleaned;
  };

  const preprocessImage = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Chuyển ảnh sang đen trắng (grayscale threshold)
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const avg = (r + g + b) / 3;
          const threshold = avg > 130 ? 255 : 0;

          imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = threshold;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };
    });
  };

  const recognizePlate = async () => {
    setLoading(true);
    try {
      const processedImage = await preprocessImage();
      const { data } = await Tesseract.recognize(processedImage, "eng+vie", {
        logger: (m) => console.log(m),
      });

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
      <h3>📸 Quét biển số xe</h3>
      {image && <img src={image} alt="Captured" width="100%" />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {loading ? (
        <p>🔄 Đang nhận diện...</p>
      ) : (
        <p>📌 Biển số xe: <strong>{text}</strong></p>
      )}
    </div>
  );
};

export default PlateRecognition;
