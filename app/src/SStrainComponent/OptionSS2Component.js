import React, { useEffect, useState } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { getFont, getPath } from '../constant';


const OptionSS2Component = () => {
  const [randomChars, setRandomChars] = useState('');
  // 设置字体路径
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement);  



  useEffect(() => {
    // 每隔nms执行
    const intervalId = setInterval(() => {
      // 读文件
      fetch('/TXT/common.txt')
        .then(response => response.text())
        .then(data => {
          // 将文本内容转化为字数组
          const charArray = data.split('');

          // 随机选择4-6字
          const randomCount = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
          const randomChars = charArray
            .sort(() => Math.random() - 0.5) // 随机排序
            .slice(0, randomCount) // 切片取随机数量的字母
            .join(''); // 连接成字符串

          setRandomChars(randomChars);
        })
        .catch(error => console.error('Error reading file:', error));
    }, 1000); // 时间间隔

    // 清理定时器
    return () => clearInterval(intervalId);
  }, []); // 依赖数组设空

  return (
    <div className="text">
      {randomChars}
    </div>
  );
};

export default OptionSS2Component;
