import { Request, Response } from "express";
import { AnimeModel } from "../model/anime";

export class AnimeController {
  static async getFavoritesById(req: Request, res: Response) {
    if (req.query.id) {
      const id = req.query.id as string;
      const result = await AnimeModel.getFavoritesById(id);
      if (result && result.length > 0) {
        return res
          .status(200)
          .json({ message: "Enviando lista de ánimes", result });
      } else {
        return res
          .status(200)
          .json({ message: "No tiene animes agregados", result: null });
      }
    }
    res
      .status(400)
      .json({ message: "Debes proveer un id válido como query params" });
  }

  static async postFavoriteById(req: Request, res: Response) {
    const result = await AnimeModel.postFavoriteById(req.body);
    if (typeof result === "string") {
      return res.status(200).json({ message: result });
    } else {
      return res.status(200).json({
        message: "Anime añadido con éxito a la base de datos",
        result,
      });
    }
  }

  static async deleteFavoriteById(req: Request, res: Response) {
    const result = await AnimeModel.deleteFavoriteById(
      req.query.mal_id as string,
      req.query.userid as string
    );
    if (result) {
      return res.status(200).json({
        message: "Anime eliminado con éxito de la base de datos",
        result,
      });
    } else {
      return res.status(400).json({ message: "Error al eliminar anime" });
    }
  }

  static async getToWatchById(req: Request, res: Response) {
    if (req.query.id) {
      const id = req.query.id as string;
      const result = await AnimeModel.getToWatchById(id);
      if (result) {
        return res.status(200).json({ message: "Petición Exitosa ", result });
      } else {
        return res.status(200).json({
          message: "No tiene animes pendientes por ver",
          result,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Debes proveer un id válido como query params" });
    }
  }

  static async postToWatchById(req: Request, res: Response) {
    if (req.body) {
      const result = await AnimeModel.postToWatchById(req.body);
      if (typeof result === "string") {
        return res.status(200).json({
          message: result,
        });
      } else if (result) {
        return res.status(200).json({
          message: "Anime por ver agregado con éxito a la base de datos",
          result,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Error al agregar anime por ver" });
      }
    } else {
      res.status(400).json({ message: "El body de la petición no es válido" });
    }
  }

  static async deleteToWatchById(req: Request, res: Response) {
    if (req.query) {
      const result = await AnimeModel.deleteToWatchById(
        req.query.id as string,
        req.query.userId as string
      );
      if (result) {
        return res.status(200).json({
          message: "Anime eliminado con éxito de la base de datos",
          result,
        });
      } else {
        return res.status(400).json({ message: "Error al eliminar anime" });
      }
    }
  }
}
