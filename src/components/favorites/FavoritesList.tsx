"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import CharacterCard from "@/components/characters/CharacterCard";
import ListSkeleton from "@/components/ui/ListSkeleton";

export default function FavoritesList() {
  const { favorites, isReady } = useFavorites();

  if (!isReady) return <ListSkeleton count={4} />;

  if (favorites.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        <p>Aún no tienes favoritos.</p>
        <Link href="/characters" className="mt-2 inline-block text-lime-400 hover:underline">
          Explorar personajes
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-slate-400">
        {favorites.length} {favorites.length === 1 ? "favorito" : "favoritos"}
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}