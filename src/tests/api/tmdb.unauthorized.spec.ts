import { test, expect } from '@playwright/test';
import { TmdbService } from '@../../../src/services/tmdb.service';

test.describe('TMDB Listado Películas - Unauthorized (401)', () => {

  const list = [
    '/movie/top_rated',
    '/movie/popular',
    '/movie/now_playing',
    '/movie/upcoming'
  ];

  //
  for (const lists of list) {
    test(`GET ${lists} sin API KEY, retorna un 401 (Unauthorized)`, async ({ request }) => {

      const tmdb = new TmdbService(request);
      const response = await tmdb.getWithoutApiKey(lists);

      // Status code
      expect(response.status()).toBe(401);

      const body = await response.json();

      // Mensaje error
      expect(body.status_message).toContain('Invalid API key');
    });
  }

});
