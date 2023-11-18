"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHARACTERSROUTER = void 0;
const express_1 = require("express");
const character_1 = require("../controller/character");
exports.CHARACTERSROUTER = (0, express_1.Router)();
exports.CHARACTERSROUTER.get("/", character_1.CharacterController.getCharacters);
exports.CHARACTERSROUTER.post("/", character_1.CharacterController.postCharacterById);
exports.CHARACTERSROUTER.delete("/", character_1.CharacterController.deleteCharacterById);
