"use client";

import { useRouter } from "next/navigation";

interface EpisodeFiltersProps {
  defaults: { name?: string; episode?: string };
}

const fieldClass =
  "rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-lime-400 focus:outline-none";

const SEASONS = ["S01", "S02", "S03", "S04", "S05"];

export default function EpisodeFilters({ defaults }: EpisodeFiltersProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();
    new FormData(e.currentTarget).forEach((value, key) => {
      const text = String(value).trim();
      if (text) query.set(key, text);
    });
    router.push(`/episodes?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input
        name="name"
        defaultValue={defaults.name}
        placeholder="Nombre del episodio"
        aria-label="Nombre"
        className={fieldClass}
      />

      <select
        name="episode"
        defaultValue={defaults.episode ?? ""}
        aria-label="Temporada"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={fieldClass}
      >
        <option value="">Todas las temporadas</option>
        {SEASONS.map((season) => (
          <option key={season} value={season}>
            Temporada {Number(season.slice(1))}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-lime-300"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={() => router.push("/episodes")}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-lime-400"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}