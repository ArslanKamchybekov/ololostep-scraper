"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const scrapeRoutes_1 = __importDefault(require("./routes/scrapeRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, db_1.default)();
// Middlewares
app.use(express_1.default.json());
// Routes
app.use('/api', scrapeRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the Web Scraper API');
});
exports.default = app;
