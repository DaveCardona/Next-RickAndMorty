/** Extrae el ID numérico del final de una URL de la API. */
export function extractId(url: string): number | null {
  const match = url.match(/\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

/** Devuelve una copia de los parámetros sin "page" (para conservar filtros al paginar). */
export function withoutPage<T extends { page?: string }>(params: T): Omit<T, "page"> {
  const copy = { ...params };
  delete copy.page;
  return copy;
}