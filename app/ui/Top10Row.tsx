"use client";

import Link from "next/link";
import type { Movie } from "@/lib/schemas";

export default function Top10Row({ movies }: { movies: Movie[] }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs font-black px-2 py-0.5 rounded-md text-white"
          style={{ background: "linear-gradient(135deg,#ef4444,#f97316)" }}
        >
          TOP 10
        </span>
        <h2 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-wide uppercase">
          Tendencias esta semana
        </h2>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-neutral-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-1 overflow-x-auto genre-scroll pb-3 px-1">
          {movies.slice(0, 10).map((movie, i) => (
            <Top10Card key={movie.id} movie={movie} rank={i + 1} />
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-neutral-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

function Top10Card({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative shrink-0 flex items-end"
    >
      {/* Rank number overlapping poster from the left */}
      <span
        className="shrink-0 text-[5rem] sm:text-[6rem] font-black leading-none select-none z-10 transition-colors duration-200"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px rgba(113,113,122,0.6)",
          marginRight: "-10px",
          lineHeight: 1,
        }}
      >
        {rank}
      </span>

      {/* Poster */}
      <div className="relative w-24 sm:w-28 aspect-[2/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-md group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-black/30 transition-all duration-300">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
            Sin imagen
          </div>
        )}
        {movie.vote_average > 0 && (
          <span className="absolute top-2 right-2 bg-black/65 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
}
