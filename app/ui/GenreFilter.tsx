"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { Genre } from "@/lib/schemas";

const VISIBLE_GENRES = [28, 35, 27, 18, 878, 10749, 53, 12, 80, 16, 10752];

export default function GenreFilter({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentGenre = searchParams.get("genre") ?? "";

  const visible = genres.filter((g) => VISIBLE_GENRES.includes(g.id));

  function select(id: string) {
    const params = new URLSearchParams();
    if (id && id !== currentGenre) {
      params.set("genre", id);
    }
    startTransition(() => router.replace(`/?${params.toString()}`));
  }

  const pill =
    "shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95";
  const active =
    "bg-red-600 text-white shadow-lg shadow-red-500/40 ring-1 ring-red-400/40";
  const inactive =
    "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 hover:shadow-md hover:shadow-zinc-400/20 " +
    "dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:shadow-zinc-900/40";

  return (
    <div className={`relative transition-opacity duration-150 ${isPending ? "opacity-50" : ""}`}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-neutral-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-2 overflow-x-auto genre-scroll pb-2 px-2">
        <button
          onClick={() => select("")}
          className={`${pill} ${!currentGenre ? active : inactive}`}
        >
          Todos
        </button>
        {visible.map((g) => (
          <button
            key={g.id}
            onClick={() => select(String(g.id))}
            className={`${pill} ${currentGenre === String(g.id) ? active : inactive}`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
