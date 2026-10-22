# Next-RickAndMorty

Taller de Desarrollo Híbrido. Es una aplicación hecha con Next.js que usa la
API de Rick and Morty (https://rickandmortyapi.com) para ver personajes,
episodios y locaciones.

## Tecnologías

Next.js 16 (App Router), React, TypeScript y Tailwind CSS.

## Cómo correrlo

Necesita Node.js 20 o superior.

```bash
git clone https://github.com/DaveCardona/Next-RickAndMorty.git
cd Next-RickAndMorty
npm install
npm run dev
```

Luego abrir http://localhost:3000

## Qué tiene

- Navbar con menú, buscador y footer.
- Listados de personajes, episodios y locaciones con paginación.
- Filtros (estado, género, especie, temporada, tipo, dimensión). Los filtros
  quedan en la URL, por ejemplo `/characters?status=Alive&page=2`.
- Página de detalle de cada elemento (`/characters/[id]`, `/episodes/[id]`,
  `/locations/[id]`).
- Favoritos de personajes guardados en localStorage.
- Diseño responsive con Tailwind.

## Carpetas

- `src/app`: las páginas y rutas.
- `src/components`: componentes (layout, ui, y uno por sección).
- `src/services`: funciones que consultan la API.
- `src/types`: interfaces de TypeScript.
- `src/hooks`: el hook `useFavorites`.
- `src/lib`: constantes, utilidades y el manejo de localStorage.

## Server y Client Components

Las páginas y las tarjetas son Server Components porque solo muestran datos.
Son Client Components los que necesitan interactividad: Navbar (menú móvil),
NavLinks, SearchBox, los filtros, FavoriteButton y FavoritesList (usan
localStorage).

## Resultado del build

| Ruta | Tipo |
|---|---|
| `/`, `/favorites` | Estática (○) |
| `/characters/[id]`, `/episodes/[id]`, `/locations/[id]` | SSG (●) |
| `/characters`, `/episodes`, `/locations` | Dinámica (ƒ) |

Los listados son dinámicos porque leen los filtros de la URL. En las páginas de
detalle solo se pre-renderizan unas pocas con `generateStaticParams`, porque con
más la API respondía error 429 (demasiadas peticiones) durante el build.

## Notas

- El buscador del Navbar solo busca personajes.
- Solo los personajes se pueden guardar como favoritos.