"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set("q", value.trim());
      startTransition(() => router.replace(`/?${params.toString()}`));
    }, 400);
    return () => clearTimeout(timer);
  }, [value, router]);

  function clear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-zinc-400 dark:text-zinc-500"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar película, director…"
        className="w-full rounded-xl
                   bg-white dark:bg-zinc-800/90
                   border border-zinc-200 dark:border-zinc-700
                   focus:border-red-500 dark:focus:border-red-500
                   focus:ring-2 focus:ring-red-500/15
                   outline-none pl-11 pr-11 py-3
                   text-zinc-900 dark:text-white
                   placeholder-zinc-400 dark:placeholder-zinc-500
                   text-sm transition-all shadow-sm dark:shadow-none"
      />

      {/* Right indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {isPending ? (
          <svg className="w-4 h-4 text-red-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : value ? (
          <button
            onClick={clear}
            aria-label="Limpiar búsqueda"
            className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500
                       flex items-center justify-center text-zinc-500 dark:text-zinc-300
                       hover:text-zinc-700 dark:hover:text-white transition-colors text-xs"
          >
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}
