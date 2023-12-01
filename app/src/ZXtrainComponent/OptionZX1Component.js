import React, { useState, useEffect } from 'react';
import '../css/OptionZX1Component.css'

const OptionZX1Component = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // 获取PNG图像
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

    // 随机选择图像
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    // 设置路径
    setRandomImage(getRandomImage());

    const intervalId = setInterval(() => {
      setRandomImage(getRandomImage());
    }, 1000);   //  定时器

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      {randomImage && <img src={randomImage} alt="Random Image" />}
    </div>
  );
};

export default OptionZX1Component;
