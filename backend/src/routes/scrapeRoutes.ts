import express from 'express';
import { scrapeWebsite, getUserScrapedData } from '../controllers/scrapeController'; 

const router = express.Router();

router.post('/scrape', scrapeWebsite);  // Endpoint for scraping
router.get('/my-data', getUserScrapedData);  // Endpoint for getting user's scraped data

export default router;
