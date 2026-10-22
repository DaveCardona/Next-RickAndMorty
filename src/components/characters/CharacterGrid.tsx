import type { Character } from "@/types";
import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}