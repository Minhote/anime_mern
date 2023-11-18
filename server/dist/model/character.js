"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        await client.connect();
        const database = client.db("MERN-FT");
        return database;
    }
    catch (error) {
        console.log("Error connecting to database");
        console.log(error);
        await client.close();
    }
}
class CharacterModel {
    static async getCharacters(id) {
        const db = await run();
        const collection = db?.collection("characters");
        const charactersFavorites = await collection
            ?.aggregate([{ $match: { usersId: { $elemMatch: { id } } } }])
            .toArray();
        return charactersFavorites;
    }
    static async postCharacterById(body) {
        const db = await run();
        const collection = db?.collection("characters");
        const { obj: { mal_id }, obj, userId, } = body;
        //Primero revisar si el personaje ya está agregado
        const characterIsInDB = await collection?.findOne({ mal_id });
        if (characterIsInDB === null) {
            // Si el personaje no está agregado guardarlo con normalidad
            const docAdded = await collection?.insertOne(obj);
            if (docAdded?.acknowledged) {
                const docAddedReturn = await collection?.findOne({
                    _id: docAdded?.insertedId,
                });
                return docAddedReturn;
            }
            else {
                return docAdded?.acknowledged;
            }
        }
        else {
            // En tal caso que exista revisar si ya esta con nuestro usuario o no
            const usersIdValue = await collection
                ?.findOne({ mal_id })
                .then((res) => res?.usersId);
            // Comprobar si ya existe registrado con este usuario
            const isAddedWithThisUser = usersIdValue.some((el) => el.id === userId);
            if (isAddedWithThisUser) {
                return "Personaje ya agregado en la base de datos";
            }
            else {
                // Si ya exite en otro usuario modificar el objeto
                const newUserIdValue = [...usersIdValue, { id: userId }];
                const docUpdated = await collection?.updateOne({ mal_id }, { $set: { usersId: newUserIdValue } });
                if (docUpdated?.acknowledged) {
                    const docToReturn = await collection?.findOne({ mal_id });
                    return docToReturn;
                }
            }
        }
    }
    static async deleteCharacterById(mal_id, userId) {
        const db = await run();
        const collection = db?.collection("characters");
        const usersIdValue = await collection
            ?.findOne({ mal_id: Number(mal_id) })
            .then((res) => res?.usersId);
        const newUserIdValue = usersIdValue.filter((el) => el.id !== userId);
        if (newUserIdValue.length === 0) {
            const docDeleted = await collection?.deleteOne({
                mal_id: Number(mal_id),
            });
            // Debo retornar el objeto que borré para poder actualizar el estado global en el frontend ( o quiza no si mejoro la lógica del estado global de characters)
            return docDeleted?.acknowledged;
        }
        else {
            const docUpdated = await collection?.updateOne({ mal_id: Number(mal_id) }, { $set: { usersId: newUserIdValue } });
            return docUpdated?.acknowledged;
        }
    }
}
exports.CharacterModel = CharacterModel;
