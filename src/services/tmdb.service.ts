import { APIRequestContext, expect } from '@playwright/test';
import { env } from '../utils/env';

export class TmdbService {
  constructor(private request: APIRequestContext) {
    // DEBUG API KEY
   // console.log('API KEY:', env.apiKey);
  }

  async get(endpoint: string) {
    return await this.request.get(`${env.baseUrl}${endpoint}`, {
      params: {
        api_key: env.apiKey
      }
    });
  }

  async getWithoutApiKey(endpoint: string) {
    return await this.request.get(`${env.baseUrl}${endpoint}`);
  }
}
