import Link from "next/link";
import type { Episode } from "@/types";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900 transition hover:border-lime-400">
      <Link href={`/episodes/${episode.id}`} className="block space-y-2 p-4">
        <span className="inline-block rounded bg-lime-400 px-2 py-0.5 text-xs font-bold text-slate-900">
          {episode.episode}
        </span>
        <h2 className="font-semibold text-white">{episode.name}</h2>
        <p className="text-sm text-slate-400">{episode.air_date}</p>
      </Link>
    </article>
  );
}