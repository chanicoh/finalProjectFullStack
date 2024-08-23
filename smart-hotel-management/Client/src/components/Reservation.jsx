import React, { useState } from 'react';
import axios from 'axios';
import '../Css/ReservationPage.css';

function Reservation() {
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [status, setStatus] = useState('booked');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reservations', {
        room_id: roomId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        status,
        total_price: totalPrice,
      });

      console.log('Reservation successful', response.data);
    } catch (error) {
      console.error('Error making reservation', error);
    }
  };

  return (
    <div className="reservation-page">
      <h1>Book Your Room</h1>
      <form onSubmit={handleReservation} className="reservation-form">
        <div className="form-group">
          <label htmlFor="room">Select Room</label>
          <select
            id="room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            <option value="1">Standard Room</option>
            <option value="2">Deluxe Room</option>
            <option value="3">Suite Room</option>
            <option value="4">Family Room</option>
          </select>
        </div>
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
