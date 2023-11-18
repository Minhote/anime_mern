import { Request, Response } from "express";
import { UserModel } from "../model";
import jwt from "jsonwebtoken";

export class UserController {
  static async register(req: Request, res: Response) {
    const result = await UserModel.register(req.body);
    if (result?.success) {
      const userForToken = {
        id: result.insertedDocument?._id,
        user: result.insertedDocument?.name,
      };

      const CLAVESECRETA = process.env.CLAVE_SECRETA as string;

      const token = jwt.sign(userForToken, CLAVESECRETA);

      res.status(200).json({
        message: "Usuario agregado con éxito",
        user: result.insertedDocument,
        token,
      });
    } else if (!result?.success) {
      if (
        result?.repeatedPropertie === "name" ||
        result?.repeatedPropertie === "email"
      ) {
        res.status(409).json({
          message: `No se puedo regitrar usuario, la propiedad ${result.repeatedPropertie} ya existe en nuestra base de datos`,
        });
      } else {
        res.status(409).json({
          message: `No se puedo regitrar usuario, los valores de los campos name e email ya existen en nuestra base de datos`,
        });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const result = await UserModel.login(req.body);
    if (result?.comparePasswords === true) {
      const userForToken = {
        id: result.nameIsInDB._id,
        user: result.nameIsInDB.name,
      };

      const CLAVESECRETA = process.env.CLAVE_SECRETA as string;

      const token = jwt.sign(userForToken, CLAVESECRETA);
      res.status(200).json({
        message: "Usuario y Contraseña correctos",
        user: result.nameIsInDB,
        token,
      });
    } else if (result?.comparePasswords === false) {
      res.status(401).json({ message: "Contraseña Incorrecta" });
    } else {
      res
        .status(404)
        .json({ message: "Usuario no registrado en base de datos" });
    }
  }
}
