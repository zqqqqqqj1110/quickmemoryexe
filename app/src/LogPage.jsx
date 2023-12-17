import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/LogPage.css';
import { setAccount, setPass } from './constant';

const LogPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isVip, setIsVip] = useState(false);

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);
    // 传递
    setAccount(values.username);
    setPass(values.password);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setIsVip(data.isVip);

        if (data.time === 0) {
          const timeResponse = await fetch('/api/check-time', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (timeResponse.ok) {
            const timeData = await timeResponse.json();
            if (timeData.time === 0) {
              console.log('试用已结束！');
              return;
            }
          } else {
            console.error('Check time failed:', timeResponse.statusText);
          }
        }

        navigate('/app');
      } else {
        console.error('Login failed:', response.statusText);
        message.error('试用期已结束/密码输入错误');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <div className='img'></div>
      <div className="top-rectangle"></div>
      <div className="bottom-rectangle"></div>
      <div className="login-container">
        <div className="login-title">登录页面</div>
    
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录/注册
            </Button>
          </Form.Item>
        </Form>

        {isVip && (
          <div>
            {/* 用户是 VIP 的状态展示 */}
            <p>欢迎，VIP用户！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPage;
