export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-zinc-950 px-4 sm:px-6 pb-16">
      {/* Header skeleton */}
      <div className="max-w-3xl mx-auto pt-10 pb-6 text-center">
        <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl mx-auto mb-5 animate-pulse" />
        <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mb-6 animate-pulse" />
        <div className="h-11 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse mb-4" />
        {/* Genre pills skeleton */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"
              style={{ width: `${60 + (i % 3) * 20}px` }}
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mb-5 animate-pulse" />
        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <div className="aspect-[2/3] bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="p-2.5 space-y-1.5">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-2.5 w-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
