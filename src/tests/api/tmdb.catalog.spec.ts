import { test, expect } from '@playwright/test';
import { TmdbService } from '../../../src/services/tmdb.service';

const catalog = [
  '/movie/top_rated',
  '/movie/popular',
  '/movie/now_playing',
  '/movie/upcoming'
];

test.describe('TMDB Listado Películas - Status 200', () => {

  for (const catalogs of catalog) {
    test(`GET ${catalogs} debe retornar un formato de listado válido (Status 200).`, async ({ request }) => {

      const tmdb = new TmdbService(request);
      const response = await tmdb.get(catalogs);

      // Status 200
      expect(response.status()).toBe(200);

      const body = await response.json();

      // ==========================
      // VALIDACIÓN METADATOS
      // ==========================
      expect(body).toHaveProperty('page');
      expect(body).toHaveProperty('total_results');
      expect(body).toHaveProperty('total_pages');

      expect(typeof body.page).toBe('number');
      expect(typeof body.total_results).toBe('number');
      expect(typeof body.total_pages).toBe('number');

      // ==========================
      // VALIDACIÓN RESULTADOS
      // ==========================
      expect(body).toHaveProperty('results');
      expect(Array.isArray(body.results)).toBe(true);
      expect(body.results.length).toBeGreaterThan(0);

      const firstMovie = body.results[0];

      // =================================
      // VALIDACIÓN CAMPOS SOLICITADOS
      // =================================
      expect(firstMovie, 'Existe un ID.').toHaveProperty('id');
      expect(firstMovie, 'Existe un título.').toHaveProperty('title');
      expect(firstMovie, 'Existe una fecha de lanzamiento.').toHaveProperty('release_date');

      expect(typeof firstMovie.id).toBe('number');
      expect(typeof firstMovie.title).toBe('string');
      expect(typeof firstMovie.release_date).toBe('string');
    });
  }

});
