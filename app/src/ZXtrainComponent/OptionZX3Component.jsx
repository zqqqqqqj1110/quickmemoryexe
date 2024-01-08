import React, { useState } from 'react';

const OptionZX3Component = () => {
  const [circleColor, setCircleColor] = useState('yellow');
  const [circleRadius, setCircleRadius] = useState(50);
  const [backgroundColor, setBackgroundColor] = useState('black');

  const handleColorChange = (event) => {
    setCircleColor(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setCircleRadius(Number(event.target.value));
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const circleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',  // Adjusted height to leave space for controls
    background: backgroundColor,
    flexDirection: 'column',
  };

  const circleStyle = {
    width: `${2 * circleRadius}px`,
    height: `${2 * circleRadius}px`,
    backgroundColor: circleColor,
    borderRadius: '50%',
    marginBottom: '20px',
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
  };

  const colorPickerStyle = {
    marginRight: '10px',
  };

  return (
    <div>
      <div style={circleContainerStyle}>
        <div style={circleStyle}></div>
      </div>
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
      </div>
    </div>
  );
};

export default OptionZX3Component;
