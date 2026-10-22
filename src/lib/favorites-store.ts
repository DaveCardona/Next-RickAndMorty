import type { FavoriteCharacter } from "@/types";

const STORAGE_KEY = "rm-favorites";
const EMPTY: FavoriteCharacter[] = [];

let cache: FavoriteCharacter[] = EMPTY;
let cachedRaw: string | null = null;
const listeners = new Set<() => void>();

/** Lee de localStorage. Devuelve SIEMPRE la misma referencia si nada cambió. */
export function getSnapshot(): FavoriteCharacter[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cache = raw ? (JSON.parse(raw) as FavoriteCharacter[]) : EMPTY;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

/** En el servidor no hay localStorage: null significa "aún no cargado". */
export function getServerSnapshot(): null {
  return null;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function saveFavorites(list: FavoriteCharacter[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  listeners.forEach((listener) => listener());
}