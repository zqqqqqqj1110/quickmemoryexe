import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/LogPage.css';

const LogPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isVip, setIsVip] = useState(false); // 新增状态来保存用户的 VIP 状态

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);

    try {
      // 发送登录请求，获取用户的 VIP 状态
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setIsVip(data.isVip);

        // 登录成功后跳转到 '/app' 页面
        navigate('/app');
      } else {
        // 登录失败的处理，可以显示错误信息等
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
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
  );
};

export default LogPage;
