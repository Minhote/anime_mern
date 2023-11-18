import { Router } from "express";
import { CharacterController } from "../controller/character";

export const CHARACTERSROUTER = Router();

CHARACTERSROUTER.get("/", CharacterController.getCharacters);
CHARACTERSROUTER.post("/", CharacterController.postCharacterById);
CHARACTERSROUTER.delete("/", CharacterController.deleteCharacterById);
