import React from 'react';
import FileSelect from './Set/FileSelect';
import FontSelect from './Set/FontSelect';
import Custom from './Set/Custom';
import { getAccount, getPass } from './constant'; // 导入全局变量

const Option03Component = () => {
  // 获取全局账号和密码
  const account = getAccount();
  const password = getPass();

  // 判断是否为 "admin"
  const isAdmin = account === 'admin' && password === 'admin';

  return (
    <div>
      <h2>文本选择</h2>
      <FileSelect />
      <br />
      <br />
      <br />
      <h2>字体选择</h2>
      <FontSelect />
      <br />
      <br />
      <br />
      {/* 添加条件渲染 */}    
      {isAdmin && <p><Custom /></p>}
    </div>
  );
};

export default Option03Component;
