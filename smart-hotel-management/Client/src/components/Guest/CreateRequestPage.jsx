import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateRequestPage = ({ user }) => {
  const [room, setRoom] = useState(null);
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRoom = async () => {
      try {
        const response = await axios.get(`/api/users/${user.user_id}/rooms`);
        if (response.data.length > 0) {
          setRoom(response.data[0]); // Assuming one room per user; adjust if necessary
        } else {
          setError('No room associated with this user.');
        }
      } catch (err) {
        setError('Failed to fetch user room.');
      }
    };

    if (user) fetchUserRoom();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRequest = {
        user_id: user.user_id,
        room_id: room.room_id,
        request_type: requestType,
        request_description: description,
        status: 'pending', // Default status
      };
      await axios.post('/api/requests', newRequest);
      alert('Request submitted successfully!');
      setRequestType('');
      setDescription('');
    } catch (error) {
      setError('Failed to submit request.');
      console.error('Error creating request', error);
    }
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="request-form">
      <h2>Create a New Service Request</h2>
      {room ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="requestType">Request Type</label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
            >
              <option value="">Select Request Type</option>
              <option value="Order breakfast">Order Breakfast</option>
              <option value="Fix air conditioning">Fix Air Conditioning</option>
              <option value="Request extra towels">Request Extra Towels</option>
              <option value="Order dinner">Order Dinner</option>
              <option value="Repair broken light">Repair Broken Light</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit Request</button>
        </form>
      ) : (
        <p>Loading room data...</p>
      )}
    </div>
  );
};

export default CreateRequestPage;
