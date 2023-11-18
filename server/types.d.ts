export interface registerUser {
  name: string;
  email: string;
  password: string;
}

type usersIdObject = { id: string; favorite: string };

type characterIdObject = Pick<usersIdObject, "id">;

export interface AnimeDB {
  mal_id: number;
  title: string;
  usersId: usersIdObject[];
  images: { [key: string]: Image };
  genres: Genre[];
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface UserObject {
  userId: string;
}

export interface CharacterDB {
  about: string;
  images: { [key: string]: Image };
  mal_id: number;
  name: string;
  nicknames: Array<string>;
  usersId: usersIdObject;
}
