import { fetchApi } from "./http";
import type { ApiResponse, Episode } from "@/types";

export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string; // Ej: "S01" filtra toda la temporada 1
}

export function getEpisodes(filters: EpisodeFilters = {}) {
  return fetchApi<ApiResponse<Episode>>("/episode", { ...filters });
}

export function getEpisodeById(id: number) {
  return fetchApi<Episode>(`/episode/${id}`);
}