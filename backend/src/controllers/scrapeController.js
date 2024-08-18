"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserScrapedData = exports.scrapeWebsite = exports.saveScrapedData = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const ScrapedData_1 = __importDefault(require("../models/ScrapedData"));
// Saves the scraped data
const saveScrapedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url } = req.body;
    const userId = req.userId;
    if (!title || !description || !url) {
        return res.status(400).json({ message: 'Title, description, and URL are required' });
    }
    try {
        // Store the scraped data in MongoDB, associated with the user
        const scrapedData = new ScrapedData_1.default({ title, description, url, user: userId });
        yield scrapedData.save();
        // Return a success message
        return res.status(201).json({ message: 'Data saved successfully' });
    }
    catch (error) {
        console.error('Error saving data:', error.message);
        return res.status(500).json({ message: 'Failed to save data' });
    }
});
exports.saveScrapedData = saveScrapedData;
const scrapeWebsite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const userId = req.userId;
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    try {
        const response = yield axios_1.default.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $('head > title').text();
        const description = $('meta[name="description"]').attr('content') || '';
        // Store the scraped data in MongoDB, associated with the user
        const scrapedData = new ScrapedData_1.default({ url, title, description, user: userId });
        yield scrapedData.save();
        return res.status(201).json({ title, description });
    }
    catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: 'Failed to scrape the website' });
    }
});
exports.scrapeWebsite = scrapeWebsite;
const getUserScrapedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const data = yield ScrapedData_1.default.find({ user: userId }).sort({ dateScraped: -1 });
        return res.status(200).json(data);
    }
    catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: 'Failed to fetch data' });
    }
});
exports.getUserScrapedData = getUserScrapedData;
