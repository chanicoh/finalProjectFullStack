import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Billing from './components/Billing';
import Reservation from './components/Reservation';
import Rooms from './components/Rooms';
import ServiceRequest from './components/ServiceRequest';
import UsersPage from './components/UsersPage';
//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/service-requests" element={<ServiceRequest />} />
        <Route path="/users" element={<UsersPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
