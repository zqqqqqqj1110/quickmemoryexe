import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';

const OptionZX4Component = () => {
  const [squareColor, setSquareColor] = useState('red');

  const changeColor = (color) => {
    setSquareColor(color);
  };

  const squareStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: squareColor,
    margin: 'auto',
    position: 'relative',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '5%',
    left: '1%',
  };

  return (
    <Row style={{ height: '100vh', backgroundColor: 'white', position: 'relative' }}>
      <Col span={24} style={buttonContainerStyle}>
        <Button onClick={() => changeColor('red')} type="primary">
          红色
        </Button>
        <Button onClick={() => changeColor('yellow')} type="primary">
          黄色
        </Button>
        <Button onClick={() => changeColor('blue')} type="primary">
          蓝色
        </Button>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <div style={squareStyle}></div>
      </Col>
    </Row>
  );
};

export default OptionZX4Component;
