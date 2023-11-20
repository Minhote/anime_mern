"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareCORS = void 0;
const cors_1 = __importDefault(require("cors"));
const middlewareCORS = () => (0, cors_1.default)({
    origin: (origin, callback) => {
        const ALLOWED_ORIGINS = [
            "http://localhost:8080",
            "http://localhost:5500",
            "http://127.0.0.1:5500",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://ellocoqueama.com",
            "https://anime-mern-api.vercel.app",
            "https://anime-mern-client.vercel.app",
        ];
        if (!origin) {
            return callback(null, true);
        }
        else if (ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
});
exports.middlewareCORS = middlewareCORS;
