import React, { useEffect, useState } from 'react';
import '../css/OptionSD4Component.css'; // 导入样式文件

const OptionSD4Component = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 读文件
        const response = await fetch('/TXT/sudu.txt');
        const data = await response.text();

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

  return (
    <div className="gray-text">
      {lines.map((line, index) => (
        <p key={index} className="text-content">
          {line}
        </p>
      ))}
    </div>
  );
};

export default OptionSD4Component;
