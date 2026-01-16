import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined. Check your .env file');
}

if (!process.env.TMDB_BASE_URL) {
  throw new Error('TMDB_BASE_URL is not defined. Check your .env file');
}

export const env = {
  apiKey: process.env.TMDB_API_KEY,
  baseUrl: process.env.TMDB_BASE_URL
};
