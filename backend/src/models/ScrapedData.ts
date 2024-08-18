// src/models/ScrapedData.ts
import { Schema, model } from 'mongoose';

interface IScrapedData {
    url: string;
    title: string;
    description: string;
    dateScraped: Date;
}

const ScrapedDataSchema = new Schema<IScrapedData>({
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dateScraped: { type: Date, default: Date.now },
});

const ScrapedData = model<IScrapedData>('ScrapedData', ScrapedDataSchema);

export default ScrapedData;