const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors()); 
app.use(express.json());
app.use(rateLimiter);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
