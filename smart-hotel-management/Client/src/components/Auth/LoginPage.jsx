import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Css/auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Response:', response);

      if (response.data && response.data.user) {
        const user = response.data.user;
        console.log(user);

        if (user.role === 'guest') {
          navigate('/', { state: { user } }); // Navigate to the main page for guest
        } else {
         // navigate(`/${user.role}/dashboard`, { state: { user } }); // Navigate to role-specific dashboard
           navigate('/', { state: { user } });
        }
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="register-redirect">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
