import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ScrapedData from '../models/ScrapedData';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

// Saves the scraped data
export const saveScrapedData = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, url } = req.body;
    const userId = req.userId;

    if (!title || !description || !url) {
        return res.status(400).json({ message: 'Title, description, and URL are required' });
    }

    try {
        // Store the scraped data in MongoDB, associated with the user
        const scrapedData = new ScrapedData({ title, description, url, user: userId });
        await scrapedData.save();

        // Return a success message
        return res.status(201).json({ message: 'Data saved successfully' });
    } catch (error: any) {
        console.error('Error saving data:', error.message);
        return res.status(500).json({ message: 'Failed to save data' });
    }
};

export const scrapeWebsite = async (req: AuthenticatedRequest, res: Response) => {
  const { url } = req.body;
  const userId = req.userId;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('head > title').text();
    const description = $('meta[name="description"]').attr('content') || '';

    // Store the scraped data in MongoDB, associated with the user
    const scrapedData = new ScrapedData({ url, title, description, user: userId });
    await scrapedData.save();

    return res.status(201).json({ title, description });
  } catch (error: any) {
    console.error('Error occurred:', error.message);
    return res.status(500).json({ message: 'Failed to scrape the website' });
  }
};

export const getUserScrapedData = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  try {
    const data = await ScrapedData.find({ user: userId }).sort({ dateScraped: -1 });
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error occurred:', error.message);
    return res.status(500).json({ message: 'Failed to fetch data' });
  }
};

