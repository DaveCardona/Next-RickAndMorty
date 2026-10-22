import type { Metadata } from "next";
import { getCharacters } from "@/services";
import type { CharacterGender, CharacterStatus } from "@/types";
import CharacterCard from "@/components/characters/CharacterCard";
import CharacterFilters from "@/components/characters/CharacterFilters";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = { title: "Personajes" };

interface CharactersPageProps {
  searchParams: Promise<{
    page?: string;
    name?: string;
    status?: string;
    gender?: string;
    species?: string;
  }>;
}

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const data = await getCharacters({
    page,
    name: params.name,
    status: params.status as CharacterStatus | undefined,
    gender: params.gender as CharacterGender | undefined,
    species: params.species,
  });

  // Filtros sin "page", para que Pagination los conserve
  const { page: _page, ...filters } = params;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-lime-400">Personajes</h1>

      <CharacterFilters defaults={filters} />

      {!data ? (
        <p className="py-12 text-center text-slate-400">
          No se encontraron personajes con esos filtros.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-400">{data.info.count} resultados</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.info.pages}
            basePath="/characters"
            params={filters}
          />
        </>
      )}
    </section>
  );
}