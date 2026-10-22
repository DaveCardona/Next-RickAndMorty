import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharactersByIds, getLocationById } from "@/services";
import { extractId } from "@/lib/utils";
import CharacterGrid from "@/components/characters/CharacterGrid";
import InfoItem from "@/components/ui/InfoItem";

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { id } = await params;
  const location = await getLocationById(Number(id));
  return { title: location?.name ?? "Locación no encontrada" };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  const location = await getLocationById(numericId);
  if (!location) notFound();

  const residentIds = location.residents
    .map(extractId)
    .filter((residentId): residentId is number => residentId !== null);

  const residents = await getCharactersByIds(residentIds);

  return (
    <article>
      <Link href="/locations" className="text-sm text-lime-400 hover:underline">
        ← Volver a locaciones
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-lime-400">{location.name}</h1>

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoItem label="Tipo" value={location.type} />
        <InfoItem label="Dimensión" value={location.dimension} />
        <InfoItem label="Residentes" value={String(residents.length)} />
      </dl>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Residentes</h2>
      {residents.length === 0 ? (
        <p className="text-slate-400">Esta locación no tiene residentes conocidos.</p>
      ) : (
        <CharacterGrid characters={residents} />
      )}
    </article>
  );
}