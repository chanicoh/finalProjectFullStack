import React, { useState, useEffect } from 'react';
import { fetchRooms, updateRoomStatus } from '../api/rooms';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const allRooms = await fetchRooms();
      setRooms(allRooms);
    };

    loadRooms();
  }, []);

  const handleStatusChange = async (room_id, status) => {
    try {
      await updateRoomStatus(room_id, status);
      alert('Room status updated');
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="room-management-container">
      <h2>Manage Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.room_id}>
            {room.room_number} - {room.room_type}
            <select
              value={room.status}
              onChange={(e) => handleStatusChange(room.room_id, e.target.value)}
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="cleaning">Cleaning</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomManagement;
