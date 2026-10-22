import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharactersByIds, getEpisodeById } from "@/services";
import { extractId } from "@/lib/utils";
import CharacterGrid from "@/components/characters/CharacterGrid";
import InfoItem from "@/components/ui/InfoItem";

interface EpisodePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisodeById(Number(id));
  return { title: episode?.name ?? "Episodio no encontrado" };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  const episode = await getEpisodeById(numericId);
  if (!episode) notFound();

  const characterIds = episode.characters
    .map(extractId)
    .filter((characterId): characterId is number => characterId !== null);

  const characters = await getCharactersByIds(characterIds);

  return (
    <article>
      <Link href="/episodes" className="text-sm text-lime-400 hover:underline">
        ← Volver a episodios
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-lime-400">{episode.name}</h1>

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoItem label="Código" value={episode.episode} />
        <InfoItem label="Fecha de emisión" value={episode.air_date} />
        <InfoItem label="Personajes" value={String(characters.length)} />
      </dl>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Personajes en este episodio</h2>
      <CharacterGrid characters={characters} />
    </article>
  );
}