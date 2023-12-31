import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { getFont } from '../constant';
import '../css/OptionZX2Component.css';

const OptionZX2Component = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const fontPath = `/Font/${getFont()}`;

  useEffect(() => {
    const loadRandomImages = () => {
      // 获取图像文件
      const importAll = (r) => r.keys().map(r);
      const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

      // 随机选择图像
      const randomIndexes = [];
      while (randomIndexes.length < 9) {
        const randomIndex = Math.floor(Math.random() * images.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      const randomImagePaths = randomIndexes.map((index) => images[index]);

      // 设置9张图像路径
      setRandomImages(randomImagePaths);
    };

    // 初始加载一次
    loadRandomImages();

    const intervalId = setInterval(() => {
      if (!isPaused) {
        loadRandomImages();
      }
    }, 1000000);   //定时器

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="container2">
      {randomImages.map((image, index) => (
        <img key={index} src={image.default} alt={`Random Image ${index + 1}`} />
      ))}
      <Button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? '继续' : '继续'}
      </Button>
    </div>
  );
};

export default OptionZX2Component;
