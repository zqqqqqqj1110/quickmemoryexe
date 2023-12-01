import React, { useState, useEffect } from 'react';
import '../css/OptionZX1Component.css'

const OptionZX1Component = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // 获取public/ZXpic文件夹中的所有PNG图像文件
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

    // 函数用于随机选择图像
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    // 设置初始图像路径
    setRandomImage(getRandomImage());

    const intervalId = setInterval(() => {
      setRandomImage(getRandomImage());
    }, 1000);   //  定时器

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []); // 空依赖数组确保只在组件挂载时运行一次

  return (
    <div className="container">
      {randomImage && <img src={randomImage} alt="Random Image" />}
    </div>
  );
};

export default OptionZX1Component;
