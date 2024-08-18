import express from 'express';
import { scrapeWebsite, saveScrapedData, getUserScrapedData } from '../controllers/scrapeController'; 

const router = express.Router();

router.post('/scrape', scrapeWebsite);  // Endpoint for scraping
router.post('/save', saveScrapedData);  // Endpoint for saving scraped data
router.get('/my-data', getUserScrapedData);  // Endpoint for getting user's scraped data

export default router;
