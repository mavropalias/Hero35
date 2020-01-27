import CATEGORIES from "./constants/categories";

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
  isJustAdded?: boolean;
  isRecent?: boolean;
  isUpcoming?: boolean;
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
  curationDescription?: string;
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
  editionId: string;
  editionTitle: string;
  end?: number;
  eventId: string;
  eventTitle: string;
  id: string;
  isCurated?: boolean;
  likes?: number;
  logo?: string;
  order?: number;
  slug: string;
  _snippetResult?: any;
  speaker: string;
  start?: number;
  tags: string[];
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
  id: string;
  isCurated?: boolean;
  likes?: number;
  likesUIDs?: string[];
  logo: string;
  order: number;
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

export type TalkType = {
  id: string;
  title: string;
  titlePlural: string;
};

export type TalkGroupContents = {
  title: string;
  talks: TalkBasic[] | TalkPreview[];
  slug?: string;
};

export type Category = {
  id: string;
  colorBackground: string;
  colorText: string;
  contextTitle: string;
  countries: string[];
  isCurated: boolean;
  shortTitle: string;
  slug: string;
  title: string;
};

export type Stack = {
  categories?: string[];
  color: string;
  featured?: boolean;
  isCategory?: boolean;
  isPrime?: boolean;
  label: string;
  order?: number;
  slug: string;
};

export type Times = {
  h?: number;
  m: number;
  s: number;
  totalMins?: number;
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

export type UserContextProps = {
  name?: string;
  email?: string;
  picture?: string;
  signedIn?: boolean;
  savedTalks?: TalkPreview[];
  likedTalks?: string[];
  dislikedTalks?: string[];
};

export type User = {
  email: string;
  savedTalks?: TalkPreview[];
  likedTalks?: string[];
  dislikedTalks?: string[];
  role?: string;
};

export type UserReducerAction = {
  type: "LOGIN" | "LOGOUT" | "HYDRATE_FROM_DB";
  payload?: UserContextProps;
};

export type HubContent = {
  coverTalks?: TalkBasic[];
  talkGroups: TalkGroupContents[];
  editions?: EventEdition[];
};
