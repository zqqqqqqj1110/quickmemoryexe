import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Option01Component from './XXtrainComponent/Option01Component';
import Option02Component from './XXtrainComponent/Option02Component';
import Option03Component from './XXtrainComponent/Option03Component';
import Option04Component from './XXtrainComponent/Option04Component';
import Option05Component from './XXtrainComponent/Option05Component';
import Option06Component from './XXtrainComponent/Option06Component';
import Option07Component from './XXtrainComponent/Option07Component';
import Option08Component from './XXtrainComponent/Option08Component';
import Option09Component from './XXtrainComponent/Option09Component';
import Option11Component from './XXtrainComponent/Option11Component';
import Option12Component from './XXtrainComponent/Option12Component';
import Option13Component from './XXtrainComponent/Option13Component';

const items = [
  {
    label: '形象训练',
    key: 'XXtrain',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: '整体感知训练',
        children: [
          {
            label: '发散箭头',
            key: '01',
          },
          {
            label: '扩大方框',
            key: '02',
          },
          {
            label: '扩大圆环',
            key: '03',
          },
          {
            label: '左右拓展',
            key: '04',
          },
          {
            label: '上下拓展',
            key: '05',
          },
          {
            label: '四周扩展',
            key: '06',
          },
          {
            label: '扩大圆周',
            key: '07',
          },
          {
            label: '展开向下',
            key: '08',
          },
          {
            label: '展开文字',
            key: '09',
          }
        ],
      },
      {
        type: 'group',
        label: '扩大视野训练',
        children: [
          {
            label: '水平拓展训练',
            key: '11',
          },
          {
            label: '两侧向下',
            key: '12',
          },
          {
            label: '随即闪现',
            key: '13',
          }
        ],
      },
      {
        type: 'group',
        label: '视读节奏训练',
        children: [
          {
            label: '水平移动',
            key: '21',
          },
          {
            label: '垂直移动',
            key: '22',
          },
          {
            label: '星形移动',
            key: '23',
          }
        ],
      },
      {
        type: 'group',
        label: '流畅度训练',
        children: [
          {
            label: '圆周训练',
            key: '31',
          },
          {
            label: '八字训练',
            key: '32',
          },
          {
            label: '曲线训练',
            key: '33',
          },
        ],
      },
      {
        type: 'group',
        label: '训练',
        children: [
          {
            label: '一点凝视',
            key: '41',
          },
          {
            label: '方形凝视',
            key: '42',
          },
          {
            label: '集中凝视',
            key: '43',
          }
        ],
      },
      {
        type: 'group',
        label: '舒尔特表训练',
        children: [
          {
            label: '中文',
            key: '51',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];
const App = () => {
  const [current, setCurrent] = useState('mail');
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    setSelectedSubMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedSubMenu) {
      case '01':
        return <Option01Component />;
      case '02':
        return <Option02Component />;
      case '03':
        return <Option03Component />;
      case '04':
        return <Option04Component />;
      case '05':
        return <Option05Component />;
      case '06':
        return <Option06Component />;
      case '07':
        return <Option07Component />;
      case '08':
        return <Option08Component />;
      case '09':
        return <Option09Component />;
      case '11':
        return <Option11Component />;
      case '12':
        return <Option12Component />;
      case '13':
        return <Option13Component />;
      // 添加其他 case 语句以处理其他子菜单
      default:
        return null;
    }
  };

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {renderContent()}
    </div>
  );
};

export default App;