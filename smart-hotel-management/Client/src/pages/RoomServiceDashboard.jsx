import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/RoomServiceDashboard.css'; // Importing the CSS file

const RoomServiceDashboard = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get('/api/servicerequests');
        if (isMounted) {
          // Sort requests so that incomplete ones appear first
          const sortedRequests = response.data.sort((a, b) => a.status === 'completed' ? 1 : -1);
          setServiceRequests(sortedRequests);
        }
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };

    fetchServiceRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const completeServiceRequest = async (request_id) => {
    try {
      console.log(`Completing service request with ID: ${request_id}`);
      const response = await axios.patch(`/api/servicerequests/${request_id}/complete`);

      // Check if the server response indicates a successful update
      if (response.status === 200 && response.data.message === 'Service request marked as completed') {
        setServiceRequests(serviceRequests.map(request =>
          request.request_id === request_id ? { ...request, status: 'completed' } : request
        ));
      } else {
        console.error('Failed to mark service request as completed on the server:', response.data);
      }
    } catch (error) {
      console.error('Error completing service request:', error);
    }
  };

  return (
    <div className="dashboard-container" name="dashboardContainer">
      <h1 className="dashboard-title" name="dashboardTitle">Room Service Dashboard</h1>
      <table className="service-requests-table" name="serviceRequestsTable">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Room ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.room_id}</td>
              <td>{request.request_type}</td>
              <td>{request.request_description}</td>
              <td>{request.status}</td>
              <td>
                {request.status !== 'completed' && (
                  <button 
                    onClick={() => completeServiceRequest(request.request_id)} 
                    className="complete-button" 
                    name={`completeButton${request.request_id}`}>
                    Mark as Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomServiceDashboard;
