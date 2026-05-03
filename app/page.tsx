import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { SearchQuerySchema } from "@/lib/schemas";
import { moviesQueryOptions } from "@/lib/queries";
import { getGenres } from "@/lib/tmdb";
import MovieGrid from "@/app/ui/MovieGrid";
import StickyHeader from "@/app/ui/StickyHeader";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const queryResult = SearchQuerySchema.safeParse({ q: params.q, genre: params.genre });

  if (!queryResult.success) {
    const message = queryResult.error.issues[0].message;
    return (
      <PageShell genres={[]} query="" genre="">
        <p className="text-center text-red-400 text-sm mt-4">⚠ {message}</p>
      </PageShell>
    );
  }

  const { q = "", genre = "" } = queryResult.data;

  const [queryClient, genresData] = await Promise.all([
    (async () => {
      const qc = new QueryClient();
      await qc.prefetchQuery(moviesQueryOptions(q, genre));
      return qc;
    })(),
    getGenres(),
  ]);

  const movieCount =
    queryClient
      .getQueryData<{ results: unknown[] }>(moviesQueryOptions(q, genre).queryKey)
      ?.results.length ?? 0;

  return (
    <PageShell genres={genresData.genres} query={q} genre={genre}>
      {/* Status line */}
      <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-5 text-center h-4">
        {genre
          ? `${movieCount} película${movieCount !== 1 ? "s" : ""} en este género`
          : q && movieCount > 0
          ? `${movieCount} resultado${movieCount !== 1 ? "s" : ""} para "${q}"`
          : !q && !genre
          ? "En cartelera ahora"
          : null}
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieGrid query={q} genre={genre} />
      </HydrationBoundary>
    </PageShell>
  );
}

/* ─── Shell ──────────────────────────────────────────────── */

async function PageShell({
  genres,
  query,
  genre,
  children,
}: {
  genres: { id: number; name: string }[];
  query: string;
  genre: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-zinc-950 text-zinc-900 dark:text-white pb-16">
      <StickyHeader genres={genres} />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">{children}</div>
    </main>
  );
}
