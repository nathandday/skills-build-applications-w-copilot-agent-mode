import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

startServer();
