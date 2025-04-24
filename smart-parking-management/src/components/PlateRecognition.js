import { useEffect, useRef, useState } from "react";

const PlateRecognition = ({ image }) => {
  const [text, setText] = useState("");
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    if (image) {
      recognizePlate();
    }
  }, [image]);

  const recognizePlate = async () => {
    setLoading(true);
    setText("");
    setRawText("");

    try {
      const processedImage = await preprocessImage();
      if (!processedImage) {
        setText("Lỗi xử lý ảnh");
        setLoading(false);
        return;
      }

      const blob = await (await fetch(processedImage)).blob();
      const formData = new FormData();
      formData.append("file", blob, "plate.jpg");

      const response = await fetch("http://localhost:8000/recognize-plate/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setText(data.plate || "Không nhận diện được");
      setRawText(data.all?.join(", ") || "");
    } catch (error) {
      console.error("Lỗi gửi tới server:", error);
      setText("Lỗi nhận diện");
    } finally {
      setLoading(false);
    }
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

        const cropW = videoW * 0.9;
        const cropH = videoH * 0.4;
        const cropX = (videoW - cropW) / 2;
        const cropY = videoH * 0.55 - cropH / 2;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = cropW;
        tempCanvas.height = cropH;
        tempCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const aspectRatio = cropW / cropH;
        let processedCanvas = tempCanvas;
        let currentW = cropW;
        let currentH = cropH;

        if (aspectRatio < 0.7) {
          const rotatedCanvas = document.createElement("canvas");
          const rotatedCtx = rotatedCanvas.getContext("2d");
          rotatedCanvas.width = currentH;
          rotatedCanvas.height = currentW;

          rotatedCtx.translate(currentH / 2, currentW / 2);
          rotatedCtx.rotate(90 * Math.PI / 180);
          rotatedCtx.drawImage(tempCanvas, -currentW / 2, -currentH / 2);

          processedCanvas = rotatedCanvas;
          currentW = processedCanvas.width;
          currentH = processedCanvas.height;
        }

        const scale = 2;
        canvas.width = currentW * scale;
        canvas.height = currentH * scale;
        const ctxMain = canvas.getContext("2d");
        ctxMain.scale(scale, scale);
        ctxMain.drawImage(processedCanvas, 0, 0);

        const imageData = ctxMain.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const threshold = 150;

        for (let i = 0; i < data.length; i += 4) {
          const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
          const color = luminance > threshold ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = color;
        }

        ctxMain.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = (error) => {
        console.error("Lỗi khi tải ảnh:", error);
        resolve(null);
      };
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📸 Quét biển số xe</h3>

      {image && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Ảnh gốc:</p>
          <img src={image} alt="Ảnh đã chụp" className="w-full max-w-sm mx-auto rounded shadow-sm border border-gray-200" />
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">🎯 Vùng ảnh đã xử lý (cắt, xoay, phóng to, ảnh xám):</p>
        <canvas ref={canvasRef} className="w-full max-w-sm mx-auto border border-gray-300 rounded shadow-sm bg-gray-100" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      {loading ? (
        <p className="text-blue-600 mt-2 text-center">
          <span className="animate-spin inline-block mr-2">🔄</span> Đang nhận diện...
        </p>
      ) : (
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800">
            📌 <strong>Biển số:</strong> <span className="text-green-700">{text}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            🧪 <strong>Kết quả OCR thô:</strong> <span className="font-mono break-all">{rawText || "N/A"}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PlateRecognition;
