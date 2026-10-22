import { fetchApi } from "./http";
import type { ApiResponse, Location } from "@/types";

export interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export function getLocations(filters: LocationFilters = {}) {
  return fetchApi<ApiResponse<Location>>("/location", { ...filters });
}

export function getLocationById(id: number) {
  return fetchApi<Location>(`/location/${id}`);
}