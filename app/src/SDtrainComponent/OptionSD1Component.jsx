import React, { useEffect, useState } from 'react';
import '../css/OptionSD1Component.css';
import { useFileContext, FileProvider } from '../FileContext';

const OptionSD1Component = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [position, setPosition] = useState('top-left'); // 控制位置
  const { selectedFileName } = useFileContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 构建文件路径
        console.log('传递路径:', selectedFileName);
        const filePath = `TXT/${selectedFileName}.txt`;
        console.log(filePath);

        // 读取文件
        const response = await fetch(filePath);
        let data = await response.text();

        // 移除所有换行符
        data = data.replace(/\n/g, '');

        // 字符数范围（8-12）
        const charsPerLine = Math.floor(Math.random() * 5) + 8;

        // 计算总字符数
        const totalChars = charsPerLine * 3;

        // 计算下一个要显示的文本
        const nextText = data.slice(startIndex, startIndex + totalChars);

        // 分成三行
        const lines = [];
        for (let i = 0; i < 3; i++) {
          lines.push(nextText.slice(i * charsPerLine, (i + 1) * charsPerLine));
        }

        // 更新显示的文本和起始索引
        setDisplayText(lines.join('\n'));
        setStartIndex((startIndex + totalChars) % data.length);

        // 切换位置
        setPosition((prevPosition) => getNextPosition(prevPosition));
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // 时间间隔

    return () => clearInterval(intervalId);
  }, [startIndex, selectedFileName]);

  const getNextPosition = (prevPosition) => {
    // 定义六个位置，循环
    const positions = ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'];
    const currentIndex = positions.indexOf(prevPosition);
    const nextIndex = (currentIndex + 1) % positions.length;
    return positions[nextIndex];
  };

  return (
    <div className={`text-container ${position}`}>
      <p className="text-content" style={{ whiteSpace: 'pre-line' }}>
        {displayText}
      </p>
    </div>
  );
};

export default OptionSD1Component;
