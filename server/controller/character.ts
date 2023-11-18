import { Request, Response } from "express";
import { CharacterModel } from "../model/character";

export class CharacterController {
  static async getCharacters(req: Request, res: Response) {
    if (req.query) {
      const result = await CharacterModel.getCharacters(req.query.id as string);
      if (result && result.length > 0) {
        return res
          .status(200)
          .json({ message: "Retorno de personajes favoritos", result });
      } else if (result && result.length === 0) {
        return res.status(200).json({
          message: "No tienes ningun personaje favorito agregado",
          result: null,
        });
      } else {
        return res.status(400).json({ message: "Error al hacer la petición" });
      }
    }
  }

  static async postCharacterById(req: Request, res: Response) {
    if (req.body) {
      const result = await CharacterModel.postCharacterById(req.body);
      if (typeof result === "string") {
        return res.status(200).json({ message: result });
      } else if (result) {
        return res
          .status(200)
          .json({ message: "Personaje agregado con éxito", result });
      } else {
        return res.status(400).json({ message: "Error al ingresar personaje" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "El body de la petición no es el válido" });
    }
  }

  static async deleteCharacterById(req: Request, res: Response) {
    if (req.query) {
      const result = await CharacterModel.deleteCharacterById(
        req.query.mal_id as string,
        req.query.userId as string
      );
      if (result) {
        return res.status(200).json({
          message: "Personaje eliminado de base de datos exitosamente",
        });
      }
    }
  }
}
