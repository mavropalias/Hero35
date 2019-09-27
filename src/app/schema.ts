export type Event = {
  categories: Category[];
  description: string;
  editions?: EventEdition[];
  id?: string;
  logo?: string;
  tags?: Tag[];
  topTags?: string[];
  title: string;
  website: string;
};

export type EventEdition = {
  categories: Category[];
  city?: string;
  country?: string;
  description: string;
  durationMinutes?: number;
  endDate: string;
  eventId?: string;
  eventTitle?: string;
  logo?: string;
  id?: string;
  startDate: string;
  state?: string;
  tags?: Tag[];
  topTags?: string[];
  talks?: TalkPreview[];
  ticketsUrl?: string;
  title: string;
  tracks: string[];
  website?: string;
};

export type Tag = {
  label: string;
  count: number;
};

export type TalkPreview = {
  _highlightResult?: any;
  curationDescription?: string;
  categories: Category[];
  date: string;
  description?: string;
  editionId?: string;
  eventId?: string;
  id: string;
  isCurated?: boolean;
  logo?: string;
  order?: number;
  slug?: string;
  _snippetResult?: any;
  speaker: string;
  tags?: string[];
  times?: Times;
  title: string;
  track?: string;
  type: string;
};

export type Talk = {
  categories: Category[];
  curationDescription?: string;
  date: string;
  description: string;
  editionId: string;
  editionTitle: string;
  eventId: string;
  eventTitle: string;
  id: string;
  isCurated?: boolean;
  logo: string;
  order: number;
  slug: string;
  speaker: string;
  tags: string[];
  times: Times;
  title: string;
  track?: string;
  type: string;
};

export type TalkType = {
  id: string;
  title: string;
  titlePlural: string;
};

export type Category = {
  id?: string;
  title: string;
};

export type Times = {
  h?: number;
  m: number;
  s: number;
  totalMins?: number;
};

export type YoutubeVideo = {
  description: string;
  tags?: string[];
  times?: Times;
  title: string;
  id: string;
  order: number;
};

export type EventStep = {
  caption: string;
  id: number;
  isActive: boolean;
  name: string;
  optional: boolean;
};

export type CachedResponse = {
  date: string;
  data: any;
};

export type ApiResponse = {
  items: any[];
  nextPageToken?: string;
};
