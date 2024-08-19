import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Css/HomePage.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

function HomePage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log('Search:', searchQuery, 'Rooms:', roomCount, 'Guests:', guestCount, 'Dates:', startDate, 'to', endDate);
    // Add your search logic here
  };

  return (
    <div className="home-page">
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
      <div className="top-bar">
        <div className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      
      
      <div className="available-rooms">
        {/* Render available rooms here */}
      </div>
    </div>
  );
}

export default HomePage;
