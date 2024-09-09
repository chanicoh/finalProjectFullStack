import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Reservation from './components/Guest/Reservation';

import { UsersPage } from './components/Guest/UsersPage';
import  LoginPage  from './components/Auth/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestDashboard from './pages/GuestDashboard';
import RoomServiceDashboard from './pages/RoomServiceDashboard';
import RegisterPage from './components/Auth/RegisterPage'
import CreateRequestPage from './components/Guest/CreateRequestPage'

//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
      
        <Route path="/users" element={<UsersPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/guest/dashboard" element={<GuestDashboard />} />
        <Route path="/RoomServiceDashboard" element={<RoomServiceDashboard />}/>
        <Route path="/guest/UsersPage" element={<UsersPage />} />
        <Route path="/CreateRequestPage" element={<CreateRequestPage />} />


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;