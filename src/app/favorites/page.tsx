import type { Metadata } from "next";
import FavoritesList from "@/components/favorites/FavoritesList";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-lime-400">Favoritos</h1>
      <FavoritesList />
    </section>
  );
}