const BASE_URL = "https://rickandmortyapi.com/api";

type QueryParams = Record<string, string | number | undefined>;

export async function fetchApi<T>(
  path: string,
  params: QueryParams = {}
): Promise<T | null> {
  const query = new URLSearchParams();

  // Solo agregamos los parámetros que tengan valor
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  const url = `${BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // cachea la respuesta 1 hora
  });

  // 404 = "no hay resultados" en esta API, no es un fallo real
  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`);
  }

  return response.json() as Promise<T>;
}