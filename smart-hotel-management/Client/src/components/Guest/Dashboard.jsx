import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <button onClick={() => history.push('/book-room')}>Book a Room</button>
      <button onClick={() => history.push('/service-requests')}>Service Requests</button>
      <button onClick={() => history.push('/billing')}>View Bills</button>
    </div>
  );
};

export default Dashboard;
