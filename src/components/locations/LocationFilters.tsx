"use client";

import { useRouter } from "next/navigation";

interface LocationFiltersProps {
  defaults: { name?: string; type?: string; dimension?: string };
}

const fieldClass =
  "rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none";

export default function LocationFilters({ defaults }: LocationFiltersProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();
    new FormData(e.currentTarget).forEach((value, key) => {
      const text = String(value).trim();
      if (text) query.set(key, text);
    });
    router.push(`/locations?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <input
        name="name"
        defaultValue={defaults.name}
        placeholder="Nombre"
        aria-label="Nombre"
        className={fieldClass}
      />
      <input
        name="type"
        defaultValue={defaults.type}
        placeholder="Tipo (Planet, Space station...)"
        aria-label="Tipo"
        className={fieldClass}
      />
      <input
        name="dimension"
        defaultValue={defaults.dimension}
        placeholder="Dimensión (C-137...)"
        aria-label="Dimensión"
        className={fieldClass}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-lime-300"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={() => router.push("/locations")}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-lime-400"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}