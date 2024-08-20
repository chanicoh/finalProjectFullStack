import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Css/HomePage.css';
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
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      }
    };

    fetchRooms();
  }, []);

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
        setActiveSection('about');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (section) => {
    switch (section) {
      case 'home':
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'rooms':
        roomsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="navigation">
          <Link
            to="/"
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </Link>
          <button
            className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`}
            onClick={() => handleNavigation('rooms')}
          >
            Rooms
          </button>
          <button
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavigation('about')}
          >
            hotel
          </button>
          <button
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavigation('contact')}
          >
            Contact Us
          </button>
          <Link to="/users" className="UsersPage">Users</Link>
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
          {rooms.map((room) => (
            <div key={room.room_id} className="room-card">
              <h3>Room {room.room_number}</h3>
              <p>{room.description}</p>
              <p>Type: {room.room_type}</p>
              {room.photos && (
                <img src={room.photos} alt={`Room ${room.room_number}`} className="room-photo" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hotel-info-container">
        <div className="hotel-info">
          <h2>Hotel Information</h2>
          <p>Address: Calea Victoriei 166, 010096 Bucharest</p>
          <a href="#">View Map</a>
          <p>Phone: +40 21 2125558</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
          <button>Check Availability</button>
        </div>

        <div className="services">
          <h2>Services</h2>
          <ul>
            <li>Free WiFi</li>
            <li>Breakfast Included</li>
            <li>Bar</li>
            <li>Restaurant</li>
            <li>Fitness Center</li>
            <li>Non-Smoking Hotel</li>
            <li>Meeting Rooms</li>
            <li>Air Conditioning</li>
            <li>24-Hour Reception</li>
          </ul>
        </div>
      </div>

      <div className="about-section" ref={aboutRef}>
        <h2 className="section-title"></h2>
        <p>About the hotel
           Located in a perfect location in the heart of the Romanian 
           capital, the Leonardo Hotel Bucharest City Center will pamper 
           you with a wonderful and extremely comfortable hospitality experience, 
           which will allow you to experience the best that this beautiful and historic 
           city has to offer.
Here you will enjoy optimal proximity to all the hot attractions of the city, 
which are just a few minutes' walk away, as well as pleasant hiking trails, plenty 
of excellent local restaurants and charming cafes.
The pampering continues at the height of comfort even in the hotel 
itself with modern and pleasant guest rooms overlooking the unique view of 
the city, which is seen at its best during the magical night hours; A warm and 
relaxed homely atmosphere is present in all the designed interiors; A staff that 
is at your disposal around the clock and will provide an answer to every need and a 
friendly concierge service that will be happy to share with you secret tips about the 
best places to eat in Bucharest, the prestigious shows, the leading galleries and the 
most exciting attractions. Add to all this a rich breakfast to start the day full of 
energy, a selection of refreshing drinks served in the hotel restaurant alongside a 
variety of excellent international dishes, and you will have a vacation in Bucharest 
full of unforgettable experiences, which can also be experienced by experiential pedaling on the bicycles offered for rent at the hotel's reception desk.</p>
      </div>
      
      <div className="contact-section" ref={contactRef}>
        <h2 className="section-title">Contact Us</h2>
        <p>Address: 123 Hotel Street, City, Country</p>
        <p>Phone: +123 456 789</p>
        <p>Email: contact@hotel.com</p>
      </div>
    </div>
  );
}

export default HomePage;
