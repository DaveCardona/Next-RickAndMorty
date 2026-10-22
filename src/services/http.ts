const BASE_URL = "https://rickandmortyapi.com/api";
const MAX_RETRIES = 3;

type QueryParams = Record<string, string | number | undefined>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchApi<T>(
  path: string,
  params: QueryParams = {}
): Promise<T | null> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  const url = `${BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (response.status === 404) return null;

    // 429 = demasiadas peticiones: esperamos y reintentamos
    if (response.status === 429 && attempt < MAX_RETRIES) {
      await sleep(1000 * (attempt + 1)); // 1s, 2s, 3s
      continue;
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status} al consultar ${path}`);
    }

    return response.json() as Promise<T>;
  }

  throw new Error(`No se pudo consultar ${path}`);
}