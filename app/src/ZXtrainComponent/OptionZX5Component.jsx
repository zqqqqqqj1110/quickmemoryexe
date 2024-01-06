import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import '../css/OptionZX1Component.css'; // 保留原有样式
import { getFont } from '../constant';

const OptionZX5Component = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const fontPath = `/Font/${getFont()}`;

  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context('../../public/Mandala', false, /\.(jpg)$/));

  const getNextImageIndex = () => (imageIndex + 1) % images.length;
  const getPrevImageIndex = () => (imageIndex - 1 + images.length) % images.length;

  useEffect(() => {
    const intervalTime = 1000000;

    const intervalId = setInterval(() => {
      setImageIndex(getNextImageIndex());
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [imageIndex]);

  const handlePrevImage = () => {
    setImageIndex(getPrevImageIndex());
  };

  const handleNextImage = () => {
    setImageIndex(getNextImageIndex());
  };

  return (
    <div className="container1">
      {images.length > 0 && <img src={images[imageIndex].default} alt="Sequential Image" />}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', marginBottom: '16px' }}>
        <Button onClick={handlePrevImage} style={{ marginRight: '8px' }}>
          前一张
        </Button>
        <Button onClick={handleNextImage} style={{ marginLeft: '8px' }}>
          后一张
        </Button>
      </div>
    </div>
  );
};

export default OptionZX5Component;
