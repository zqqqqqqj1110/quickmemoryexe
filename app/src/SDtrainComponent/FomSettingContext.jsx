import React, { createContext, useContext, useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { PlaySquareTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import './index.css';

const FomSettingContext = ({ onSummit, onReset, clearTimer, children,style={} }) => {
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
        setIsPause(false)
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
    return (
        <div className="form-setting" style={style}>
            <div className="form-setting-form">
                <Form form={form} labelAlign={'right'}>
                    <Form.Item name={'fontsize'} label="字体大小（rem）">
                        <InputNumber max={2} min={1}></InputNumber>
                    </Form.Item>
                    <Form.Item name={'timegap'} label="间隔时间（s）">
                        <InputNumber max={10} min={0.1}></InputNumber>
                    </Form.Item>
                </Form>
                <div style={{marginTop:'3rem'}}>
                    <Button onClick={adjustData} type="primary" style={{ marginRight: '20px' }}>
                        调整
                    </Button>
                    <Button onClick={resetData} style={{ marginRight: '20px' }}>
                        重置
                    </Button>
                </div>

                <br></br>
                <Button
                    icon={isPause ? <PlaySquareTwoTone /> : <PauseCircleTwoTone />}
                    onClick={pause}
                    type="primary"
                >
                    {isPause ? '继续' : '暂停'}
                </Button>
            </div>
            <div className="form-setting-content">{children}</div>
        </div>
    );
};

export default React.memo(FomSettingContext);
