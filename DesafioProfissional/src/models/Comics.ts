// src/models/comics.ts

interface Comic {
  id: number;
  title: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  // Campos específicos para a saga "Civil War"
  events: EventList;
}

interface Url {
  type: string;
  url: string;
}

interface Image {
  path: string;
  extension: string;
}

interface EventList {
  available: number;
  returned: number;
  collectionURI: string;
  items: EventSummary[];
}

interface EventSummary {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
}

export { Comic };
