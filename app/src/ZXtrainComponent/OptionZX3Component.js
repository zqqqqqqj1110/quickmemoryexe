import React, { useState } from 'react';

const OptionZX4Component = () => {
  const [circleColor, setCircleColor] = useState('yellow');
  const [circleRadius, setCircleRadius] = useState(50);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [circleCount, setCircleCount] = useState(1);

  const handleColorChange = (event) => {
    setCircleColor(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setCircleRadius(Number(event.target.value));
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleCircleCountChange = (event) => {
    setCircleCount(Number(event.target.value));
  };

  const getRandomPosition = () => {
    const randomX = Math.random() * (window.innerWidth - 2 * circleRadius);
    const randomY = Math.random() * (window.innerHeight - 2 * circleRadius);
    return { left: `${randomX}px`, top: `${randomY}px` };
  };

  const circleContainerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  };

  const circleStyle = {
    width: `${2 * circleRadius}px`,
    height: `${2 * circleRadius}px`,
    backgroundColor: circleColor,
    borderRadius: '50%',
    position: 'absolute',
    ...getRandomPosition(),
  };

  const containerStyle = {
    background: backgroundColor,
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'white',
  };

  const controlsStyle = {
    marginBottom: '20px',
  };

  const colorPickerStyle = {
    marginRight: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <label>背景颜色：</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          style={colorPickerStyle}
        />
        <label>圆形颜色：</label>
        <input
          type="color"
          value={circleColor}
          onChange={handleColorChange}
          style={colorPickerStyle}
        />
        <label>半径：</label>
        <input
          type="number"
          value={circleRadius}
          onChange={handleRadiusChange}
          style={{ marginRight: '10px' }}
        />
        <label>数量：</label>
        <input
          type="number"
          value={circleCount}
          onChange={handleCircleCountChange}
          style={{ marginRight: '10px' }}
        />
      </div>
      <div style={circleContainerStyle}>
        {[...Array(circleCount)].map((_, index) => (
          <div key={index} style={{ ...circleStyle, ...getRandomPosition() }}></div>
        ))}
      </div>
    </div>
  );
};

export default OptionZX4Component;
