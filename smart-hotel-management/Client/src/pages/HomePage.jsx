import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Css/HomePage.css';
//import { fetchRooms } from '../services/roomService'; // Service to fetch rooms from db
import '../assets/hotelHOME.png';

function HomePage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [rooms, setRooms] = useState([]);
  const [activeSection, setActiveSection] = useState('home');

  const homeRef = useRef(null);
  const roomsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const homeHeight = homeRef.current.offsetHeight;
      const roomsHeight = roomsRef.current.offsetHeight;

      if (scrollPosition < homeHeight) {
        setActiveSection('home');
      } else if (scrollPosition < homeHeight + roomsHeight) {
        setActiveSection('rooms');
      } else if (scrollPosition < homeHeight + roomsHeight + contactRef.current.offsetHeight) {
        setActiveSection('contact');
      } else {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    };
    fetchData();
  }, []);*/

  const handleSearch = () => {
    console.log('Search:', startDate, 'to', endDate, 'Rooms:', roomCount, 'Guests:', guestCount);
    // Add your search logic here
  };

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="navigation">
          <Link to="/" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</Link>
          <a href="#rooms" className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`}>Rooms</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact Us</a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Us</a>
        </div>
        <Link to="/login" className="login-button">Login</Link>
      </div>

      <div className="content" ref={homeRef}>
        <div className="overlay">
          <h1 className="welcome-message">Welcome to Our Hotel</h1>
        </div>
        <img 
          src={require('../assets/hotelHOME.png')}
          alt="Hotel Home" 
          className="home-image"
        />
      </div>

      <div className="rooms-section" ref={roomsRef}>
        <h2 className="section-title">Available Rooms</h2>
        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room.room_id} className="room-card">
              <h3>{room.room_number}</h3>
              <p>{room.description}</p>
              <p>Type: {room.room_type}</p>
              <p>Price: ${room.price_per_night}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-section" ref={contactRef}>
        <h2 className="section-title">Contact Us</h2>
        <p>Address: 123 Hotel Street, City, Country</p>
        <p>Phone: +123 456 789</p>
        <p>Email: contact@hotel.com</p>
      </div>

      <div className="about-section" ref={aboutRef}>
        <h2 className="section-title">About Us</h2>
        <p>Our hotel offers luxury accommodations with world-class amenities and exceptional service. Our team is dedicated to providing an unforgettable experience for every guest.</p>
      </div>
    </div>
  );
}

export default HomePage;
