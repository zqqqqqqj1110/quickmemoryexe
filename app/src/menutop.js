import React, { useState } from 'react';
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import Option5Component from './showcomponent/Option5Component';
import Option6Component from './showcomponent/Option6Component';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// n级菜单
//改名操作：getItem('流畅度', '5'),
const items = [
  getItem('一级菜单1', '1', <MailOutlined />),
  getItem('一级菜单2', '2', <CalendarOutlined />, [
    getItem('二级菜单1', '3'),
    getItem('二级菜单2', '4'),
    getItem('二级菜单3', 'sub1-2', <AppstoreOutlined />, [
      getItem('三级菜单1', '5'),
      getItem('三级菜单2', '6'),
    ]),
  ]),
  getItem('一级菜单3', 'sub2', <SettingOutlined />, [
    getItem('二级菜单4', '7'),
    getItem('二级菜单5', '8'),
    getItem('二级菜单6', '9'),
    getItem('二级菜单7', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design（超链接）
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

const Manu = () => {
  const [mode, setMode] = useState('vertical');
  const [theme, setTheme] = useState('light');
  const [selectedOption, setSelectedOption] = useState(null);

  const changeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleOptionClick = (key) => {
    setSelectedOption(key);
  };


  return (
    <>
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
        onClick={(e) => handleOptionClick(e.key)}
      />
      {/* 根据选中的菜单项渲染相应的组件 */}
      {selectedOption === '5' && <Option5Component />}
      {selectedOption === '6' && <Option6Component />}
    </>
  );
};

export default Manu;
