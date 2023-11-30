import React, { useState, useEffect } from 'react';

const OptionSS1Component = () => {
  const [randomCharacter, setRandomCharacter] = useState('');

  useEffect(() => {
    const getRandomCharacter = async () => {
      try {
        // 获取文件
        const response = await fetch('../../public/TXT/common.txt');
        const text = await response.text();

        // 分割为字符数组
        const chineseCharacters = text.trim().split('');

        // 随机选择一个字
        const randomIndex = Math.floor(Math.random() * chineseCharacters.length);
        const randomChar = chineseCharacters[randomIndex];

        setRandomCharacter(randomChar);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    // 调用异步函数
    getRandomCharacter();

    // 定时器
    const intervalId = setInterval(getRandomCharacter, 1000); // 1000毫秒（1秒）


    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      单字闪现: {randomCharacter}
    </div>
  );
};

export default OptionSS1Component;
