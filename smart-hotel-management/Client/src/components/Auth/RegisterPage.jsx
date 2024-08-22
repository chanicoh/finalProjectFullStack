import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Css/auth.css';

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    user_name: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    role: 'guest', // Default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', userDetails);
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="user_name" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <select name="role" value={userDetails.role} onChange={handleChange} required>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
