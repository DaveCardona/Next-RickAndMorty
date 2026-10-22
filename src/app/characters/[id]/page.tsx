import FavoriteButton from "@/components/favorites/FavoriteButton";
import InfoItem from "@/components/ui/InfoItem";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/services";
import { extractId } from "@/lib/utils";

interface CharacterPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
    const { id } = await params;
    const character = await getCharacterById(Number(id));
    return { title: character?.name ?? "Personaje no encontrado" };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    const { id } = await params;
    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId < 1) notFound();

    const character = await getCharacterById(numericId);
    if (!character) notFound();

    const originId = extractId(character.origin.url);
    const locationId = extractId(character.location.url);

    return (
        <article>
            <Link href="/characters" className="text-sm text-lime-400 hover:underline">
                ← Volver a personajes
            </Link>

            <div className="mt-4 grid gap-6 md:grid-cols-[300px_1fr]">
                <Image
                    src={character.image}
                    alt={character.name}
                    width={300}
                    height={300}
                    priority
                    className="w-full rounded-lg border border-slate-800"
                />

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-lime-400">{character.name}</h1>
                        <FavoriteButton
                            character={{
                                id: character.id,
                                name: character.name,
                                image: character.image,
                                status: character.status,
                                species: character.species,
                            }}
                        />
                    </div>

                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <InfoItem label="Estado" value={character.status} />
                        <InfoItem label="Especie" value={character.species} />
                        <InfoItem label="Género" value={character.gender} />
                        <InfoItem label="Tipo" value={character.type || "—"} />
                        <InfoItem
                            label="Origen"
                            value={character.origin.name}
                            href={originId ? `/locations/${originId}` : undefined}
                        />
                        <InfoItem
                            label="Última ubicación"
                            value={character.location.name}
                            href={locationId ? `/locations/${locationId}` : undefined}
                        />
                    </dl>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold">
                            Episodios ({character.episode.length})
                        </h2>
                        <ul className="flex flex-wrap gap-2">
                            {character.episode.map((url) => {
                                const episodeId = extractId(url);
                                return (
                                    <li key={url}>
                                        <Link
                                            href={`/episodes/${episodeId}`}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:border-lime-400"
                                        >
                                            #{episodeId}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
            </div>
        </article>
    );
}

