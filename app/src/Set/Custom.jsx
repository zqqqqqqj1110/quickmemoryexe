import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Input, Button, Space, message, Form } from 'antd';
import { setPath, getclassify } from '../constant';

const Custom = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedIsVip, setUpdatedIsVip] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [updatedClassify, setUpdatedClassify] = useState('');
  const [updatedLsAdmin, setUpdatedLsAdmin] = useState('');
  const [form] = Form.useForm();
  const classify = getclassify();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://ymq.xqzyyds.top:3001/userList');
      console.log('Users from backend:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Reset the input fields when a new user is selected
    setUpdatedLsAdmin('');
    setUpdatedPassword('');
    setUpdatedClassify('');
    message.info(`选中用户: ${user.account}`);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://ymq.xqzyyds.top:3001/user/${selectedUser.id}`);
      fetchUsers();
      setSelectedUser(null);
      message.success('用户删除成功');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('删除用户失败');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUserData = {};

      // 只添加非空字段到更新数据对象
      if (updatedLsAdmin !== '') {
        updatedUserData.ls_admin = updatedLsAdmin;
      }

      if (updatedClassify !== '') {
        updatedUserData.classify = updatedClassify;
      }

      if (updatedPassword !== '') {
        updatedUserData.password = updatedPassword;
      }

      await axios.put(`http://ymq.xqzyyds.top:3001/updateUser/${selectedUser.id}`, updatedUserData);

      // 更新后刷新用户列表
      fetchUsers();
      message.success('用户信息更新成功');
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('更新用户信息失败');
    }
  };

  const handleAddUser = async (values) => {
    try {
      values.classify = classify;
      await axios.post('http://ymq.xqzyyds.top:3001/addUser', values);
      fetchUsers();
      message.success('用户添加成功');
      form.resetFields(); // 重置表单字段
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('添加用户失败');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>用户列表</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', margin: '10px 0' }}>添加用户</h3>
        <Form form={form} onFinish={handleAddUser}>
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 用户名：</label>
            <Form.Item name="account" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input type="text" />
            </Form.Item>
          </div>

          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 密码 值：</label>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input type="text" />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>添加用户</Button>
        </Form>
      </div>

      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item onClick={() => handleUserSelect(user)} style={{ cursor: 'pointer' }}>
            <Space direction="vertical">
              <p style={{ fontSize: '18px' }}>账号: {user.account}  密码: {user.password} 管理员: {user.ls_admin} 机构：{user.classify}</p>
            </Space>
          </List.Item>
        )}
      />

      {selectedUser && (
        <div>
          <h3 style={{ fontSize: '20px', margin: '10px 0' }}>选中用户</h3>
          <p style={{ fontSize: '18px' }}>{selectedUser.account}</p>

          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 密码 值：</label>
            <Input
              type="text"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
          </div>

          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 机构 值：</label>
            <Input
              type="text"
              value={updatedClassify}
              onChange={(e) => setUpdatedClassify(e.target.value)}
            />
          </div>

          <Button type="primary" onClick={handleUpdateUser} style={{ marginRight: '10px' }}>更新用户信息</Button>
          <Button type="danger" onClick={handleDeleteUser}>删除用户</Button>
        </div>
      )}
    </div>
  );
};

export default Custom;
