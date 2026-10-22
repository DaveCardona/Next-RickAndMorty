"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita que el navegador recargue la página
    const value = term.trim();
    if (!value) return;
    router.push(`/characters?name=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="flex w-full gap-2">
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar personaje..."
        aria-label="Buscar personaje"
        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-lime-300"
      >
        Buscar
      </button>
    </form>
  );
}