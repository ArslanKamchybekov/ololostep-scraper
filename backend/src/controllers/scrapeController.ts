// src/controllers/scrapeController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ScrapedData from '../models/ScrapedData';

export const scrapeWebsite = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        // Fetch the HTML of the webpage
        const response = await axios.get(url);
        const html = response.data;
        
        // Log the response for debugging
        console.log('HTML data:', html);

        // Load the HTML using cheerio
        const $ = cheerio.load(html);

        // Extract title and description
        const title = $('head > title').text();
        const description = $('meta[name="description"]').attr('content') || '';

        // Store the scraped data in MongoDB
        const scrapedData = new ScrapedData({ url, title, description, dateScraped: new Date() });
        await scrapedData.save();

        // Return the scraped data
        return res.status(201).json(scrapedData);
    } catch (error: any) {
        console.error('Error occurred:', error.message);

        return res.status(500).json({ message: 'Failed to scrape the website' });
    }
};

export const getAllScrapedData = async (req: Request, res: Response) => {
    try {
        const scrapedData = await ScrapedData.find();
        return res.status(200).json(scrapedData);
    } catch (error: any) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: 'Failed to fetch scraped data' });
    }
};
