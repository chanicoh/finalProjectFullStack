import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/ReservationPage.css';

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomType, user } = location.state || {};
  const user_id = user?.user_id || ''; // Ensure user_id is defined
  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showRooms, setShowRooms] = useState(false);
  const today = new Date().toISOString().split('T')[0];
 

  const fetchAvailableRooms = async () => {
    try {
      console.log(checkInDate, checkOutDate, roomType)
      const response = await axios.get('/api/rooms', {
        params: {roomType, checkInDate, checkOutDate }
      });
      setRooms(response.data);
      setShowRooms(true); // Show the room selection area
      console.log(response.data);
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
 const saveOrder = async () => {
  if (!selectedRoom) {
    alert('Please select a room before saving the order.');
    return;
  }

  const reservationData = {
    user_id,
    room_id: selectedRoom.room_id,
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    total_price: totalPrice,
    status: 'booked'
  };

  try {
    console.log(reservationData);
    const response = await axios.post('/api/reservations', reservationData);
    console.log('Reservation saved:', response.data);
    alert(`Reservation saved! Your reservation ID is ${response.data.reservationId}`);

    // Correctly format query parameters using URLSearchParams
    const queryString = new URLSearchParams({
      room_id: selectedRoom.room_id,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      total_price: totalPrice,
    }).toString();
    navigate('/', { state: { user } });

  } catch (error) {
    console.error('Error saving the reservation', error);
    alert('There was an error saving your reservation.');
  }
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
            onChange={(e) => {
              setCheckInDate(e.target.value);
              setCheckOutDate(''); // Reset check-out date when check-in changes
            }}
            min={today} // Disable past dates
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOut">Check-Out Date</label>
          <input
            type="date"
            id="checkOut"
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate} // Restrict check-out date to be after check-in
            required
            disabled={!checkInDate} // Disable check-out until check-in is selected
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
          <button onClick={saveOrder} className="save-order-button">
            Booked
          </button>
        </div>
      )}
    </div>
  );
}

export default Reservation;
