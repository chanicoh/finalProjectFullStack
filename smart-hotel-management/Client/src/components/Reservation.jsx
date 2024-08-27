import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Css/ReservationPage.css';

function Reservation() {
  const location = useLocation();
  const { roomType, user } = location.state || {};
  const user_id = user?.user_id || ''; // Ensure user_id is defined
  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showRooms, setShowRooms] = useState(false);

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('/api/rooms', {
        params: { checkInDate, checkOutDate, roomType }
      });
      setRooms(response.data);
      setShowRooms(true); // Show the room selection area
    } catch (error) {
      console.error('Error fetching available rooms', error);
    }
  };

  const searchRoom = (e) => {
    e.preventDefault();
    fetchAvailableRooms();
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setTotalPrice(room.price_per_night * getNumberOfNights());
  };

  const getNumberOfNights = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="reservation-page">
      <h1>Book Your {roomType}</h1>
      <form className="reservation-form" onSubmit={searchRoom}>
        <div className="form-group">
          <label htmlFor="checkIn">Check-In Date</label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOut">Check-Out Date</label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Search Room
        </button>
      </form>

      {showRooms && rooms.length > 0 && (
        <div className="room-selection">
          <h2>Select a Room</h2>
          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.room_id} className="room-item">
                <h3>{room.room_number}</h3>
                <p>{room.description}</p>
                <p>Price per Night: ${room.price_per_night}</p>
                <button
                  onClick={() => handleRoomSelection(room)}
                  className={selectedRoom.room_id === room.room_id ? 'selected' : ''}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRoom && (
        <div className="room-summary">
          <h2>Reservation Summary</h2>
          <p>Room: {selectedRoom.room_number}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default Reservation;
