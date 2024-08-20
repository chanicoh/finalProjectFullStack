const userModel = require('../models/userModel');
const authModel = require('../models/authModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received email:', email);
  console.log('Received password:', password);
  try {
    const user = await authModel.getUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Session logic
    req.session.user = user; // Set user in the session

    res.json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Server error:', error);
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
  logoutUser
};
