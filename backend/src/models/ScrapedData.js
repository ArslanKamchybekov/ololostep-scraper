"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/ScrapedData.ts
const mongoose_1 = require("mongoose");
const ScrapedDataSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dateScraped: { type: Date, default: Date.now },
});
const ScrapedData = (0, mongoose_1.model)('ScrapedData', ScrapedDataSchema);
exports.default = ScrapedData;
