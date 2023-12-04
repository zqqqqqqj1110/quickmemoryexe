// 发散箭头
import React from 'react';
import FileSelect from './Set/FileSelect';
import '../css/Option01Component.css'; // 导入样式文件

const Option01Component = () => {
  return(
  <div id="mygif">
      <img src={require('../asset/gif1.gif')} alt="error" />

  </div>
    );

  // return (
  // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //   <img src={require('../asset/gif1.gif')} alt="error" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  // </div>
    
};

export default Option01Component;