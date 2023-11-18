"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const model_1 = require("../model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static async register(req, res) {
        const result = await model_1.UserModel.register(req.body);
        if (result?.success) {
            const userForToken = {
                id: result.insertedDocument?._id,
                user: result.insertedDocument?.name,
            };
            const CLAVESECRETA = process.env.CLAVE_SECRETA;
            const token = jsonwebtoken_1.default.sign(userForToken, CLAVESECRETA);
            res.status(200).json({
                message: "Usuario agregado con éxito",
                user: result.insertedDocument,
                token,
            });
        }
        else if (!result?.success) {
            if (result?.repeatedPropertie === "name" ||
                result?.repeatedPropertie === "email") {
                res.status(409).json({
                    message: `No se puedo regitrar usuario, la propiedad ${result.repeatedPropertie} ya existe en nuestra base de datos`,
                });
            }
            else {
                res.status(409).json({
                    message: `No se puedo regitrar usuario, los valores de los campos name e email ya existen en nuestra base de datos`,
                });
            }
        }
    }
    static async login(req, res) {
        const result = await model_1.UserModel.login(req.body);
        if (result?.comparePasswords === true) {
            const userForToken = {
                id: result.nameIsInDB._id,
                user: result.nameIsInDB.name,
            };
            const CLAVESECRETA = process.env.CLAVE_SECRETA;
            const token = jsonwebtoken_1.default.sign(userForToken, CLAVESECRETA);
            res.status(200).json({
                message: "Usuario y Contraseña correctos",
                user: result.nameIsInDB,
                token,
            });
        }
        else if (result?.comparePasswords === false) {
            res.status(401).json({ message: "Contraseña Incorrecta" });
        }
        else {
            res
                .status(404)
                .json({ message: "Usuario no registrado en base de datos" });
        }
    }
}
exports.UserController = UserController;
