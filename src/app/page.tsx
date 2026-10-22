import Link from "next/link";
import { getCharacters, getEpisodes, getLocations } from "@/services";
import CharacterGrid from "@/components/characters/CharacterGrid";

const SECTIONS = [
  { href: "/characters", label: "Personajes", icon: "👽", description: "Conoce a cada habitante del multiverso." },
  { href: "/episodes", label: "Episodios", icon: "📺", description: "Todas las temporadas, una por una." },
  { href: "/locations", label: "Locaciones", icon: "🪐", description: "Planetas, dimensiones y estaciones." },
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
    <div className="space-y-16">
      <section className="py-10 text-center sm:py-16">
        <span className="inline-block rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime-300">
          Wubba lubba dub dub
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gradient sm:text-6xl">
          Bienvenido al multiverso
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
          Explora personajes, episodios y locaciones de Rick and Morty, y guarda tus favoritos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/characters"
            className="rounded-md bg-lime-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-lime-300"
          >
            Explorar personajes
          </Link>
          <Link
            href="/favorites"
            className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:border-lime-400 hover:text-lime-300"
          >
            Mis favoritos ★
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {SECTIONS.map((section, index) => (
          <Link key={section.href} href={section.href} className="card block p-6">
            <span className="text-3xl">{section.icon}</span>
            <p className="mt-3 text-4xl font-bold text-lime-400">{counts[index]}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{section.label}</h2>
            <p className="mt-1 text-sm text-slate-400">{section.description}</p>
          </Link>
        ))}
      </section>

      {characters && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Personajes destacados</h2>
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