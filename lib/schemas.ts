import { z } from "zod";

export const SearchQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .max(100, "La búsqueda no puede superar los 100 caracteres")
    .optional(),
  genre: z.string().regex(/^\d*$/).optional(),
});

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().default(""),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional().default(""),
  vote_average: z.number().optional().default(0),
});

export const MoviesResponseSchema = z.object({
  results: z.array(MovieSchema).default([]),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const GenresListSchema = z.object({
  genres: z.array(GenreSchema).default([]),
});

export const MovieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().default(""),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  release_date: z.string().optional().default(""),
  vote_average: z.number().optional().default(0),
  runtime: z.number().nullable().optional(),
  genres: z.array(GenreSchema).default([]),
});

const VideoSchema = z.object({
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
});

export const VideosResponseSchema = z.object({
  results: z.array(VideoSchema).default([]),
});

export type Movie = z.infer<typeof MovieSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type Video = z.infer<typeof VideoSchema>;
