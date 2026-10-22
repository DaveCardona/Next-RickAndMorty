import type { Metadata } from "next";
import { getLocations } from "@/services";
import LocationCard from "@/components/locations/LocationCard";
import LocationFilters from "@/components/locations/LocationFilters";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = { title: "Locaciones" };

interface LocationsPageProps {
  searchParams: Promise<{ page?: string; name?: string; type?: string; dimension?: string }>;
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const data = await getLocations({
    page,
    name: params.name,
    type: params.type,
    dimension: params.dimension,
  });

  const { page: _page, ...filters } = params;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-lime-400">Locaciones</h1>

      <LocationFilters defaults={filters} />

      {!data ? (
        <p className="py-12 text-center text-slate-400">
          No se encontraron locaciones con esos filtros.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-400">{data.info.count} resultados</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.info.pages}
            basePath="/locations"
            params={filters}
          />
        </>
      )}
    </section>
  );
}