const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/authRoutes');
const fetchData = require('./routes/fetchDataRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api//fetch', fetchData);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
