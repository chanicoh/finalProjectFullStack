import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import '../Css/HomePage.css';
import '../assets/hotelHOME.png';

function HomePage() {
  //
  //const [rooms, setRooms] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate to handle navigation
  const message = location.state?.message;
  
  const [user, setUser] = useState(location.state?.user || null); // Manage user state
  console.log(user, message);


  const homeRef = useRef(null);
  const roomsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       //const response = await axios.get('/api/rooms');
  //       //setRooms(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch rooms', error);
  //     }
  //   };

    
  //   fetchRooms();
  // }, []);

  useEffect(() => {
    if (user) {
      console.log('User logged in:', user);
    }
  }, [user]);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setUser(null); // Clear the user state
    navigate('/'); // Redirect to login page
  };

  const handleBookNow = (roomType) => {
    navigate('/reservation', { state: { roomType,user } },);
  };

  const handleNavigate = (section) => {
    navigate(`/users?section=${section}`,{ state: { user } });
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
        {/* Conditionally render the serviceRoom link only if user is staff */}
        {user?.role === 'staff' && (
            <Link to="/RoomServiceDashboard" className="nav-link button">
              Service Room
            </Link>
          )}
        
      </div>
      <div className="user-actions">
        {user ? (
          <>
            <button onClick={handleLogout} className="login-button">
              Logout
            </button>
            <div className="dropdown">
              <button className="dropdown-button" onClick={toggleDropdown}>
                &#9776; {/* Hamburger icon */}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                <button onClick={() => handleNavigate('profile')} className="dropdown-item">Profile</button>
                <button onClick={() => handleNavigate('orders')} className="dropdown-item">My Orders</button>
                <button onClick={() => handleNavigate('notifications')} className="dropdown-item">Notifications</button>
                <button onClick={() => handleNavigate('requests')} className="dropdown-item">Requests</button>
              </div>
              )}
            </div>
          </>
        ) : (
          
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </div>

      <div className='sect'>
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
        <h2>ROOMS</h2>
        <p>The Leonardo Bucharest City Hotel offers 156 comfortable rooms and cozy 
          suites, including well-designed double rooms and pampering family rooms. 
          All rooms include free internet, speakers and the hotel's music channel, 
          air conditioning, safe, LCD TV with cables and more. Rooms without balconies 
          and some overlooking an urban view and some overlooking the sea. to enhance 
          the experience. Book one of the luxury suites overlooking the sea and a 
          variety of unique treats. There are also accessible rooms adapted for guests
           with disabilities.</p>
           <div className="rooms-grid">
    {/* Standard Room */}
    <div className="room-card">
      <h3>Standard Room</h3>
      <p>
        The Standard Room is perfect for guests seeking a comfortable stay at an affordable price. It includes a double bed, private bathroom, free Wi-Fi, and a flat-screen TV.
      </p>
      <img
          src={require('../assets/rooms/StandardRoom/1.png')}
          className="room-image"
        />
      <button
              className="room-button"
              onClick={() => handleBookNow('Standard Room')}
            >
              Book Now
            </button>
    </div>
    
    {/* Deluxe Room */}
    <div className="room-card">
      <h3>Deluxe Room</h3>
      <p>
        The Deluxe Room offers more space and luxury It includes a with a king-sized bed, en-suite bathroom with a bathtub, free Wi-Fi, flat-screen TV, and a seating area.
      </p>
      <img
          src={require('../assets/rooms/DeluxeRoom/1.png')}
          className="room-image"
        />
       <button
              className="room-button"
              onClick={() => handleBookNow('Deluxe Room')}
            >
              Book Now
            </button>
      
    </div>
    
    {/* Suite Room */}
    <div className="room-card">
      <h3>Suite Room</h3>
      <p>
        The Suite Room is designed for guests who need extra space and comfort. It features a separate living area, a king-sized bed, a spacious bathroom, free Wi-Fi, and a flat-screen TV.
      </p>
      <img
          src={require('../assets/rooms/PresidentialSuite/1.png')}
          className="room-image"
        />
     <button
              className="room-button"
              onClick={() => handleBookNow('Suite Room')}
            >
              Book Now
            </button>
      
    </div>
    
    {/* Family Room */}
    <div className="room-card">
      <h3>Family Room</h3>
      <p>
        The Family Room is ideal for families or groups. It includes two double beds, a large bathroom, free Wi-Fi, a flat-screen TV, and space for an extra bed if needed.
      </p>
      <img
          src={require('../assets/rooms/Family Suite/1.png')}
          className="room-image"
        />
       <button
              className="room-button"
              onClick={() => handleBookNow('Family Room')}
            >
              Book Now
            </button>
    </div>

    </div>
      </div>

      <div className="about-section" ref={aboutRef}>
        <div className="section-title">
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
           full of unforgettable experiences, which can also be experienced by experiential pedaling
            on the bicycles offered for rent at the hotel's reception desk.</p>
            <div className="video-container">
          <video controls
            className="room-video"
            src={require('../assets/video.mp4')}
           
          />
        </div>
         <div className="hotel-info">
          <h2>GOOD TO KNOW</h2>
          <ul>
            <li>Number of rooms: 78</li>
            <li>Check in: 15:00</li>
            <li>Check out:12:00</li>
            <li>Reception 24 hours a day</li>
            <li>Free unlimited Wi-Fi</li>
            <li>Non smoking hotel</li>
            <li>Air conditioned hotel</li>
            <li>Public parking nearby:
            Lei 5/hour</li>
          </ul>
        </div>
        </div>
      </div>
     
      
      <div className="contact-section" ref={contactRef}>
        <h2 className="contact-title">Contact Us</h2>
        <p>Address: 123 Hotel Street, City, Country</p>
        <p>Phone: +123 456 789</p>
        <p>Email: contact@hotel.com</p>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
