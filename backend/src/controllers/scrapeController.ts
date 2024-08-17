// src/controllers/scrapeController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import ScrapedData from '../models/ScrapedData';

export const scrapeWebsite = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');

        const scrapedData = new ScrapedData({
            url,
            title,
            description,
            dateScraped: new Date(),
        });

        await scrapedData.save();
        return res.status(200).json(scrapedData);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to scrape the website' });
    }
};

export const getAllScrapedData = async (req: Request, res: Response) => {
    try {
        const data = await ScrapedData.find().sort({ dateScraped: -1 });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch data' });
    }
};
