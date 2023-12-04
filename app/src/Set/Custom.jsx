import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Input, Button, Space, message } from 'antd';

const Custom = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedIsVip, setUpdatedIsVip] = useState('');
  const [updatedTime, setUpdatedTime] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/userList');
      console.log('Users from backend:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Reset the input fields when a new user is selected
    setUpdatedIsVip('');
    setUpdatedTime('');
    message.info(`选中用户: ${user.account}`);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/user/${selectedUser.id}`);
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
      if (updatedIsVip !== '') {
        updatedUserData.is_vip = updatedIsVip;
      }

      if (updatedTime !== '') {
        updatedUserData.time = updatedTime;
      }

      await axios.put(`http://localhost:3001/updateUser/${selectedUser.id}`, updatedUserData);

      // 更新后刷新用户列表
      fetchUsers();
      message.success('用户信息更新成功');
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('更新用户信息失败');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>用户列表</h2>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item onClick={() => handleUserSelect(user)} style={{ cursor: 'pointer' }}>
            <Space direction="vertical">
              <p style={{ fontSize: '18px' }}>账号: {user.account}  VIP: {user.is_vip}  剩余使用次数: {user.time}</p>
            </Space>
          </List.Item>
        )}
      />

      {selectedUser && (
        <div>
          <h3 style={{ fontSize: '20px', margin: '10px 0' }}>选中用户</h3>
          <p style={{ fontSize: '18px' }}>{selectedUser.account}</p>
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 VIP 值：</label>
            <Input
              type="text"
              value={updatedIsVip}
              onChange={(e) => setUpdatedIsVip(e.target.value)}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '18px' }}>新 剩余使用次数 值：</label>
            <Input
              type="text"
              value={updatedTime}
              onChange={(e) => setUpdatedTime(e.target.value)}
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
