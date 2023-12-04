import React, { useEffect, useState } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { getFont, getPath } from '../constant';

const OptionSS1Component = () => {
  const [randomChar, setRandomChar] = useState('');
  // 设置字体路径
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/TXT/common.txt')
        .then(response => response.text())
        .then(data => {
          const charArray = data.split('');
          const randomIndex = Math.floor(Math.random() * charArray.length);
          const randomChar = charArray[randomIndex];
          setRandomChar(randomChar);
        })
        .catch(error => console.error('Error reading file:', error));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text">
      {randomChar}
    </div>
  );
};

export default OptionSS1Component;
