require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
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
const authRoutes = require('./routes/authRoutes'); // Import auth routes

app.use('/api', roomRoutes);
app.use('/api', userRoutes);
app.use('/api', billingRoutes);
app.use('/api', reservationRoutes);
app.use('/api', serviceRequestRoutes);
app.use('/api', authRoutes); // Add auth routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went really wrong",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
