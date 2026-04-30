"use client";

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
      <h2 className="text-2xl font-bold mb-2">Ocurrió un error</h2>
      <p className="text-slate-400 mb-6 text-center max-w-md">{error.message}</p>
      <button
        onClick={unstable_retry}
        className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
