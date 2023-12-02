import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/LogPage.css';

const LogPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);

    // 在这里执行登录逻辑，根据 values 处理登录操作
    // 模拟登录成功，实际情况中需要根据业务逻辑来判断是否登录成功
    const loginSuccess = true;

    if (loginSuccess) {
      // 登录成功后跳转到 '/app' 页面
      navigate('/app');
    } else {
      // 登录失败的处理，可以显示错误信息等
      console.log('Login failed. Please check your credentials.');
    }
  };

  return (
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
  );
};

export default LogPage;
