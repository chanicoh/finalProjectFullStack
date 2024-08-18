import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Sidebar from './components/Shared/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Guest/Dashboard';
import RoomBooking from './components/Guest/RoomBooking';
import ServiceRequest from './components/Guest/ServiceRequest';
import Billing from './components/Guest/Billing';
import RoomManagement from './components/Staff/RoomManagement';
import RequestHandling from './components/Staff/RequestHandling';
import Housekeeping from './components/Staff/Housekeeping';
import UserManagement from './components/Admin/UserManagement';
import RoomInventory from './components/Admin/RoomInventory';
import Reports from './components/Admin/Reports';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/book-room" component={RoomBooking} />
          <Route path="/service-requests" component={ServiceRequest} />
          <Route path="/billing" component={Billing} />
          <Route path="/manage-rooms" component={RoomManagement} />
          <Route path="/handle-requests" component={RequestHandling} />
          <Route path="/housekeeping" component={Housekeeping} />
          <Route path="/user-management" component={UserManagement} />
          <Route path="/room-inventory" component={RoomInventory} />
          <Route path="/reports" component={Reports} />
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
