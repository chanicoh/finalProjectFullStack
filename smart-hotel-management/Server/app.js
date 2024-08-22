require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

// Middleware
app.use(cors({
  origin: '*',  // Update this to specific domains in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    sameSite: 'strict',  // Helps protect against CSRF attacks
  }
}));

// Log Request Headers
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
});

// Route handlers
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const billingRoutes = require('./routes/billingRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', roomRoutes);
app.use('/api', userRoutes);
app.use('/api', billingRoutes);
app.use('/api', reservationRoutes);
app.use('/api', serviceRequestRoutes);
app.use('/api', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went really wrong",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
