require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const cors = require("cors"); // Import the CORS package

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // parse JSON bodies in the request object

// Route handlers

//const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const billingRoutes = require('./routes/billingRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');


//app.use('/api', authRoutes);
app.use('/api', roomRoutes);
app.use('/api', userRoutes);
app.use('/api', billingRoutes);
app.use('/api', reservationRoutes);
app.use('/api', serviceRequestRoutes);

// Global Error Handler. IMPORTANT: function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went really wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
