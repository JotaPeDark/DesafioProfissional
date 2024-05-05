// src/models/creator.ts

interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  // Campos específicos para a saga "Civil War"
  events: EventList;
  // Propriedade para indicar se o criador está associado à saga "Civil War"
  isCivilWarCreator: boolean;
}

interface Url {
  type: string;
  url: string;
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

export { Creator };
