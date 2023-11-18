import mongoose from "mongoose";

interface IImagesUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface IGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface IAnime {
  _id: string;
  usersId: Array<string>;
  favorite: boolean;
  mal_id: number;
  images: {
    jpg: IImagesUrls;
    webp: IImagesUrls;
  };
  title: string;
  episodes: number;
  genres: IGenre[];
}

const animeSchema = new mongoose.Schema<IAnime>({
  _id: { type: String, required: true },
  favorite: { type: Boolean, required: true },
  usersId: { type: [String], required: true },
  mal_id: { type: Number, required: true },
  images: {
    jpg: {
      image_url: { type: String, required: true },
      small_image_url: { type: String, required: true },
      large_image_url: { type: String, required: true },
    },
    webp: {
      image_url: { type: String, required: true },
      small_image_url: { type: String, required: true },
      large_image_url: { type: String, required: true },
    },
  },
  title: { type: String, required: true },
  episodes: { type: Number, required: true },
  genres: {
    type: [
      {
        mal_id: { type: Number, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
});

export const AnimeMongooseModel = mongoose.model(
  "Animes",
  animeSchema,
  "animes"
);
