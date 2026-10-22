import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params: Record<string, string | undefined>; // filtros actuales
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  params,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const query = new URLSearchParams();
    Object.entries({ ...params, page: String(page) }).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    return `${basePath}?${query.toString()}`;
  };

  const linkClass =
    "rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-lime-400";
  const disabledClass =
    "rounded-md border border-slate-800 px-4 py-2 text-sm text-slate-600";

  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className={linkClass}>
          ← Anterior
        </Link>
      ) : (
        <span className={disabledClass}>← Anterior</span>
      )}

      <span className="text-sm text-slate-300">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className={linkClass}>
          Siguiente →
        </Link>
      ) : (
        <span className={disabledClass}>Siguiente →</span>
      )}
    </nav>
  );
}