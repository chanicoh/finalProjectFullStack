import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      <div className="content">
        <div className="overlay">
          <h1 className="welcome-message">Welcome to Our Hotel</h1>
        </div>
        <img 
          src={require('../assets/hotelHOME.png')}
          alt="Hotel Home" 
          className="home-image"
        />
      </div>
    </div>
  );
}

export default HomePage;
