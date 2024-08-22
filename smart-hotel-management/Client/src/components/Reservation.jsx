// src/pages/ReservationPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../Css/ReservationPage.css'; // Add your styling here

function Reservation() {
  const { roomType } = useParams(); // Get the room type from the URL if needed

  return (
    <div className="reservation-page">
      <h1>Book Your {roomType} Room</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="check-in">Check-in Date:</label>
        <input type="date" id="check-in" name="check-in" required />
        
        <label htmlFor="check-out">Check-out Date:</label>
        <input type="date" id="check-out" name="check-out" required />
        
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
}

export default Reservation;
