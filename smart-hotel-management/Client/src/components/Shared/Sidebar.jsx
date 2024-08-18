import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/manage-rooms">Manage Rooms</Link>
      <Link to="/handle-requests">Handle Requests</Link>
      <Link to="/housekeeping">Housekeeping</Link>
      <Link to="/user-management">User Management</Link>
      <Link to="/room-inventory">Room Inventory</Link>
      <Link to="/reports">Reports</Link>
    </aside>
  );
};

export default Sidebar;
