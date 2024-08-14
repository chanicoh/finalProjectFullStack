// src/Homepage.js
import React from 'react';
import "../css/HomePage.css"

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        {/* <img src="path/to/hero-image.jpg" alt="Hotel Hero" className="hero-image" /> */}
        <div className="hero-content">
          <h1>Welcome to Our Hotel</h1>
          <p>Your perfect getaway awaits.</p>
          <form className="search-bar">
            <input type="date" placeholder="Check-in" />
            <input type="date" placeholder="Check-out" />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/rooms">Rooms</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
