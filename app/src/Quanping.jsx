import React, { useState } from 'react';
import { Button } from 'antd';

const Quanping = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleClick = () => {
    if (!isFullScreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    setIsFullScreen(false);
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
        {isFullScreen ? '退出全屏' : '点击全屏'}
      </Button>
    </div>
  );
};

export default Quanping;
