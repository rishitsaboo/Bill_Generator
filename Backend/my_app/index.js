const express = require('express'); 
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const statsRoutes = require('./routes/statsRoutes');
const itemRoutes = require('./routes/billRoutes');


require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api', itemRoutes);
app.use('/api/stats',statsRoutes)

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

