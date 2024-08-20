import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            // הסר את Authorization אם אינה נדרשת:
            // 'Authorization': `Bearer ${yourToken}`,
          },
        };
        const response = await axios.get('/api/users', config); 
        setUsers(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
