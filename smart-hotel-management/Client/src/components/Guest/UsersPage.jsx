import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateRequestPage from './CreateRequestPage';
import '../../Css/Users.css';

export const UsersPage = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState();
  const [showRequestPage, setShowRequestPage] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || null;
  console.log(user)
  const user_id = user?.user_id || '';

  const profileRef = useRef(null);
  const ordersRef = useRef(null);
  const notificationsRef = useRef(null);
  const requestsRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/${user_id}`);
        setRoom(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user_id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const profileHeight = profileRef.current ? profileRef.current.offsetHeight : 0;
      const ordersHeight = ordersRef.current ? ordersRef.current.offsetHeight : 0;
      const notificationsHeight = notificationsRef.current ? notificationsRef.current.offsetHeight : 0;

      if (scrollPosition <= profileHeight) {
        setActiveSection('profile');
        navigate('?section=profile', { replace: true });
      } else if (scrollPosition < profileHeight + ordersHeight) {
        setActiveSection('orders');
        navigate('?section=orders', { replace: true });
      } else if (scrollPosition < profileHeight + ordersHeight + notificationsHeight) {
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

  const handleCreateRequest = () => {
    setShowRequestPage(true); // Show the create request page
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
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
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      setRoom((prevOrders) =>
        prevOrders.map(order =>
          order.reservation_id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  if (loading) return <p className="loading">Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p className="error">No user data available.</p>;

  // Render CreateRequestPage when showRequestPage is true
  if (showRequestPage) {
    return <CreateRequestPage user={user} />;
  }

  return (
    <div className="users-page">
      <h1 className="page-title">User Profile</h1>
      <nav className="dropdownuser">
        <div className="dropdown-menuuser">
          <button
            className={`dropdown-itemuser ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigation('profile')}>
            Profile
          </button>
          <button
            className={`dropdown-itemuser ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => handleNavigation('orders')}>
            My Orders
          </button>
          <button
            className={`dropdown-itemuser ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => handleNavigation('notifications')}>
            Notifications
          </button>
          <button
            className={`dropdown-itemuser ${activeSection === 'requests' ? 'active' : ''}`}
            onClick={() => handleNavigation('requests')}>
            Requests
          </button>
        </div>
      </nav>

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
          {room && room.length > 0 ? (
            room.map((reservation, index) => (
              <li key={index} className="order-item">
                <strong>Room Number:</strong> {reservation.room_number}, 
                <strong>Check-in:</strong> {new Date(reservation.check_in_date).toLocaleDateString()},
                <strong>Check-out:</strong> {new Date(reservation.check_out_date).toLocaleDateString()},
                <strong>Status:</strong> {reservation.status}
                {reservation.status !== 'checked_in' && (
                  <button className="check-in-btn" onClick={() => handleStatusChange(reservation.reservation_id, 'checked_in')}>
                    Check-in
                  </button>
                )}
                {reservation.status === 'checked_in' && (
                  <button className="check-out-btn" onClick={() => handleStatusChange(reservation.reservation_id, 'checked_out')}>
                    Check-out
                  </button>
                )}
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

      {/* Add the button to create a service request */}
      <button onClick={handleCreateRequest} className="create-request-btn">
        Create Service Request
      </button>

    </div>
  );
};

export default UsersPage;
