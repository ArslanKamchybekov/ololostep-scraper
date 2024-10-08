// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import scrapeRoutes from './routes/scrapeRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', scrapeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Web Scraper API');
});

export default app;
