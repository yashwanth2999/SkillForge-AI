import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Google Gen AI SDK
export const aiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
