import { useState } from 'react';
import Tesseract from 'tesseract.js';

const PlateRecognition = ({ image }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const recognizePlate = async () => {
    setLoading(true);
    try {
      const { data } = await Tesseract.recognize(image, 'eng', {
        logger: (m) => console.log(m),
      });
      setText(data.text); // Set biển số nhận diện được
    } catch (error) {
      console.error("Error recognizing text:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      {image && <img src={image} alt="Captured" width="100%" />}
      {loading ? (
        <p>Đang nhận diện...</p>
      ) : (
        <div>
          <button onClick={recognizePlate}>Nhận diện biển số</button>
          {text && <p>Biển số xe: {text}</p>}
        </div>
      )}
    </div>
  );
};

export default PlateRecognition;
