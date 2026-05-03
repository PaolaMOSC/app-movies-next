"use client";

import { Suspense } from "react";
import SearchInput from "@/app/ui/SearchInput";
import GenreFilter from "@/app/ui/GenreFilter";
import ThemeToggle from "@/app/ui/ThemeToggle";
import type { Genre } from "@/lib/schemas";

export default function StickyHeader({ genres }: { genres: Genre[] }) {
  return (
    <div className="sticky top-0 z-20 bg-neutral-100/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6">
      <div className="relative max-w-3xl mx-auto py-3">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <ThemeToggle />
        </div>
        <div className="pr-10">
          <Suspense>
            <SearchInput />
          </Suspense>
          {genres.length > 0 && (
            <div className="mt-3">
              <Suspense>
                <GenreFilter genres={genres} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
