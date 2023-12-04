//两侧向下

import React from 'react';
import { getFont, getPath } from '../constant';

const Option12Component = () => {
  const fontPath = `/Font/${getFont()}`;
  // console.log(fontPath)
  // const fontPath = `/Font/1.ttf`;
  const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(fontFaceRule));
  document.head.appendChild(styleElement); 
  return(
    <div id="mygif">
        <img src={require('../asset/gif12.gif')} alt="error" />
    </div>
      );
};

export default Option12Component;