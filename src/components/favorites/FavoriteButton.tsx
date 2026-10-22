"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteCharacter } from "@/types";

interface FavoriteButtonProps {
  character: FavoriteCharacter;
  className?: string;
}

export default function FavoriteButton({ character, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isReady } = useFavorites();
  const active = isReady && isFavorite(character.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(character)}
      aria-pressed={active}
      aria-label={active ? `Quitar a ${character.name} de favoritos` : `Agregar a ${character.name} a favoritos`}
      className={`rounded-full p-2 text-lg leading-none transition ${
        active
          ? "bg-lime-400 text-slate-900"
          : "bg-slate-900/80 text-slate-200 hover:bg-slate-800"
      } ${className}`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}