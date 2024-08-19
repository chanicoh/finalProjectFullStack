// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
    <h1>Welcome to the Hotel Management System</h1>
    <nav>
     
      <Link to="/reservations">Reservations</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/service-requests">Service Requests</Link>
      <Link to="/users">UsersPage</Link>
      <Link to="/login-page">LoginPage</Link>
    </nav>
  </div>
  );
}

export default HomePage;