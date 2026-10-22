"use client";

import { useRouter } from "next/navigation";

interface CharacterFiltersProps {
  defaults: {
    name?: string;
    status?: string;
    gender?: string;
    species?: string;
  };
}

const selectClass =
  "rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-lime-400 focus:outline-none";

export default function CharacterFilters({ defaults }: CharacterFiltersProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = new URLSearchParams();

    formData.forEach((value, key) => {
      const text = String(value).trim();
      if (text) query.set(key, text);
    });

    // Sin "page": cada filtro nuevo vuelve a la página 1
    router.push(`/characters?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      <input
        name="name"
        defaultValue={defaults.name}
        placeholder="Nombre"
        aria-label="Nombre"
        className={selectClass}
      />

      <select
        name="status"
        defaultValue={defaults.status ?? ""}
        aria-label="Estado"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={selectClass}
      >
        <option value="">Todos los estados</option>
        <option value="Alive">Vivo</option>
        <option value="Dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>

      <select
        name="gender"
        defaultValue={defaults.gender ?? ""}
        aria-label="Género"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={selectClass}
      >
        <option value="">Todos los géneros</option>
        <option value="Female">Femenino</option>
        <option value="Male">Masculino</option>
        <option value="Genderless">Sin género</option>
        <option value="unknown">Desconocido</option>
      </select>

      <input
        name="species"
        defaultValue={defaults.species}
        placeholder="Especie (Human, Alien...)"
        aria-label="Especie"
        className={selectClass}
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
          onClick={() => router.push("/characters")}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-lime-400"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}