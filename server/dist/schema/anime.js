"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeMongooseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const animeSchema = new mongoose_1.default.Schema({
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
exports.AnimeMongooseModel = mongoose_1.default.model("Animes", animeSchema, "animes");
