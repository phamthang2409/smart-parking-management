import { useRef, useEffect } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, []);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');
    onCapture(image); // Gửi ảnh đã chụp lên component cha để xử lý quét biển số
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width="100%" />
      <button onClick={captureImage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2">
              Chụp ảnh</button>
    </div>  
  );
};

export default CameraCapture;
