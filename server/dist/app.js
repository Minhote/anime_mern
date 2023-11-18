"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anime_1 = require("./router/anime");
const cors_1 = require("./middleware/cors");
const user_1 = require("./router/user");
const dotenv_1 = __importDefault(require("dotenv"));
const character_1 = require("./router/character");
dotenv_1.default.config();
const PORT = process.env.PORT ?? 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.middlewareCORS)());
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.status(204).end();
});
app.use(express_1.default.json());
app.use("/animes", anime_1.ANIMEROUTER);
app.use("/characters", character_1.CHARACTERSROUTER);
app.use("/user", user_1.USERROUTER);
app.listen(PORT, () => {
    console.log(`Server listen on Port ${PORT}`);
});
