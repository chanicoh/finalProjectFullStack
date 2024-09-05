import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomServiceDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    let isMounted = true; // to handle state update on unmounted component

    const fetchRooms = async () => {
      try {
        const roomResponse = await axios.get('/api/rooms');
        if (isMounted) {
          setRooms(roomResponse.data);
          console.log('Rooms fetched:', roomResponse.data);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchServiceRequests = async () => {
      try {
        const requestResponse = await axios.get('/api/servicerequests');
        if (isMounted) {
          setServiceRequests(requestResponse.data);
          console.log('Service requests fetched:', requestResponse.data);
        }
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };

    fetchRooms();
    fetchServiceRequests();

    // Cleanup function to avoid state update on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  const updateRoomStatus = async (room_id, newStatus) => {
    try {
      console.log(`Updating room with ID: ${room_id}`);
      await axios.put(`/api/rooms/${room_id}`, { status: newStatus });
      setRooms(rooms.map(room => room.room_id === room_id ? { ...room, status: newStatus } : room));
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const completeServiceRequest = async (request_id) => {
    try {
      console.log(`Completing service request with ID: ${request_id}`);
      const response = await axios.patch(`/api/servicerequests/${request_id}/complete`);
  
      // Check if the server response indicates a successful update
      if (response.status === 200 && response.data.message === 'Service request marked as completed') {
        // Update the state only if the server confirms the update
        setServiceRequests(serviceRequests.map(request => 
          request.request_id === request_id ? { ...request, status: 'complete' } : request
        ));
      } else {
        console.error('Failed to mark service request as completed on the server:', response.data);
      }
    } catch (error) {
      console.error('Error completing service request:', error);
    }
    console.log(serviceRequests)
  };
  

  return (
    <div>
      <h1>Room Service Dashboard</h1>
      <h2>Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.room_id}>
            Room {room.room_id} - Status: {room.status}
            {room.status === 'needs cleaning' && (
              <button onClick={() => updateRoomStatus(room.room_id, 'ready')}>Mark as Ready</button>
            )}
          </li>
        ))}
      </ul>

      <h2>Service Requests</h2>
      <ul>
        {serviceRequests.map(request => (
          <li key={request.request_id}>
            {request.request_type} in Room {request.room_id} - Status: {request.status}
            {request.status !== 'completed' && (
              <button onClick={() => completeServiceRequest(request.request_id)}>Mark as Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomServiceDashboard;
