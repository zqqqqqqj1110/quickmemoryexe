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
import Option21Component from './XXtrainComponent/Option21Component';
import Option22Component from './XXtrainComponent/Option22Component';
import Option23Component from './XXtrainComponent/Option23Component';
import Option31Component from './XXtrainComponent/Option31Component';
import Option32Component from './XXtrainComponent/Option32Component';
import Option33Component from './XXtrainComponent/Option33Component';
import Option41Component from './XXtrainComponent/Option41Component';
import Option42Component from './XXtrainComponent/Option42Component';
import Option43Component from './XXtrainComponent/Option43Component';
import Option51Component from './XXtrainComponent/Option51Component';
import OptionSS1Component from './SStrainComponent/OptionSS1Component';
import OptionSS2Component from './SStrainComponent/OptionSS2Component';
import OptionSS3Component from './SStrainComponent/OptionSS3Component';
import OptionSS4Component from './SStrainComponent/OptionSS4Component';
import OptionSD1Component from './SDtrainComponent/OptionSD1Component';
import OptionSD2Component from './SDtrainComponent/OptionSD2Component';
import OptionSD3Component from './SDtrainComponent/OptionSD3Component';
import OptionSD4Component from './SDtrainComponent/OptionSD4Component';
import OptionZX1Component from './ZXtrainComponent/OptionZX1Component';
import OptionZX2Component from './ZXtrainComponent/OptionZX2Component';
import OptionZX3Component from './ZXtrainComponent/OptionZX3Component';
import OptionZX4Component from './ZXtrainComponent/OptionZX4Component';
import OptionZX5Component from './ZXtrainComponent/OptionZX5Component';
import SetComponent from './SetComponent';

const items = [
    {
        label: '形象训练上',
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
                    },
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
                    },
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
                    },
                ],
            },
            
        ],
    },

    {
        label: '形象训练下',
        key: 'XXXtrain',
        icon: <SettingOutlined />,
        children: [
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
                    },
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
        ]
    },

    {
        label: '闪视训练',
        key: 'SStrain',
        icon: <SettingOutlined />,
        children: [
            {
                label: '单字闪现',
                key: 'SS1',
            },
            {
                label: '成语闪现',
                key: 'SS2',
            },
            {
                label: '古诗词闪现',
                key: 'SS3',
            },
            {
                label: '句子闪现',
                key: 'SS4',
            },
        ],
    },

    // {
    //     label: '速读训练',
    //     key: 'SDtrain',
    //     icon: <SettingOutlined />,
    //     children: [
    //         {
    //             label: '子块移动',
    //             key: 'SD1',
    //         },
    //         {
    //             label: '闪读训练',
    //             key: 'SD3',
    //         },
    //         {
    //             label: '实战训练',
    //             key: 'SD4',
    //         },
    //     ],
    // },

    {
        label: '照相记忆',
        key: 'ZXtrain',
        icon: <SettingOutlined />,
        children: [
            {
                label: '书法图片训练',
                key: 'ZX1',
            },
            {
                label: '记忆训练',
                key: 'ZX2',
            },
            {
                label: '黄卡训练',
                key: 'ZX3',
            },
            {
                label: '三色卡训练',
                key: 'ZX4',
            },
            {
                label: '曼陀罗卡片训练',
                key: 'ZX5',
            },
        ],
    },

    {
        label: '训练设置',
        key: 'set',
    },
];
const App = () => {
    const [current, setCurrent] = useState('mail');
    const [selectedSubMenu, setSelectedSubMenu] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
  
    const onClick = (e) => {
      console.log('click ', e);
      if (e.key === 'collapse') {
        setCollapsed(!collapsed);
      } else {
        setCurrent(e.key);
        setSelectedSubMenu(e.key);
      }
    };
  
    const renderContent = () => {
      if (collapsed) {
        return null; // 如果收起状态，不渲染任何内容
      }
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
            case '21':
                return <Option21Component />;
            case '22':
                return <Option22Component />;
            case '23':
                return <Option23Component />;
            case '31':
                return <Option31Component />;
            case '32':
                return <Option32Component />;
            case '33':
                return <Option33Component />;
            case '41':
                return <Option41Component />;
            case '42':
                return <Option42Component />;
            case '43':
                return <Option43Component />;
            case '51':
                return <Option51Component />;
            case 'SS1':
                return <OptionSS1Component />;
            case 'SS2':
                return <OptionSS2Component />;
            case 'SS3':
                return <OptionSS3Component />;
            case 'SS4':
                return <OptionSS4Component />;
            case 'SD1':
                return <OptionSD1Component />;
            case 'SD2':
                return <OptionSD2Component />;
            case 'SD3':
                return <OptionSD3Component />;
            case 'SD4':
                return <OptionSD4Component />;
            case 'ZX1':
                return <OptionZX1Component />;
            case 'ZX2':
                return <OptionZX2Component />;
            case 'ZX3':
                return <OptionZX3Component />;
            case 'ZX4':
                return <OptionZX4Component />;
            case 'ZX5':
                return <OptionZX5Component />;
            case 'set':
                return <SetComponent />;
            // 添加其他 case 语句以处理其他子菜单
            default:
                return null;
        }
    };

    return (
        <div>
          <Menu onClick={onClick} selectedKeys={[current]} mode={collapsed ? 'vertical' : 'horizontal'} items={items} />
          {renderContent()}
        </div>
      );
    };

export default App;
