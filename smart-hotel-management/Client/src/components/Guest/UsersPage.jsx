import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../Css/Users.css';

export const UsersPage = () => {


  const [room, setRoom] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState();
  const [menuOpen, setMenuOpen] = useState(false);


  
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [user, setUser] = useState(location.state?.user || null); // Destructure to get the user state value
  const user_id = user?.user_id || ''; // Ensure user_id is defined
  console.log("Location state:", location.state);

  
  

  const profileRef = useRef(null);
  const ordersRef = useRef(null);
  const notificationsRef = useRef(null);
  const requestsRef = useRef(null);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        const response = await axios.get(`/api/users`,{//צריך לייבא את החדרים של המשתמש
          params : {user_id}
        }); // Assumes an endpoint that fetches the active user's details
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
      const profilHeight = profileRef.current ? profileRef.current.offsetHeight : 0;
      const ordersHeight = ordersRef.current ? ordersRef.current.offsetHeight : 0;


      if (scrollPosition <= profilHeight) {
        setActiveSection('profile');
        navigate('?section=profile', { replace: true });
      } else if (scrollPosition < profilHeight + ordersHeight) {
        setActiveSection('orders');
        navigate('?section=orders', { replace: true });
      } else if (scrollPosition < profilHeight + ordersHeight + notificationsRef.current.offsetHeight) {
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
  }, []);



  const handleNavigation=(section) => {
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
  } ;
  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/status`, { status });
      setRoom((prevOrders) => prevOrders.map(order => 
        order.reservation_id === orderId ? { ...order, status } : order
      ));
    } catch (err) {
      setError('Failed to update order status');
    }
  };
  

  if (loading) return <p className="loading">Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;

  if (!user) return <p className="error">No user data available.</p>;

  return (
    <div className="users-page">
      <h1 className="page-title">User Profile</h1>
      <nav className="dropdownuser">
        <div className="dropdown-menuuser">
          <button 
          className={`dropdown-itemuser ${activeSection === 'profile' ? 'active' : ''}`}
           onClick={() => handleNavigation('profile')}>
            Profile</button>

          <button 
          className={`dropdown-itemuser ${activeSection === 'orders' ? 'active' : ''}`} 
          onClick={() => handleNavigation('orders')}>
            My Orders</button>

          <button  
          className={`dropdown-itemuser ${activeSection === 'notifications' ? 'active' : ''}`}
          onClick={() => handleNavigation('notifications')}>
            Notifications</button>

          <button 
          className={`dropdown-itemuser ${activeSection === 'requests' ? 'active' : ''}`} 
          onClick={() => handleNavigation('requests')}>
            Requests</button>

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
    </div>
  );
};

export default UsersPage;