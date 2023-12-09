import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { getFont, getPath } from '../constant';
import FormSettingContext from './FomSettingContext';

const OptionSS2Component = () => {
    const [randomChars, setRandomChars] = useState('');
    const [data, setData] = useState({ fontsize: '', timegap: null });
    const timer = useRef(null);

    const onSummit = useCallback((value) => {
        setData(value);
    }, []);

    const onReset = useCallback(() => {
        setData({});
        beginTimer();
    }, []);

    const clearTimer = (type) => {
        // 继续
        if (type === 'continue') {
            beginTimer();
        }
        // 暂停
        else {
            clearInterval(timer.current);
        }
    };

    const beginTimer = () => {
        if (!timer.current) {
            timer.current = setInterval(
                () => {
                    // 读文件
                    fetch('/TXT/common.txt')
                        .then((response) => response.text())
                        .then((data) => {
                            // 将文本内容转化为字数组
                            const charArray = data.split('');

                            // 随机选择4-6字
                            const randomCount = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
                            const randomChars = charArray
                                .sort(() => Math.random() - 0.5) // 随机排序
                                .slice(0, randomCount) // 切片取随机数量的字母
                                .join(''); // 连接成字符串

                            setRandomChars(randomChars);
                        })
                        .catch((error) => console.error('Error reading file:', error));
                },
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(
                () => {
                    // 读文件
                    fetch('/TXT/common.txt')
                        .then((response) => response.text())
                        .then((data) => {
                            // 将文本内容转化为字数组
                            const charArray = data.split('');

                            // 随机选择4-6字
                            const randomCount = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
                            const randomChars = charArray
                                .sort(() => Math.random() - 0.5) // 随机排序
                                .slice(0, randomCount) // 切片取随机数量的字母
                                .join(''); // 连接成字符串

                            setRandomChars(randomChars);
                        })
                        .catch((error) => console.error('Error reading file:', error));
                },
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        }
    };

    useEffect(() => {
        // 设置字体路径
        const fontPath = `/Font/${getFont()}`;
        // console.log(fontPath)
        // const fontPath = `/Font/1.ttf`;
        const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(fontFaceRule));
        document.head.appendChild(styleElement);
        // 清理定时器
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, []); // 依赖数组设空

    useEffect(() => {
        beginTimer();
    }, [data.timegap]);

    return (
        <FormSettingContext onSummit={onSummit} onReset={onReset} clearTimer={clearTimer}>
            <div
                className="text"
                style={{ fontSize: data.fontsize ? data.fontsize + 'rem' : '8rem' }}
            >
                {randomChars}
            </div>
        </FormSettingContext>
    );
};

export default OptionSS2Component;
