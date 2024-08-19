import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Reservation from './components/Reservation';
import Rooms from './components/Rooms';
import ServiceRequest from './components/ServiceRequest';
import UsersPage from './components/UsersPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestDashboard from './pages/GuestDashboard';
import StaffDashboard from './pages/StaffDashboard';
import HomePage from './pages/HomePage';

//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} /> 
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/service-requests" element={<ServiceRequest />} />
        <Route path="/users" element={<UsersPage />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/guest/dashboard" element={<GuestDashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;