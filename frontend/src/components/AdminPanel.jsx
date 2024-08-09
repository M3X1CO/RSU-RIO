// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterUser from './RegisterUser';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      const allUsers = response.data;
      setUsers(allUsers.filter(user => !user.isAdmin && user.status === 'approved'));
      setAdmins(allUsers.filter(user => user.isAdmin));
      setPendingUsers(allUsers.filter(user => user.status === 'pending'));
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`/api/admin/approve/${userId}`);
      fetchUsers();
    } catch (err) {
      setError('Error approving user');
      console.error(err);
    }
  };

  const handleDeny = async (userId) => {
    try {
      await axios.put(`/api/admin/deny/${userId}`);
      fetchUsers();
    } catch (err) {
      setError('Error denying user');
      console.error(err);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`/api/admin/makeAdmin/${userId}`);
      fetchUsers();
    } catch (err) {
      setError('Error making user admin');
      console.error(err);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await axios.put(`/api/admin/removeAdmin/${userId}`);
      fetchUsers();
    } catch (err) {
      setError('Error removing admin privileges');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
      console.error(err);
    }
  };

  const handleRegister = async (username, password, name) => {
    try {
      await axios.post('/api/admin/register', { username, password, name });
      fetchUsers();
    } catch (err) {
      setError('Error registering new user');
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      {error && <p className="error">{error}</p>}
      
      <h2>Pending Users</h2>
      <ul>
        {pendingUsers.map(user => (
          <li key={user._id}>
            {user.username} - {user.name}
            <button onClick={() => handleApprove(user._id)}>Approve</button>
            <button onClick={() => handleDeny(user._id)}>Deny</button>
          </li>
        ))}
      </ul>

      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.name}
            {!user.isAdmin && <button onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Admins</h2>
      <ul>
        {admins.map(admin => (
          <li key={admin._id}>
            {admin.username} - {admin.name}
            <button onClick={() => handleRemoveAdmin(admin._id)}>Remove Admin</button>
          </li>
        ))}
      </ul>

      <h2>Register New User</h2>
      <RegisterUser handleRegister={handleRegister} />
    </div>
  );
};

export default AdminPage;