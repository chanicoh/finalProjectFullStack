const userModel = require('../models/userModel'); // Assuming you have a userModel for database operations
const jwt = require('jsonwebtoken'); // For generating JWT tokens (optional)

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token or session here (using JWT for example)
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
};
