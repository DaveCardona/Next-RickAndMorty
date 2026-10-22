import Link from "next/link";
import type { Location } from "@/types";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900 transition hover:border-lime-400">
      <Link href={`/locations/${location.id}`} className="block space-y-2 p-4">
        <h2 className="font-semibold text-white">{location.name}</h2>
        <p className="text-sm text-slate-300">{location.type || "Tipo desconocido"}</p>
        <p className="text-sm text-slate-400">{location.dimension || "Dimensión desconocida"}</p>
        <p className="text-xs text-lime-400">{location.residents.length} residentes</p>
      </Link>
    </article>
  );
}