import React, { useState } from 'react';
import { Button, Input } from 'antd';

const OptionZX4Component = () => {
  const [squareColor, setSquareColor] = useState('red');
  const [squareSize, setSquareSize] = useState(100); // 初始大小

  const changeColor = (color) => {
    setSquareColor(color);
  };

  const changeSize = (size) => {
    setSquareSize(size);
  };

  const squareContainerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  };

  const squareStyle = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundColor: squareColor,
    margin: 'auto',
  };

  const buttonContainerStyle = {
    marginTop: '20px',
  };

  return (
    <div style={squareContainerStyle}>
      <div style={squareStyle}></div>
      <div style={buttonContainerStyle}>
        <Button onClick={() => changeColor('red')} type="primary">
          红色
        </Button>
        <Button onClick={() => changeColor('yellow')} type="primary">
          黄色
        </Button>
        <Button onClick={() => changeColor('blue')} type="primary">
          蓝色
        </Button>
        正方形大小：
        <Input
        type="number"
        placeholder="正方形大小"
        value={squareSize}
        onChange={(e) => changeSize(e.target.value)}
        style={{ marginTop: '10px', width: '100px', textAlign: 'center' }}
      />
      </div>
    </div>
  );
};

export default OptionZX4Component;
