import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import FormSettingContext from './FomSettingContext';
import { getFont, getPath } from '../constant';
import { Form, Input, InputNumber, Button } from 'antd';
import { PlaySquareTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import '../css/OptionSD4Component.css';

const OptionSD4Component = () => {
    const [lines, setLines] = useState([]);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [data, setData] = useState({ fontsize: '', timegap: null });
    const timer = useRef(null);

    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [isPause, setIsPause] = useState(false);
    const adjustData = () => {
        let data = form.getFieldsValue();
        setFormData(data);
        onSummit(data);
    };
    const resetData = () => {
        form.resetFields();
        setFormData({});
        setIsPause(false);
        onReset();
    };
    const pause = () => {
        // 继续
        if (isPause) {
            clearTimer('continue');
        }
        // 暂停
        else {
            clearTimer('pause');
        }
        setIsPause(!isPause);
    };

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

    useEffect(() => {
        const fontPath = `/Font/${getFont()}`;
        // console.log(fontPath)
        // const fontPath = `/Font/1.ttf`;
        const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(fontFaceRule));
        document.head.appendChild(styleElement);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 构建文件路径
                const g = getPath();
                const filePath = `/TXT/${g}`;
                console.log(filePath); //日记

                // 读取文件
                const response = await fetch(filePath);
                let data = await response.text();

                // 将文本按行切分
                const linesArray = data.split('\n');

                // 更新显示的文本
                setLines(linesArray);

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

        fetchData(); // 在组件加载时执行一次
    }, []);

    const beginTimer = () => {
        if (!timer.current) {
            timer.current = setInterval(
                () => {
                    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % lines.length);
                },
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(
                () => {
                    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % lines.length);
                },
                data.timegap ? Number(data.timegap) * 1000 : 1000
            );
        }
    };

    useEffect(() => {
        beginTimer();

        // const colorChangeInterval = setInterval(() => {
        //     setCurrentColorIndex((prevIndex) => (prevIndex + 1) % lines.length);
        // }, 1000); // 颜色切换的间隔时间

        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [lines, data.timegap]);

    return (
        <>
            <div className="gray-text" style={{ maxHeight: '95vh' }}>
                {lines.map((line, index) => (
                    <p
                        key={index}
                        className={`text-content ${
                            index === currentColorIndex ? 'black-text' : ''
                        }`}
                        style={{
                            fontSize: data.fontsize ? data.fontsize + 'rem' : '0.8rem',
                        }}
                    >
                        {line}
                    </p>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    position: 'fixed',
                    bottom: '1rem',
                    width: '100vw',
                }}
            >
                <Form form={form} labelAlign={'right'} layout={'inline'}>
                    <Form.Item name={'fontsize'} label="字体大小（rem）">
                        <InputNumber max={2}></InputNumber>
                    </Form.Item>
                    <Form.Item name={'timegap'} label="间隔时间（s）">
                        <InputNumber max={10}></InputNumber>
                    </Form.Item>
                </Form>
                <Button onClick={adjustData} type="primary" style={{ marginRight: '20px' }}>
                    调整
                </Button>
                <Button onClick={resetData} style={{ marginRight: '20px' }}>
                    重置
                </Button>

                <Button
                    icon={isPause ? <PlaySquareTwoTone /> : <PauseCircleTwoTone />}
                    onClick={pause}
                    type="primary"
                >
                    {isPause ? '继续' : '暂停'}
                </Button>
            </div>
            {/* <FormSettingContext
                onSummit={onSummit}
                onReset={onReset}
                clearTimer={clearTimer}
                style={{}}
            ></FormSettingContext> */}
        </>
    );
};

export default OptionSD4Component;
