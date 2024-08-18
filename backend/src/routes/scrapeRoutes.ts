import express from 'express';
import { scrapeWebsite, getUserScrapedData } from '../controllers/scrapeController'; 

const router = express.Router();

router.post('/scrape', scrapeWebsite);
router.get('/my-data', getUserScrapedData);

export default router;
