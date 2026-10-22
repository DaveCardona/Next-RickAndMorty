import type { Metadata } from "next";
import { getEpisodes } from "@/services";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import EpisodeFilters from "@/components/episodes/EpisodeFilters";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = { title: "Episodios" };

interface EpisodesPageProps {
  searchParams: Promise<{ page?: string; name?: string; episode?: string }>;
}

export default async function EpisodesPage({ searchParams }: EpisodesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const data = await getEpisodes({ page, name: params.name, episode: params.episode });

  const { page: _page, ...filters } = params;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-lime-400">Episodios</h1>

      <EpisodeFilters defaults={filters} />

      {!data ? (
        <p className="py-12 text-center text-slate-400">
          No se encontraron episodios con esos filtros.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-400">{data.info.count} resultados</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.info.pages}
            basePath="/episodes"
            params={filters}
          />
        </>
      )}
    </section>
  );
}