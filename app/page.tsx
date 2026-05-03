import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { SearchQuerySchema } from "@/lib/schemas";
import { moviesQueryOptions } from "@/lib/queries";
import { getGenres, getTrendingMovies } from "@/lib/tmdb";
import MovieGrid from "@/app/ui/MovieGrid";
import StickyHeader from "@/app/ui/StickyHeader";
import Top10Row from "@/app/ui/Top10Row";

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
      <PageShell genres={[]}>
        <p className="text-center text-red-400 text-sm mt-4">⚠ {message}</p>
      </PageShell>
    );
  }

  const { q = "", genre = "" } = queryResult.data;
  const isFiltering = !!(q || genre);

  const [queryClient, genresData, trendingData] = await Promise.all([
    (async () => {
      const qc = new QueryClient();
      await qc.prefetchQuery(moviesQueryOptions(q, genre));
      return qc;
    })(),
    getGenres(),
    isFiltering ? Promise.resolve(null) : getTrendingMovies(),
  ]);

  const movieCount =
    queryClient
      .getQueryData<{ results: unknown[] }>(moviesQueryOptions(q, genre).queryKey)
      ?.results.length ?? 0;

  return (
    <PageShell genres={genresData.genres}>
      {/* Top 10 — only on main page, no filters active */}
      {!isFiltering && trendingData && (
        <Top10Row movies={trendingData.results.slice(0, 10)} />
      )}

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
  children,
}: {
  genres: { id: number; name: string }[];
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-zinc-950 text-zinc-900 dark:text-white pb-16">
      {/* Hero — scrolls away naturally */}
      <div className="max-w-3xl mx-auto pt-10 pb-6 text-center px-4 sm:px-6">
        <div className="flex justify-center mb-5">
          <ClapperboardLogo />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-[0.12em] uppercase mb-1 leading-none">
          <span className="text-zinc-900 dark:text-white">PAOLA </span>
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg,#ef4444,#f97316)" }}
          >
            FILM
          </span>
          <span className="text-zinc-900 dark:text-white"> APP</span>
        </h1>

        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-zinc-400 dark:text-zinc-500 mt-2">
          Trailer
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-red-500 text-xs">◆</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Sticky controls bar — sticks once hero scrolls away */}
      <StickyHeader genres={genres} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">{children}</div>
    </main>
  );
}

/* ─── Clapperboard SVG ───────────────────────────────────── */

function ClapperboardLogo() {
  const s = Array.from({ length: 14 }, (_, i) => ({
    x: i * 9 - 10,
    dark: i % 2 === 0,
  }));

  return (
    <svg width="110" height="96" viewBox="-5 -8 110 96" fill="none" aria-label="Claqueta de cine">
      <defs>
        <clipPath id="armClip"><rect x="0" y="0" width="72" height="18" rx="3" /></clipPath>
        <clipPath id="stripClip"><rect x="0" y="26" width="100" height="12" /></clipPath>
        <clipPath id="boardClip"><rect x="2" y="38" width="96" height="48" rx="8" /></clipPath>
        <linearGradient id="boardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
      </defs>
      <rect x="2" y="38" width="96" height="48" rx="8" fill="url(#boardGrad)" />
      <rect x="2" y="38" width="96" height="48" rx="8" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <g clipPath="url(#boardClip)">
        <rect x="2" y="38" width="96" height="13" fill="#dc2626" />
        <circle cx="13" cy="44.5" r="3.5" fill="white" opacity="0.9" />
        <rect x="22" y="41" width="34" height="7" rx="3.5" fill="white" opacity="0.55" />
        <rect x="68" y="41" width="22" height="7" rx="3.5" fill="white" opacity="0.4" />
      </g>
      <rect x="12" y="63" width="74" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="12" y="72" width="56" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="12" y="81" width="66" height="3" rx="1.5" fill="#3f3f46" />
      <g clipPath="url(#stripClip)">
        {s.map((stripe, i) => (
          <rect key={i} x={stripe.x} y="24" width="7" height="16"
            fill={stripe.dark ? "#09090b" : "#ffffff"} transform="skewX(-28)" />
        ))}
      </g>
      <rect x="0" y="26" width="100" height="12" fill="none" stroke="#3f3f46" strokeWidth="0.75" />
      <g transform="rotate(-15, 0, 26)">
        <g clipPath="url(#armClip)">
          {s.map((stripe, i) => (
            <rect key={i} x={stripe.x} y="0" width="7" height="18"
              fill={stripe.dark ? "#09090b" : "#ffffff"} transform="skewX(-28)" />
          ))}
        </g>
        <rect x="0" y="0" width="72" height="18" rx="3" fill="none" stroke="#52525b" strokeWidth="1" />
      </g>
      <circle cx="5" cy="26" r="6" fill="#27272a" stroke="#52525b" strokeWidth="1" />
      <circle cx="5" cy="26" r="3" fill="#52525b" />
      <circle cx="5" cy="26" r="1.2" fill="#a1a1aa" />
      <circle cx="5" cy="26" r="6" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
