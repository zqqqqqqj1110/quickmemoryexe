import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import App from './menutop';
import { useNavigate } from 'react-router-dom'; // 修改为 useNavigate
import './css/LogPage.css';

const LogPage = () => {
  const navigate = useNavigate(); // 修改为 useNavigate
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
      {/* ... 其他表单项 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LogPage;
