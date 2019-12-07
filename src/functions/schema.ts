export type Event = {
  categories: string[];
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
  categories: string[];
  city?: string;
  country?: string;
  dateTimestamp?: any;
  dateAddedTimestamp?: any;
  description: string;
  durationMinutes?: number;
  endDate: string;
  eventId?: string;
  eventTitle?: string;
  isDistinctive?: boolean;
  issues?: string[];
  logo?: string;
  id?: string;
  startDate: string;
  state?: string;
  status?: "draft" | "published-notalks" | "published";
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

export type TalkBasic = {
  categories: string[];
  coverImage?: string;
  curationDescription: string;
  editionId: string;
  editionTitle: string;
  eventId: string;
  eventTitle: string;
  id: string;
  isCurated?: boolean;
  slug: string;
  tags: string[];
  title: string;
  youtubeId: string;
};

export type TalkPreview = {
  _highlightResult?: any;
  categories: string[];
  coverImage?: string;
  curationDescription?: string;
  date: string;
  description?: string;
  dislikes?: number;
  editionId?: string;
  editionTitle?: string;
  end?: number;
  eventId?: string;
  eventTitle?: string;
  id: string;
  isCurated?: boolean;
  likes?: number;
  logo?: string;
  order?: number;
  slug?: string;
  _snippetResult?: any;
  speaker: string;
  start?: number;
  tags?: string[];
  times?: Times;
  title: string;
  track?: string;
  type: string;
  youtubeId: string;
};

export type Talk = {
  categories: string[];
  coverImage?: string;
  curationDescription?: string;
  date: string;
  dateTimestamp?: any;
  dateAddedTimestamp?: any;
  description: string;
  dislikes?: number;
  dislikesUIDs?: string[];
  editionId: string;
  editionTitle: string;
  end?: number;
  eventId: string;
  eventTitle: string;
  hasLikes?: boolean;
  id: string;
  isCurated?: boolean;
  likes?: number;
  likesUIDs?: string[];
  logo: string;
  objectID?: string;
  order: number;
  score?: number;
  slug: string;
  speaker: string;
  start?: number;
  tags: string[];
  times: Times;
  title: string;
  track?: string;
  type: string;
  youtubeId: string;
};

export type Category = {
  id: string;
  colorBackground: string;
  colorText: string;
  contextTitle: string;
  shortTitle: string;
  slug: string;
  title: string;
};

export type Times = {
  h?: number;
  m: number;
  s: number;
  totalMins?: number;
};

export type User = {
  email: string;
  savedTalks?: TalkPreview[];
  likedTalks?: string[];
  dislikedTalks?: string[];
  role?: string;
};

export enum TALK_TYPE {
  Keynote = "1",
  Talk = "2",
  LightningTalk = "3",
  Panel = "4",
  QA = "5",
  Sponsor = "6",
  Workshop = "7",
  Interview = "8",
  Highlights = "9"
}
