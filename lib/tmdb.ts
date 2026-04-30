import {
  MoviesResponseSchema,
  MovieDetailSchema,
  VideosResponseSchema,
  GenresListSchema,
} from "@/lib/schemas";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

async function tmdbFetch(path: string) {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, { headers });
  if (!response.ok)
    throw new Error(`Error al conectar con TMDB: ${response.statusText}`);
  return response.json();
}

export async function searchMovies(query: string) {
  const data = await tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&language=es-ES`
  );
  return MoviesResponseSchema.parse(data);
}

export async function getRecentMovies() {
  const data = await tmdbFetch(`/movie/now_playing?language=es-ES&page=1`);
  return MoviesResponseSchema.parse(data);
}

export async function getMoviesByGenre(genreId: string) {
  const data = await tmdbFetch(
    `/discover/movie?with_genres=${genreId}&language=es-ES&sort_by=popularity.desc`
  );
  return MoviesResponseSchema.parse(data);
}

export async function getGenres() {
  const data = await tmdbFetch(`/genre/movie/list?language=es-ES`);
  return GenresListSchema.parse(data);
}

export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?language=es-ES`,
    { headers }
  );
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`Error al conectar con TMDB: ${response.statusText}`);
  const data = await response.json();
  return MovieDetailSchema.parse(data);
}

export async function getMovieVideos(id: string) {
  const data = await tmdbFetch(`/movie/${id}/videos?language=es-ES`);
  return VideosResponseSchema.parse(data);
}
