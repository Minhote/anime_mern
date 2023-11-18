"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeController = void 0;
const anime_1 = require("../model/anime");
class AnimeController {
    static async getFavoritesById(req, res) {
        if (req.query.id) {
            const id = req.query.id;
            const result = await anime_1.AnimeModel.getFavoritesById(id);
            if (result && result.length > 0) {
                return res
                    .status(200)
                    .json({ message: "Enviando lista de ánimes", result });
            }
            else {
                return res
                    .status(200)
                    .json({ message: "No tiene animes agregados", result: null });
            }
        }
        res
            .status(400)
            .json({ message: "Debes proveer un id válido como query params" });
    }
    static async postFavoriteById(req, res) {
        const result = await anime_1.AnimeModel.postFavoriteById(req.body);
        if (typeof result === "string") {
            return res.status(200).json({ message: result });
        }
        else {
            return res.status(200).json({
                message: "Anime añadido con éxito a la base de datos",
                result,
            });
        }
    }
    static async deleteFavoriteById(req, res) {
        const result = await anime_1.AnimeModel.deleteFavoriteById(req.query.mal_id, req.query.userid);
        if (result) {
            return res.status(200).json({
                message: "Anime eliminado con éxito de la base de datos",
                result,
            });
        }
        else {
            return res.status(400).json({ message: "Error al eliminar anime" });
        }
    }
    static async getToWatchById(req, res) {
        if (req.query.id) {
            const id = req.query.id;
            const result = await anime_1.AnimeModel.getToWatchById(id);
            if (result) {
                return res.status(200).json({ message: "Petición Exitosa ", result });
            }
            else {
                return res.status(200).json({
                    message: "No tiene animes pendientes por ver",
                    result,
                });
            }
        }
        else {
            return res
                .status(400)
                .json({ message: "Debes proveer un id válido como query params" });
        }
    }
    static async postToWatchById(req, res) {
        if (req.body) {
            const result = await anime_1.AnimeModel.postToWatchById(req.body);
            if (typeof result === "string") {
                return res.status(200).json({
                    message: result,
                });
            }
            else if (result) {
                return res.status(200).json({
                    message: "Anime por ver agregado con éxito a la base de datos",
                    result,
                });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Error al agregar anime por ver" });
            }
        }
        else {
            res.status(400).json({ message: "El body de la petición no es válido" });
        }
    }
    static async deleteToWatchById(req, res) {
        if (req.query) {
            const result = await anime_1.AnimeModel.deleteToWatchById(req.query.id, req.query.userId);
            if (result) {
                return res.status(200).json({
                    message: "Anime eliminado con éxito de la base de datos",
                    result,
                });
            }
            else {
                return res.status(400).json({ message: "Error al eliminar anime" });
            }
        }
    }
}
exports.AnimeController = AnimeController;
