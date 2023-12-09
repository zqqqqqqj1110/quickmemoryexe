import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import '../css/OptionSS1Component.css'; // 导入样式文件
import { getFont, getPath } from '../constant';
import FormSettingContext from './FomSettingContext';
const OptionSS1Component = () => {
    const [randomChar, setRandomChar] = useState('');
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
                    fetch('/TXT/common.txt')
                        .then((response) => response.text())
                        .then((data) => {
                            const charArray = data.split('');
                            const randomIndex = Math.floor(Math.random() * charArray.length);
                            const randomChar = charArray[randomIndex];
                            setRandomChar(randomChar);
                        })
                        .catch((error) => console.error('Error reading file:', error));
                },
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(
                () => {
                    fetch('/TXT/common.txt')
                        .then((response) => response.text())
                        .then((data) => {
                            const charArray = data.split('');
                            const randomIndex = Math.floor(Math.random() * charArray.length);
                            const randomChar = charArray[randomIndex];
                            setRandomChar(randomChar);
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
        // beginTimer();

        // const intervalId = setInterval(() => {
        //     fetch('/TXT/common.txt')
        //         .then((response) => response.text())
        //         .then((data) => {
        //             const charArray = data.split('');
        //             const randomIndex = Math.floor(Math.random() * charArray.length);
        //             const randomChar = charArray[randomIndex];
        //             setRandomChar(randomChar);
        //         })
        //         .catch((error) => console.error('Error reading file:', error));
        // }, 1000);

        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, []);

    useEffect(() => {
        beginTimer();
    }, [data.timegap]);

    return (
        <FormSettingContext onSummit={onSummit} onReset={onReset} clearTimer={clearTimer}>
            {/*   <div className="text">      {randomChar}    </div> */}
            <div
                className="text"
                style={{ fontSize: data.fontsize ? data.fontsize + 'rem' : '10rem' }}
            >
                {randomChar}
            </div>
        </FormSettingContext>
    );
};

export default OptionSS1Component;
