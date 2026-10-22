"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold text-red-400">Algo salió mal</h1>
      <p className="mt-2 text-slate-400">
        No pudimos cargar la información. Revisa tu conexión e inténtalo de nuevo.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-lime-400 px-4 py-2 font-semibold text-slate-900 hover:bg-lime-300"
      >
        Reintentar
      </button>
    </div>
  );
}