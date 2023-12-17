// 发散箭头
import React from 'react';
import { getFont, getPath } from '../constant';

import '../css/Option01Component.css'; // 导入样式文件

const Option01Component = () => {
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement); 
  return(
  <div id="mygif">
      <img src={require('../asset/gif1.gif').default} alt="error" />

  </div>
    );

  // return (
  // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //   <img src={require('../asset/gif1.gif')} alt="error" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  // </div>
    
};

export default Option01Component;