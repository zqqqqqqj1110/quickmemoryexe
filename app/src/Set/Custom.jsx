import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/user/${selectedUser.id}`);
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
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

      // Refresh the user list after updating
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            <p>账号: {user.account}  VIP: {user.is_vip}  时间: {user.time}</p>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>选中用户</h3>
          <p>{selectedUser.account}</p>
          <div>
            <label>新 VIP 值：</label>
            <input
              type="text"
              value={updatedIsVip}
              onChange={(e) => setUpdatedIsVip(e.target.value)}
            />
          </div>
          <div>
            <label>新 时间 值：</label>
            <input
              type="text"
              value={updatedTime}
              onChange={(e) => setUpdatedTime(e.target.value)}
            />
          </div>
          <button onClick={handleUpdateUser}>更新用户信息</button>
          <button onClick={handleDeleteUser}>删除用户</button>
        </div>
      )}
    </div>
  );
};

export default Custom;
