import React, { useEffect, useState } from 'react';
import '../css/OptionSD4Component.css';
import { getPath } from '../constant';

const OptionSD4Component = () => {
  const [lines, setLines] = useState([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 构建文件路径
        const g = getPath()
        const filePath = `/TXT/${g}`;
        console.log(filePath);    //日记

        // 读取文件
        const response = await fetch(filePath);
        let data = await response.text();

        // 将文本按行切分
        const linesArray = data.split('\n');

        // 更新显示的文本
        setLines(linesArray);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    fetchData(); // 在组件加载时执行一次
  }, []);

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 1000); // 颜色切换的间隔时间

    return () => {
      clearInterval(colorChangeInterval);
    };
  }, [lines]);

  return (
    <div className="gray-text">
      {lines.map((line, index) => (
        <p
          key={index}
          className={`text-content ${index === currentColorIndex ? 'black-text' : ''}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default OptionSD4Component;
