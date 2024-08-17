import { Router } from 'express';
import { scrapeWebsite, getUserScrapedData } from '../controllers/scrapeController';
import { clerkAuth, getUserId } from '../middleware/clerkMiddleware';

const router = Router();

router.post('/scrape', clerkAuth, getUserId, scrapeWebsite);
router.get('/data', clerkAuth, getUserId, getUserScrapedData);

export default router;
