// src/models/character.ts

interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  isCivilWarCharacter: boolean; // Novo campo para indicar se o personagem pertence à saga "Civil War"
  comics: ComicList;
  stories: StoryList;
  events: EventList;
  series: SeriesList;
}


interface Url {
  type: string;
  url: string;
}

interface Image {
  path: string;
  extension: string;
}

interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicSummary[];
}

interface ComicSummary {
  resourceURI: string;
  name: string;
}

interface StoryList {
  available: number;
  returned: number;
  collectionURI: string;
  items: StorySummary[];
}

interface StorySummary {
  resourceURI: string;
  name: string;
}

interface EventList {
  available: number;
  returned: number;
  collectionURI: string;
  items: EventSummary[];
}

interface EventSummary {
  name: string;
  // Campos específicos para a saga "Civil War"
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
}

interface SeriesList {
  available: number;
  returned: number;
  collectionURI: string;
  items: SeriesSummary[];
}

interface SeriesSummary {
  resourceURI: string;
  name: string;
}

export { Character };
