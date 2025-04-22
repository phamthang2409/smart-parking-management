import { useRef, useEffect, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
        setError("Không thể truy cập camera. Vui lòng cấp quyền.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    onCapture(image);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        width="100%"
        style={{ maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={captureImage}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
      >
        📸 Chụp ảnh
      </button>
    </div>
  );
};

export default CameraCapture;
