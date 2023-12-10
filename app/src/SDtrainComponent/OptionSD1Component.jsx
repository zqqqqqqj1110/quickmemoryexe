import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import '../css/OptionSD1Component.css';
import { useFileContext, FileProvider } from '../FileContext';
import { getFont, getPath } from '../constant';
import FormSettingContext from './FomSettingContext';

const OptionSD1Component = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [position, setPosition] = useState('top-left'); // 控制位置
    const { selectedFileName } = useFileContext();

    const [data, setData] = useState({ fontsize: '', timegap: null });
    const timer = useRef(null);

    const onSummit = useCallback((value) => {
        setData(value);
    }, []);

    useEffect(() => {
       
        const fontPath = `/Font/1.ttf`;
        const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(fontFaceRule));
        document.head.appendChild(styleElement);
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
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(
                fetchData,
                data.timegap ? Number(data.timegap) * 1000 : 1000
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

            // 移除所有换行符
            data = data.replace(/\n/g, '');

            // 字符数范围（8-12）
            const charsPerLine = Math.floor(Math.random() * 5) + 8;

            // 计算总字符数
            const totalChars = charsPerLine * 3;

            // 计算下一个要显示的文本
            const nextText = data.slice(startIndex, startIndex + totalChars);

            // 分成三行
            const lines = [];
            for (let i = 0; i < 3; i++) {
                lines.push(nextText.slice(i * charsPerLine, (i + 1) * charsPerLine));
            }

            // 更新显示的文本和起始索引
            setDisplayText(lines.join('\n'));
            setStartIndex((startIndex + totalChars) % data.length);

            // 切换位置
            setPosition((prevPosition) => getNextPosition(prevPosition));
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
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [startIndex, selectedFileName, data.timegap]);

    const getNextPosition = (prevPosition) => {
        // 定义六个位置，循环
        const positions = [
            'top-right',
            'top-left',
            'middle-left',
            'middle-right',
            'bottom-left',
            'bottom-right',
        ];
        const currentIndex = positions.indexOf(prevPosition);
        const nextIndex = (currentIndex + 1) % positions.length;
        const nextPosition = positions[nextIndex];

        console.log('prevPosition:', prevPosition);
        console.log('nextPosition:', nextPosition);

        return nextPosition;
    };

    return (
        <FormSettingContext onSummit={onSummit} onReset={onReset} clearTimer={clearTimer}>
            <div className={`text-container ${position}`}>
                <p
                    className="text-content"
                    style={{
                        whiteSpace: 'pre-line',
                        fontSize: data.fontsize ? data.fontsize + 'rem' : '2rem',
                    }}
                >
                    {displayText}
                </p>
            </div>
        </FormSettingContext>
    );
};

export default OptionSD1Component;
