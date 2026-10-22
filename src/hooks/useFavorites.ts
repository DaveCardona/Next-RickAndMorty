"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { FavoriteCharacter } from "@/types";
import {
  getServerSnapshot,
  getSnapshot,
  saveFavorites,
  subscribe,
} from "@/lib/favorites-store";

const NO_FAVORITES: FavoriteCharacter[] = [];

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const favorites = snapshot ?? NO_FAVORITES;
  const isReady = snapshot !== null;

  const isFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (character: FavoriteCharacter) => {
      const exists = favorites.some((item) => item.id === character.id);
      saveFavorites(
        exists
          ? favorites.filter((item) => item.id !== character.id)
          : [...favorites, character]
      );
    },
    [favorites]
  );

  return { favorites, isReady, isFavorite, toggleFavorite };
}