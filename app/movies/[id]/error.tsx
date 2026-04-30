"use client";

import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-2xl font-bold mb-2">No se pudo cargar la película</h2>
      <p className="text-slate-400 mb-6 text-center max-w-md">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={unstable_retry}
          className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-600 px-6 py-3 font-bold hover:border-slate-400"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
