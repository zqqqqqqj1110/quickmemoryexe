import React, { useEffect, useState } from 'react';
import '../css/OptionSD4Component.css';
import { getFont, getPath } from '../constant';

const OptionSD4Component = () => {
  const [lines, setLines] = useState([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement); 

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

        // 设置字体路径
        const fontPath = `/Font/${getFont()}`;
        // console.log(fontPath)
        // const fontPath = `/Font/1.ttf`;
        const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(fontFaceRule));
        document.head.appendChild(styleElement);

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
