"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const character_1 = require("../model/character");
class CharacterController {
    static async getCharacters(req, res) {
        if (req.query) {
            const result = await character_1.CharacterModel.getCharacters(req.query.id);
            if (result && result.length > 0) {
                return res
                    .status(200)
                    .json({ message: "Retorno de personajes favoritos", result });
            }
            else if (result && result.length === 0) {
                return res.status(200).json({
                    message: "No tienes ningun personaje favorito agregado",
                    result: null,
                });
            }
            else {
                return res.status(400).json({ message: "Error al hacer la petición" });
            }
        }
    }
    static async postCharacterById(req, res) {
        if (req.body) {
            const result = await character_1.CharacterModel.postCharacterById(req.body);
            if (typeof result === "string") {
                return res.status(200).json({ message: result });
            }
            else if (result) {
                return res
                    .status(200)
                    .json({ message: "Personaje agregado con éxito", result });
            }
            else {
                return res.status(400).json({ message: "Error al ingresar personaje" });
            }
        }
        else {
            return res
                .status(400)
                .json({ message: "El body de la petición no es el válido" });
        }
    }
    static async deleteCharacterById(req, res) {
        if (req.query) {
            const result = await character_1.CharacterModel.deleteCharacterById(req.query.mal_id, req.query.userId);
            if (result) {
                return res.status(200).json({
                    message: "Personaje eliminado de base de datos exitosamente",
                });
            }
        }
    }
}
exports.CharacterController = CharacterController;
