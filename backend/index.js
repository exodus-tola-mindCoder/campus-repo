import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config();
// import routes
import authRoutes from './routes/auth.routes.js';


// Connect to MongoDB
connectDB();

const app = express();

// body parser middleware
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})