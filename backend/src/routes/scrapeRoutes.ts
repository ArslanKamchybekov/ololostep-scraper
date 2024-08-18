import { Router } from 'express';
import { scrapeWebsite, getUserScrapedData } from '../controllers/scrapeController';
import { verifyClerkSession } from '../middleware/clerkMiddleware';

const router = Router();

router.post('/scrape', verifyClerkSession, scrapeWebsite);
router.get('/data', verifyClerkSession, getUserScrapedData);

export default router;
