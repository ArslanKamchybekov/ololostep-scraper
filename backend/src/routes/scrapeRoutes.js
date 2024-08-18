"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scrapeController_1 = require("../controllers/scrapeController");
const router = express_1.default.Router();
router.post('/scrape', scrapeController_1.scrapeWebsite); // Endpoint for scraping
router.post('/save', scrapeController_1.saveScrapedData); // Endpoint for saving scraped data
router.get('/my-data', scrapeController_1.getUserScrapedData); // Endpoint for getting user's scraped data
exports.default = router;
