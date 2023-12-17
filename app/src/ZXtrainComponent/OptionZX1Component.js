import React, { useState, useEffect } from 'react';
import { Button } from 'antd'; // 导入 Ant Design 的按钮组件
import '../css/OptionZX1Component.css';
import { getFont } from '../constant';

const OptionZX1Component = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const fontPath = `/Font/${getFont()}`;

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    setRandomImage(getRandomImage());

    const intervalTime = 1000;

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setRandomImage(getRandomImage());
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="container1">
      {randomImage && <img src={randomImage.default} alt="Random Image" />}
      <Button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? '继续' : '暂停'}
      </Button>
    </div>
  );
};

export default OptionZX1Component;
