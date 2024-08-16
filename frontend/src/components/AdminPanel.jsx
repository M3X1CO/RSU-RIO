import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterUser from './RegisterUser';

const AdminPage = ({ setView }) => {
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

  const handleApprove = async (user) => {
    try {
      await axios.put(`/api/admin/approve/${user.id}`);
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

  const UserItem = ({ user, actions }) => (
    <li className="user-item">
      <div className="user-info">
        <span className="username">{user.username}</span>
        <span className="name">{user.name}</span>
      </div>
      <div className="button-group">
        {actions.map((action, index) => (
          <button key={index} onClick={action.handler} className={action.className}>
            {action.label}
          </button>
        ))}
      </div>
    </li>
  );

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      {error && <p className="error-message">{error}</p>}
      
      <div className="admin-section">
        <h2>Pending Users</h2>
        <ul className="user-list">
          {pendingUsers.map(user => (
            <UserItem 
              key={user.id} 
              user={user} 
              actions={[
                { label: 'Approve', handler: () => handleApprove(user), className: 'button' },
                { label: 'Deny', handler: () => handleDeny(user.id), className: 'button admin-no-button' }
              ]}
            />
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>All Users</h2>
        <ul className="user-list">
          {users.map(user => (
            <UserItem 
              key={user.id} 
              user={user} 
              actions={[
                ...(user.isAdmin ? [] : [{ label: 'Make Admin', handler: () => handleMakeAdmin(user.id), className: 'button' }]),
                { label: 'Delete', handler: () => handleDeleteUser(user.id), className: 'button admin-no-button' }
              ]}
            />
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Admins</h2>
        <ul className="user-list">
          {admins.map(admin => (
            <UserItem 
              key={admin.id} 
              user={admin} 
              actions={[
                { label: 'Remove Admin', handler: () => handleRemoveAdmin(admin.id), className: 'button admin-no-button' }
              ]}
            />
          ))}
        </ul>
      </div>

      <div className="admin-section register-section">
        <RegisterUser handleRegister={handleRegister} setView={setView} />
      </div>
    </div>
  );
}

export default AdminPage;