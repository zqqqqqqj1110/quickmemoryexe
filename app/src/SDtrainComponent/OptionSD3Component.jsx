// OptionSD3Component.jsx

import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import FormSettingContext from './FomSettingContext';

import '../css/OptionSD3Component.css';
import { getFont, getPath } from '../constant';

const OptionSD3Component = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [textList, setTextList] = useState([]);
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
                fetchData,
                data.timegap ? Number(data.timegap) * 1000 : 500
            );
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(
                fetchData,
                data.timegap ? Number(data.timegap) * 1000 : 500
            );
        }
    };

    const fetchData = async () => {
        try {
            // 构建文件路径
            const g = getPath();
            const filePath = `/TXT/${g}`;
            console.log(filePath); //日记

            // 读取文件
            const response = await fetch(filePath);
            let data = await response.text();

            // 移除换行符
            data = data.replace(/\n/g, '');

            // 每行字符数范围(6-10)
            const charsPerLine = Math.floor(Math.random() * 5) + 6;

            // 计算总字符数
            const totalChars = charsPerLine;

            // 计算下一hang文本
            const nextText = data.slice(startIndex, startIndex + totalChars);

            // 更新并保留历史文本
            setTextList((prevList) => {
                // If textList reaches a certain length, reset it
                if (prevList.length >= 10) {
                    return [nextText];
                }
                return [...prevList, nextText];
            });

            // 更新起始索引
            setStartIndex((startIndex + totalChars) % data.length);

            // 设置字体路径
            const fontPath = `/Font/${getFont()}`;
            // console.log(fontPath)
            // const fontPath = `/Font/1.ttf`;
            const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

            const styleElement = document.createElement('style');
            styleElement.appendChild(document.createTextNode(fontFaceRule));
            document.head.appendChild(styleElement);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };
    useEffect(() => {
        beginTimer();

        // const intervalId = setInterval(fetchData, 500); // 时间间隔

        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [startIndex, data.timegap]);

    useEffect(() => {
        const fontPath = `/Font/${getFont()}`;
        // console.log(fontPath)
        // const fontPath = `/Font/1.ttf`;
        const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(fontFaceRule));
        document.head.appendChild(styleElement);
    }, []);

    return (
        <FormSettingContext onSummit={onSummit} onReset={onReset} clearTimer={clearTimer}>
            <div className="pre-container" style={{ maxHeight: '95vh', overflow: 'hidden' }}>
                {textList.map((text, index) => (
                    <pre
                        key={index}
                        className={index === textList.length - 1 ? 'visible' : 'hidden'}
                        style={{
                            fontSize: data.fontsize ? data.fontsize + 'rem' : '2rem',
                        }}
                    >
                        {text}
                    </pre>
                ))}
            </div>
        </FormSettingContext>
    );
};

export default OptionSD3Component;
