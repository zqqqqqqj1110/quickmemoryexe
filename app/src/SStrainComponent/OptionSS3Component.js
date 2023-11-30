import React, { useEffect, useState } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件

const OptionSS3Component = () => {
  const [randomChengyu, setRandomChengyu] = useState('');

  useEffect(() => {
    // 每隔1000ms执行
    const intervalId = setInterval(() => {
      // 读文件
      fetch('/TXT/chengyu.txt') // 文件路径根据实际情况修改
        .then(response => response.text())
        .then(data => {
          // 将文本内容按中文逗号分隔成成语数组
          const chengyuArray = data.split('，');

          // 随机选择一个成语
          const randomIndex = Math.floor(Math.random() * chengyuArray.length);
          const randomChengyu = chengyuArray[randomIndex];
          setRandomChengyu(randomChengyu);
        })
        .catch(error => console.error('Error reading file:', error));
    }, 1000); // 1000ms间隔

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
