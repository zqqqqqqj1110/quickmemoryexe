import React, { useState } from 'react';
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import Option5Component from './Option5Component';
import Option6Component from './Option6Component';

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
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
    ]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
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
