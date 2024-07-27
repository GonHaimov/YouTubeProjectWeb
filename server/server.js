// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const seedDB = require('./seed'); // Import the seed script

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);
app.use('/api', videoRoutes);
app.use('/api', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.SEED_DB === 'true') {
    await seedDB();
  }
});
