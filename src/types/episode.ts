export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Ej: "S01E01"
  characters: string[];
  url: string;
  created: string;
}