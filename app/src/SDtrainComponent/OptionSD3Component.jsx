import React, { useEffect, useState } from 'react';
import '../css/OptionSD3Component.css';

const OptionSD3Component = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [textList, setTextList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 读文件
        const response = await fetch('/TXT/sudu.txt');
        let data = await response.text();

        // 移除换行符
        data = data.replace(/\n/g, '');

        // 每行字符数范围(6-10)
        const charsPerLine = Math.floor(Math.random() * 5) + 6;

        // 计算总字符数
        const totalChars = charsPerLine;

        // 计算下一hang文本
        const nextText = data.slice(startIndex, startIndex + totalChars);

        // 更新并保留历史文本
        setTextList(prevList => [...prevList, nextText]);

        // 更新起始索引
        setStartIndex((startIndex + totalChars) % data.length);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // 时间间隔

    return () => clearInterval(intervalId);
  }, [startIndex]);

  return (
    <div>
      {textList.map((text, index) => (
        <pre key={index} className={index === textList.length - 1 ? 'visible' : 'hidden'}>
          {text}
        </pre>
      ))}
    </div>
  );
};

export default OptionSD3Component;
