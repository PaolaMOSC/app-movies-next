export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="h-72 md:h-96 bg-slate-800 animate-pulse" />
      <div className="max-w-4xl mx-auto px-6 pb-16 -mt-24 relative">
        <div className="h-4 w-16 bg-slate-800 rounded animate-pulse mb-8" />
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-44 h-64 bg-slate-800 rounded-xl animate-pulse shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-slate-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-slate-800 rounded animate-pulse w-48" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-slate-800 rounded-full animate-pulse" />
            </div>
            <div className="h-28 bg-slate-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="mt-12">
          <div className="h-6 w-24 bg-slate-800 rounded animate-pulse mb-4" />
          <div className="aspect-video bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>
    </main>
  );
}
