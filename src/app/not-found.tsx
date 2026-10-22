import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-lime-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Esta dimensión no existe</h1>
      <p className="mt-2 text-slate-400">No encontramos lo que buscabas.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-lime-400 px-4 py-2 font-semibold text-slate-900 hover:bg-lime-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}