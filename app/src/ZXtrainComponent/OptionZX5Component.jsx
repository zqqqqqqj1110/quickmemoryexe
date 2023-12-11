import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import '../css/OptionZX1Component.css';
import { getFont, getPath } from '../constant';

const OptionZX1Component = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const fontPath = `/Font/${getFont()}`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement);

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../asset/Mandala', false, /\.(jpg)$/));

    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    setRandomImage(getRandomImage());

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setRandomImage(getRandomImage());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div className="container1">
        {randomImage && <img src={randomImage} alt="Random Image" />}
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <Button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? '继续' : '暂停'}
        </Button>
      </div>
    </div>
  );
};

export default OptionZX1Component;
