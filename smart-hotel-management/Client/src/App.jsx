import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Reservation from './components/Reservation';
import ServiceRequest from './components/ServiceRequest';
import { UsersPage } from './components/Guest/UsersPage';
import  LoginPage  from './components/Auth/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestDashboard from './pages/GuestDashboard';
import StaffDashboard from './pages/StaffDashboard';
import RegisterPage from './components/Auth/RegisterPage'
//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/service-requests" element={<ServiceRequest />} />
        <Route path="/users" element={<UsersPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/guest/dashboard" element={<GuestDashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/reservation" element={<Reservation />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;