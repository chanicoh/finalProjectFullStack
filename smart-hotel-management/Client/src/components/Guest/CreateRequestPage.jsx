import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

const CreateRequestPage = () => {
  const { search } = useLocation();
  const location = useLocation();
  const { room_id } = queryString.parse(search); // Get room_id from query string
  const { user } = location.state || {}; // Access user data from state
  
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError('User data is missing.');
    }
    // Debug: Log parsed values from query string
    console.log('Room ID:', room_id);
  }, [user, room_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure all necessary fields are correctly populated
      if (!room_id || !requestType || !description) {
        setError('Missing required information.');
        return;
      }

      const newRequest = {
        user_id: user.user_id,
        room_id,
        request_type: requestType,
        request_description: description,
        status: 'pending', // Default status
      };
      
      console.log(newRequest);

      const response = await axios.post('/api/servicerequests', newRequest);
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
    </div>
  );
};

export default CreateRequestPage;
