import React from 'react';
import { Button } from 'antd';

const Quanping = () => {
  const handleClick = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  const centerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  return (
    <div style={centerContainerStyle}>
      <style>
        {`
          /* CSS 样式直接嵌入在这里 */
          .ant-btn {
            /* 你可以在这里添加额外的按钮样式 */
          }
        `}
      </style>

      <Button type="primary" size="large" onClick={handleClick}>
        点击全屏
      </Button>
    </div>
  );
};

export default Quanping;
