import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import '../css/OptionZX1Component.css';
import { getFont } from '../constant';

const OptionZX1Component = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const fontPath = `/Font/${getFont()}`;

  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    setRandomImage(getRandomImage());

    const intervalTime = 1000000;

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setRandomImage(getRandomImage());
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      setRandomImage(getRandomImage());
    }
  };

  return (
    <div className="container1">
      {randomImage && <img src={randomImage.default} alt="Random Image" />}
      <Button onClick={handlePauseToggle}>
        {isPaused ? '继续' : '继续'}
      </Button>
    </div>
  );
};

export default OptionZX1Component;
