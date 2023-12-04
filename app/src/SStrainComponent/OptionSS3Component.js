import React, { useEffect, useState } from 'react';
import FileSelect from './Set/FileSelect';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { getFont, getPath } from '../constant';

const OptionSS3Component = () => {
  const [randomChengyu, setRandomChengyu] = useState('');
  // 设置字体路径
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement); 

  useEffect(() => {
    // 每隔1000ms执行
    const intervalId = setInterval(() => {
      // 读文件
      fetch('/TXT/chengyu.txt')
        .then(response => response.text())
        .then(data => {
          // 按逗号分隔
          const chengyuArray = data.split('，');

          // 随机选择成语
          const randomIndex = Math.floor(Math.random() * chengyuArray.length);
          const randomChengyu = chengyuArray[randomIndex];
          setRandomChengyu(randomChengyu);
        })
        .catch(error => console.error('Error reading file:', error));
    }, 1000); // 时间间隔

    // 清理定时器
    return () => clearInterval(intervalId);
  }, []); // 依赖数组设空

  return (
    <div className="text">
      {randomChengyu}
    </div>
  );
};

export default OptionSS3Component;
