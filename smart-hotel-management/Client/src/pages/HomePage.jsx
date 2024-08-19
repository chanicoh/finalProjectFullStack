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
      
      <div className="search-bar">
        <button className="search-button">חיפוש</button>
        <div 
          className="date-picker-container" 
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <div className="date-input">
            {startDate && endDate 
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : "Select Dates"}
          </div>
          {showDatePicker && (
            <div className="date-picker-expanded">
              <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Check-in Date"
                className="date-picker"
              />
              <DatePicker 
                selected={endDate} 
                onChange={date => setEndDate(date)} 
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Check-out Date"
                className="date-picker"
              />
              <FaTimes onClick={() => setShowDatePicker(false)} className="close-icon" />
            </div>
          )}
        </div>
        <div className="room-filter">
          <AiOutlineUser className="user-icon" />
          <span>{roomCount} חדר, {guestCount} אורחים</span>
        </div>
        <div className="search-input-container">
          <input 
            type="text" 
            placeholder="מלון לאונרדו בוקרשט סיטי סנטר, בוקרשט, רומניה"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" onClick={handleSearch} />
        </div>
      </div>

      <div className="available-rooms">
        {/* Render available rooms here */}
      </div>
    </div>
  );
}

export default HomePage;
