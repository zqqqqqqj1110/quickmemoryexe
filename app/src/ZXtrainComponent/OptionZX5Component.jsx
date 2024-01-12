import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      {images.length > 0 && (
        <img
          src={images[imageIndex].default}
          alt="Sequential Image"
          style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 48px)', alignSelf: 'center' }}
        />
      )}
      <div style={{ marginTop: '16px' }}>
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
