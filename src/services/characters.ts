import { fetchApi } from "./http";
import type { ApiResponse, Character, CharacterGender, CharacterStatus } from "@/types";

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: CharacterStatus | "";
  gender?: CharacterGender | "";
  species?: string;
  type?: string;
}

export function getCharacters(filters: CharacterFilters = {}) {
  return fetchApi<ApiResponse<Character>>("/character", { ...filters });
}

export function getCharacterById(id: number) {
  return fetchApi<Character>(`/character/${id}`);
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  const data = await fetchApi<Character | Character[]>(`/character/${ids.join(",")}`);
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}