import React from 'react';
import FileSelect from './Set/FileSelect';
import FontSelect from './Set/FontSelect';
import Custom from './Set/Custom';
import CustomPer from './Set/CustomPer.jsx';
import { getAccount, getPass, getls_admin } from './constant.js'; // 导入全局变量

const SetComponent = () => {
  // 获取全局账号和密码
  const account = getAccount();
  const password = getPass();
  const admin = getls_admin();

  // 判断是否为 "admin"
  const isAdmin = account === 'admin' && password === 'admin';
  const notAdmin = admin === '1' && account != 'admin' && password != 'admin';
  console.log(notAdmin)

  return (
    <div>
      <h2>字体选择</h2>
      <FontSelect />
      <br />
      <br />
      <br />
      {/* 添加条件渲染 */}    
      {isAdmin && <Custom />}
      {notAdmin && <CustomPer />}

    </div>
  );
};

export default SetComponent;
