import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Users.css'

export const UsersPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get('/api/users', config); // Assumes an endpoint that fetches the active user's details
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="loading">Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;

  if (!user) return <p className="error">No user data available.</p>;

  return (
    <div className="users-page">
      <h1 className="page-title">User Profile</h1>
      <div className="profile-details">
        <h2 className="section-title">Profile Details</h2>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
      </div>

      <hr className="divider" />

      <div className="my-orders">
        <h2 className="section-title">My Orders</h2>
        <ul>
          {user.orders && user.orders.length > 0 ? (
            user.orders.map((order, index) => (
              <li key={index}>
                <strong>Room Number:</strong> {order.room_number}, <strong>Room Type:</strong> {order.room_type}
              </li>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </ul>
      </div>

      <hr className="divider" />

      <div className="notifications">
        <h2 className="section-title">Notifications</h2>
        {user.notifications && user.notifications.length > 0 ? (
          <ul>
            {user.notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>

      <hr className="divider" />

      <div className="requests">
        <h2 className="section-title">Requests</h2>
        <ul>
          {user.requests && user.requests.length > 0 ? (
            user.requests.map((request, index) => (
              <li key={index}>
                <strong>Request ID:</strong> {request.request_id}, <strong>Room Number:</strong> {request.room_number}, <strong>Type:</strong> {request.request_type}, <strong>Description:</strong> {request.request_description}, <strong>Status:</strong> {request.status}, <strong>Created At:</strong> {new Date(request.created_at).toLocaleString()}, <strong>Updated At:</strong> {new Date(request.updated_at).toLocaleString()}
              </li>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;
