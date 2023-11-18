import { Router } from "express";
import { AnimeController } from "../controller";

export const ANIMEROUTER = Router();

ANIMEROUTER.get("/favorites", AnimeController.getFavoritesById);

ANIMEROUTER.post("/favorites", AnimeController.postFavoriteById);
ANIMEROUTER.delete("/favorites", AnimeController.deleteFavoriteById);

ANIMEROUTER.get("/to-watch", AnimeController.getToWatchById);

ANIMEROUTER.post("/to-watch", AnimeController.postToWatchById);
ANIMEROUTER.delete("/to-watch", AnimeController.deleteToWatchById);
