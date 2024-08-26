import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Users.css'

export const UsersPage = () => {
  const location = useLocation();
  const user = useState(location.state?.user || null); // Manage user state
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [activeSection, setActiveSection] = useState('');
  //const [user, setUser] = useState(location.state?.user || null); // Manage user state
  const [room, setRoom] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profileRef = useRef(null);
  const ordersRef = useRef(null);
  const notificationsRef = useRef(null);
  const requestsRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(`/api/users`); // Assumes an endpoint that fetches the active user's details
        setRoom(response.data);
        setRequest(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const profilHeight = profileRef.current.offsetHeight;
      const ordersHeight = ordersRef.current.offsetHeight;
      const notificationsHeight = notificationsRef.current.offsetHeight;

      if (scrollPosition < profilHeight) {
        setActiveSection('profile-details');
        navigate('?section=profile', { replace: true });
      } else if (scrollPosition < profilHeight + ordersHeight) {
        setActiveSection('my-orders');
        navigate('?section=orders', { replace: true });
      } else if (scrollPosition < profilHeight + ordersHeight + notificationsHeight) {
        setActiveSection('notifications');
        navigate('?section=notifications', { replace: true });
      } else {
        setActiveSection('requests');
        navigate('?section=requests', { replace: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const section = queryParams.get('section');
    switch (section) {
      case 'profile':
        profileRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'orders':
        ordersRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'notifications':
        notificationsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'requests':
        requestsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }, [location.search]);

  if (loading) return <p className="loading">Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;

  if (!user) return <p className="error">No user data available.</p>;

  return (
    <div className="users-page">
      <h1 className="page-title">User Profile</h1>
      <div className="profile-details" ref={profileRef}>
        <h2 className="section-title">Profile Details</h2>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
      </div>

      <hr className="divider" />

      <div className="my-orders" ref={ordersRef}>
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

      <div className="notifications" ref={notificationsRef}>
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

      <div className="requests" ref={requestsRef}>
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
