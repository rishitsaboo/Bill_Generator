const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const statsRoutes = require('./routes/statsRoutes');
const billRoutes = require("./routes/billRoutes");
const authRoutes = require("./routes/authroutes");



require('dotenv').config();
const app = express();

// CORS configuration - allow requests from frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api', itemRoutes,billRoutes);
app.use('/api/stats',statsRoutes);
app.use('/api/auth',authRoutes);

// Start Function
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // put URI in .env
    console.log('MongoDB Connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
start();

