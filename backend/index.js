import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})