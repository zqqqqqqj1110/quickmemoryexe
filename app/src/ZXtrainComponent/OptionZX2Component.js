import React, { useState, useEffect } from 'react';
import '../css/OptionZX2Component.css'

const OptionZX2Component = () => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const loadRandomImages = () => {
      // 获取public/ZXpic文件夹中的所有PNG图像文件
      const importAll = (r) => r.keys().map(r);
      const images = importAll(require.context('../../public/ZXpic', false, /\.(png)$/));

      // 随机选择9张图像
      const randomIndexes = [];
      while (randomIndexes.length < 9) {
        const randomIndex = Math.floor(Math.random() * images.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      const randomImagePaths = randomIndexes.map((index) => images[index]);

      // 设置随机选择的9张图像路径
      setRandomImages(randomImagePaths);
    };

    // 初始加载一次
    loadRandomImages();

    // 每隔1000ms切换一次图像
    const intervalId = setInterval(() => {
      loadRandomImages();
    }, 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []); // 空依赖数组确保只在组件挂载时运行一次

  return (
    <div className="container">
      {randomImages.map((image, index) => (
        <img key={index} src={image} alt={`Random Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default OptionZX2Component;
