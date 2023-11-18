import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { AnimeDB, UserObject, usersIdObject } from "../types";

dotenv.config();

const uri = process.env.MONGODB_URI as string;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("MERN-FT");
    return database;
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
    await client.close();
  }
}

type usersIdCamp = { id: string; favorite: string };

export class AnimeModel {
  static async getFavoritesById(id: string) {
    const db = await run();
    const collection = db?.collection("animes");

    const isAnimeInCollection = await collection
      ?.find({
        usersId: {
          $elemMatch: { id, favorite: "true" },
        },
      })
      .toArray();

    return isAnimeInCollection;
  }

  static async postFavoriteById(obj: AnimeDB) {
    const { mal_id } = obj;
    const db = await run();
    const collection = db?.collection("animes");

    /* Lógica para saber si este anime ya esta agregado con otro usuario */
    const oldUsersId: Array<usersIdCamp> = await collection
      ?.findOne({ mal_id })
      .then((res) => res?.usersId);

    // Si no está agregado agrega un nuevo documento
    if (oldUsersId === undefined) {
      const docAgregated = await collection?.insertOne(obj);
      return docAgregated;
    }

    // De lo contrario modifica el documento que corresponda a tal anime

    const isAlreadyAggregated = oldUsersId.some(
      (oldvalue) => oldvalue.id === obj.usersId[0].id
    );

    if (isAlreadyAggregated) {
      return "Anime ya registrado en base de datos";
    } else {
      const newUsersIdValue = [...oldUsersId, ...obj.usersId];
      const docUpdated = await collection?.updateOne(
        { mal_id },
        { $set: { usersId: newUsersIdValue } }
      );

      return docUpdated;
    }
  }

  static async deleteFavoriteById(mal_id: string, userid: string) {
    const db = await run();
    const collection = db?.collection("animes");

    const oldCamp = await collection
      ?.findOne({ mal_id: Number(mal_id) })
      .then((doc) => doc?.usersId);

    const newCamp = oldCamp.filter((el: any) => el.id !== userid);

    if (newCamp.length === 0) {
      const docDeleted = await collection?.deleteOne({
        mal_id: Number(mal_id),
      });
      return docDeleted;
    } else {
      const docUpdated = await collection?.updateOne(
        { mal_id: Number(mal_id) },
        { $set: { usersId: newCamp } }
      );
      return docUpdated;
    }
  }

  static async getToWatchById(userid: string) {
    const db = await run();
    const collection = db?.collection("animes");

    const filterAnimesToWatch = await collection
      ?.find({
        usersId: {
          $elemMatch: { id: userid, favorite: "false" },
        },
      })
      .toArray();

    if (filterAnimesToWatch && filterAnimesToWatch.length > 0) {
      return filterAnimesToWatch;
    } else if (filterAnimesToWatch && filterAnimesToWatch.length === 0) {
      return null;
    }
  }

  static async postToWatchById(body: { obj: AnimeDB; userObj: UserObject }) {
    const { obj, userObj } = body;
    const { mal_id } = obj;
    const db = await run();
    const collection = db?.collection("animes");

    // Averiguar si existe este anime por ver con otro usuario

    const isInDb = await collection
      ?.aggregate([
        { $match: { mal_id } },
        {
          $match: {
            usersId: { $elemMatch: { favorite: "false" } },
          },
        },
      ])
      .toArray();

    // Si ya está agregado modificamos el documento
    if (isInDb?.length !== 0) {
      // Averiguar si el documento ya contiene nuestro userId
      const doc = await collection
        ?.aggregate([
          { $match: { mal_id } },
          {
            $project: {
              usersId: 1,
            },
          },
        ])
        .toArray();
      // console.log(doc)
      if (doc && "usersId" in doc[0]) {
        const usersId: Array<usersIdObject> = doc[0].usersId;
        const isIdAdded = usersId.some((el) => el.id === userObj.userId);
        if (isIdAdded) {
          // Si ya esta nuestro id retornar string
          return "Anime por ver ya agregado a la base de datos";
        } else {
          // Si no actualizar el documento
          const docUpdated = await collection?.updateOne(
            { mal_id },
            {
              $addToSet: { usersId: { id: userObj.userId, favorite: "false" } },
            }
          );
          if (docUpdated?.acknowledged) {
            const doc = await collection?.findOne({ mal_id });
            return doc;
          }
        }
      }
    } else {
      // Si isINDb es un array vacio es porque no cumple con el match. Averiguar si existe el documento con otro user id o no
      const isDocAdded = await collection?.findOne({ mal_id });
      if (isDocAdded) {
        //Si existe modificamos el documento para agregar nuestro userId
        const docUpdated = await collection?.updateOne(
          { mal_id },
          { $addToSet: { usersId: { id: userObj.userId, favorite: "false" } } }
        );
        if (docUpdated?.acknowledged) {
          const doc = await collection?.findOne({ _id: isDocAdded._id });
          return doc;
        }
      } else {
        // Si no existe agregamos en base de datos
        const docAdded = await collection?.insertOne(obj);
        const doc = await collection?.findOne({ _id: docAdded?.insertedId });
        return doc;
      }
    }
  }

  static async deleteToWatchById(mal_id: string, userid: string) {
    const db = await run();
    const collection = db?.collection("animes");

    const doc = await collection
      ?.findOne({ mal_id: Number(mal_id) })
      .then((res) => res?.usersId);

    // Si el documento existe
    if (doc) {
      const newUsersId = doc.filter((el: any) => el.id !== userid);

      if (newUsersId.length > 0) {
        const docUpdated = await collection?.updateOne(
          { mal_id: Number(mal_id) },
          { $set: { usersId: newUsersId } }
        );

        return docUpdated;
      } else {
        const docEliminated = await collection?.deleteOne({
          mal_id: Number(mal_id),
        });

        return docEliminated;
      }
    }
  }
}
