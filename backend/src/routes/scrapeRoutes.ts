// src/routes/scrapeRoutes.ts
import { Router } from 'express';
import { scrapeWebsite, getAllScrapedData } from '../controllers/scrapeController';

const router = Router();

router.post('/scrape', scrapeWebsite);
router.get('/data', getAllScrapedData);

export default router;
