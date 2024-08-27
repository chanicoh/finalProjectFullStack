import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/ReservationPage.css';

function Reservation() {
  const location = useLocation();
  const { roomType,user_id } = location.state || {};

  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (checkInDate && checkOutDate && roomType) {
      const fetchAvailableRooms = async () => {
        try {
          const response = await axios.get('/api/rooms', {
            
          });
          setRooms(response.data);
        } catch (error) {
          console.error('Error fetching available rooms', error);
        }
      };
      fetchAvailableRooms();
    }
  }, [checkInDate, checkOutDate, roomType]); // Fetch when checkInDate, checkOutDate, or roomType changes

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reservations', {
        user_id,
        room_id: selectedRoom,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        status: 'booked',
        total_price: totalPrice,
      });

      console.log('Reservation successful', response.data);
    } catch (error) {
      console.error('Error making reservation', error);
    }
  };

  return (
    <div className="reservation-page">
      <h1>Book Your {roomType}</h1>
      <form onSubmit={handleReservation} className="reservation-form">
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
        <div className="form-group">
          <label htmlFor="roomSelect">Select Room</label>
          <select
            id="roomSelect"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                Room {room.room_number} - {room.price_per_night} per night
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Reserve Now</button>
      </form>
    </div>
  );
}

export default Reservation;
