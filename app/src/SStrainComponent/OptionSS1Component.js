import React, { useEffect, useState } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件

const OptionSS1Component = () => {
  const [randomChar, setRandomChar] = useState('');

  useEffect(() => {
    // 每隔nms执行
    const intervalId = setInterval(() => {
      // 读文件
      fetch('/TXT/common.txt')
        .then(response => response.text())
        .then(data => {
          // 将文本内容转化为字数组
          const charArray = data.split('');

          // 随机选择一个字
          const randomIndex = Math.floor(Math.random() * charArray.length);
          const randomChar = charArray[randomIndex];
          setRandomChar(randomChar);
        })
        .catch(error => console.error('Error reading file:', error));
    }, 1000); // 1000ms间隔

    // 清理定时器
    return () => clearInterval(intervalId);
  }, []); // 依赖数组设空

  return (
    <div className="text">
      {randomChar}
    </div>
  );
};

export default OptionSS1Component;
