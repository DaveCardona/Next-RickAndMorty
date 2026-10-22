import Image from "next/image";
import Link from "next/link";
import type { FavoriteCharacter } from "@/types";
import FavoriteButton from "@/components/favorites/FavoriteButton";

const STATUS_STYLES: Record<FavoriteCharacter["status"], string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-slate-500",
};

export default function CharacterCard({ character }: { character: FavoriteCharacter }) {
  const { id, name, image, status, species } = character;

  return (
    <article className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900 transition hover:border-lime-400">
      <Link href={`/characters/${id}`}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover"
        />
        <div className="space-y-1 p-3">
          <h2 className="truncate font-semibold text-white">{name}</h2>
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <span className={`h-2 w-2 rounded-full ${STATUS_STYLES[status]}`} />
            {status} · {species}
          </p>
        </div>
      </Link>

      <FavoriteButton
        character={{ id, name, image, status, species }}
        className="absolute right-2 top-2"
      />
    </article>
  );
}