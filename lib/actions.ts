"use server";

import { searchMovies, getRecentMovies, getMoviesByGenre } from "@/lib/tmdb";

export async function fetchMovies(query: string, genre?: string) {
  if (genre) return getMoviesByGenre(genre);
  if (query.trim()) return searchMovies(query);
  return getRecentMovies();
}
