import { notFound } from "next/navigation";
import Link from "next/link";
import { getMovieDetails, getMovieVideos } from "@/lib/tmdb";
import type { Video } from "@/lib/schemas";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [movie, videosData] = await Promise.all([
    getMovieDetails(id),
    getMovieVideos(id),
  ]);

  if (!movie) notFound();

  const trailer: Video | undefined =
    videosData.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) ?? videosData.results.find((v) => v.site === "YouTube");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {movie.backdrop_path && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 pb-16 -mt-24 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white mb-8 text-sm"
        >
          ← Volver
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-44 rounded-xl shadow-2xl self-start shrink-0"
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
              {movie.release_date && <span>📅 {movie.release_date}</span>}
              {movie.vote_average > 0 && (
                <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
              )}
              {movie.runtime && <span>⏱ {movie.runtime} min</span>}
            </div>

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-slate-300 leading-relaxed">
              {movie.overview || "Sin descripción disponible."}
            </p>
          </div>
        </div>

        {trailer ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Tráiler</h2>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        ) : (
          <div className="mt-12 flex items-center gap-2 text-slate-500 text-sm">
            <span>🎬</span>
            <p>No hay tráiler disponible para esta película.</p>
          </div>
        )}
      </div>
    </main>
  );
}
