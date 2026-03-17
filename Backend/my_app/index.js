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
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL 
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api', itemRoutes);
app.use('/api', billRoutes);
app.use('/api/stats',statsRoutes);
app.use('/api/auth',authRoutes);

// Start Function
const  PORT  = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // put URI in .env
    console.log('MongoDB Connected');
    app.listen(PORT,() => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {require('dotenv').config();

const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err.message));
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
start();

