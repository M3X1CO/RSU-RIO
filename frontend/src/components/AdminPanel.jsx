import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('/api/admin/panel');
      setPendingUsers(response.data.pendingUsers);
    } catch (err) {
      setError('Error fetching pending users');
      console.error(err);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`/api/admin/approve/${userId}`);
      fetchPendingUsers();
    } catch (err) {
      setError('Error approving user');
      console.error(err);
    }
  };

  const handleDeny = async (userId) => {
    try {
      await axios.put(`/api/admin/deny/${userId}`);
      fetchPendingUsers();
    } catch (err) {
      setError('Error denying user');
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
    </div>
  );
};

export default AdminPage;