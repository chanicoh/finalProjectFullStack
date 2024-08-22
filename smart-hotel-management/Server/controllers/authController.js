const userModel = require('../models/userModel');
const authModel = require('../models/authModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Session logic
    req.session.user = user; // Set user in the session

    // Send full user data in the response
    res.json({ message: 'Login successful', user }); 
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  const { user_name, password, first_name, last_name, email, address, phone, role } = req.body;
  try {
    const existingUser = await authModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = await userModel.createUser({
      user_name,
      password,
      first_name,
      last_name,
      email,
      address,
      phone,
      role,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // clears the cookie storing the session ID
    res.json({ message: 'Logout successful' });
  });
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser
};
