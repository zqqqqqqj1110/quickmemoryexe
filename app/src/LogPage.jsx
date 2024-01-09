import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/LogPage.css';
import { setAccount, setPass, setclassify, setls_admin } from './constant';

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
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setIsVip(data.isVip);
        const lsAdmin = data.lsAdmin;
        const classify = data.classify;

        // 在这里可以使用 lsAdmin 和 classify 的值
        console.log('ls_admin:', lsAdmin);
        console.log('classify:', classify);

        //传递
        setclassify(classify);
        setls_admin(lsAdmin);

        navigate('/app');
      } else {
        // 处理登录失败的情况
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
      </div>
    </div>
  );
};

export default LogPage;
