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
    "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer";
  const active = "bg-red-600 text-white shadow-lg shadow-red-900/30";
  const inactive =
    "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 " +
    "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:[--override:0]";

  return (
    <div
      className={`flex gap-2 overflow-x-auto scrollbar-hide pb-1 ${isPending ? "opacity-60" : ""}`}
    >
      <button
        onClick={() => select("")}
        className={`${pill} ${!currentGenre ? active : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"}`}
      >
        Todos
      </button>
      {visible.map((g) => (
        <button
          key={g.id}
          onClick={() => select(String(g.id))}
          className={`${pill} ${
            currentGenre === String(g.id)
              ? active
              : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
