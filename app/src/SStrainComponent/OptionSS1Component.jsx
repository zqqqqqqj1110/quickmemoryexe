import React, { useEffect, useState } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { FontContext } from '../SetComponent'; // 导入 FontContext

const OptionSS1Component = () => {
  const [randomChar, setRandomChar] = useState('');

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
