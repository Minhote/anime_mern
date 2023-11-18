export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LogInInputs = Omit<SignUpInputs, "email" | "passwordConfirm">;

export type AuthenticatedResponse = {
  message: string;
  token: string;
  user: User;
};

export type User = {
  email: string;
  name: string;
  password: string;
  _id: string;
};

export enum Datatypes {
  AnimeFavorites = "anime-fav",
  AnimeForWatch = "anime-for-watch",
  CharactersFavorites = "character-fav",
}

export type CharacterData = {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
};

export type AnimeData = {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
};

export type Aired = {
  from: string;
  to: string;
  prop: Prop;
};

export type Prop = {
  from: From;
  to: From;
  string: string;
};

export type From = {
  day: number;
  month: number;
  year: number;
};

export type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

export type Demographic = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type Title = {
  type: string;
  title: string;
};

export type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

export type AnimeFavoriteDB = Pick<
  AnimeData,
  "title" | "episodes" | "genres" | "images" | "mal_id"
>;

export type CharacterDataDB = Pick<
  CharacterData,
  "name" | "nicknames" | "about" | "mal_id" | "images"
>;
