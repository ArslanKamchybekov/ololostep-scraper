// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Web Scraper API');
});

export default app;
