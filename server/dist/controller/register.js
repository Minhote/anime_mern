"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const model_1 = require("../model");
class RegisterController {
    static async prueba(req, res) {
        res.status(200).json({ message: "Probando Register" });
    }
    static async registerUser(req, res) {
        const result = await model_1.RegisterModel.registerUser(req.body);
        if (result?.success) {
            res.status(200).json({
                message: "Usuario agregado con éxito",
                user: result.insertedDocument,
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
}
exports.RegisterController = RegisterController;
