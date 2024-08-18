import React, { useState, useEffect } from 'react';
import { fetchAvailableRooms, createReservation } from '../api/reservations';

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    const loadRooms = async () => {
      const availableRooms = await fetchAvailableRooms();
      setRooms(availableRooms);
    };

    loadRooms();
  }, []);

  const handleBook = async () => {
    if (selectedRoom && checkIn && checkOut) {
      try {
        await createReservation(selectedRoom, checkIn, checkOut);
        alert('Room booked successfully');
      } catch (error) {
        alert('Booking failed');
      }
    }
  };

  return (
    <div className="room-booking-container">
      <h2>Book a Room</h2>
      <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
        <option value="">Select a room</option>
        {rooms.map(room => (
          <option key={room.room_id} value={room.room_id}>
            {room.room_number} - {room.room_type}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        placeholder="Check-in Date"
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        placeholder="Check-out Date"
      />
      <button onClick={handleBook}>Book Now</button>
    </div>
  );
};

export default RoomBooking;
