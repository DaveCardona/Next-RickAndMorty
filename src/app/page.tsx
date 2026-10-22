import Link from "next/link";
import { getCharacters, getEpisodes, getLocations } from "@/services";
import CharacterGrid from "@/components/characters/CharacterGrid";

const SECTIONS = [
  { href: "/characters", label: "Personajes", description: "Conoce a cada habitante del multiverso." },
  { href: "/episodes", label: "Episodios", description: "Todas las temporadas, una por una." },
  { href: "/locations", label: "Locaciones", description: "Planetas, dimensiones y estaciones." },
] as const;

export default async function Home() {
  // Las tres peticiones se hacen a la vez, no una tras otra
  const [characters, episodes, locations] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getLocations(),
  ]);

  const counts = [
    characters?.info.count ?? 0,
    episodes?.info.count ?? 0,
    locations?.info.count ?? 0,
  ];

  return (
    <div className="space-y-12">
      <section className="py-8 text-center sm:py-12">
        <h1 className="text-4xl font-bold text-lime-400 sm:text-5xl">
          Bienvenido al multiverso
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Explora personajes, episodios y locaciones de Rick and Morty, y guarda tus favoritos.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {SECTIONS.map((section, index) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-lime-400"
          >
            <p className="text-3xl font-bold text-lime-400">{counts[index]}</p>
            <h2 className="mt-1 text-lg font-semibold">{section.label}</h2>
            <p className="mt-1 text-sm text-slate-400">{section.description}</p>
          </Link>
        ))}
      </section>

      {characters && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Personajes destacados</h2>
            <Link href="/characters" className="text-sm text-lime-400 hover:underline">
              Ver todos →
            </Link>
          </div>
          <CharacterGrid characters={characters.results.slice(0, 4)} />
        </section>
      )}
    </div>
  );
}