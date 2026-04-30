"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { moviesQueryOptions } from "@/lib/queries";
import type { Movie } from "@/lib/schemas";

export default function MovieGrid({
  query,
  genre,
}: {
  query: string;
  genre?: string;
}) {
  const { data } = useSuspenseQuery(moviesQueryOptions(query, genre));
  const movies: Movie[] = data.results;

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-400 dark:text-zinc-600">
        <svg className="w-12 h-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <p className="text-base font-medium">No se encontraron resultados</p>
        {query && (
          <p className="text-sm text-zinc-500 dark:text-zinc-600">
            Intenta con otro término distinto a{" "}
            <span className="text-zinc-700 dark:text-zinc-400 font-semibold">"{query}"</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block rounded-xl overflow-hidden
                 bg-white dark:bg-zinc-900
                 shadow-sm dark:shadow-none
                 ring-1 ring-zinc-200 dark:ring-zinc-800
                 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20
                 dark:hover:ring-zinc-600
                 transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
            Sin imagen
          </div>
        )}
        {movie.vote_average > 0 && (
          <span className="absolute top-2 right-2 bg-black/65 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="p-2.5">
        <h2 className="font-semibold text-xs leading-tight line-clamp-2 text-zinc-900 dark:text-zinc-100">
          {movie.title}
        </h2>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
          {movie.release_date?.slice(0, 4) || "—"}
        </p>
      </div>
    </Link>
  );
}
