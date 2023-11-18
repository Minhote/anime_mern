"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
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
class UserModel {
    static async register(body) {
        const db = await run();
        const users = db?.collection("users");
        const { name, email, password } = body;
        const resultFind = await users?.findOne({
            $or: [{ name }, { email }],
        });
        if (resultFind === null) {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const newDocument = {
                _id: new mongodb_1.ObjectId(),
                name,
                email,
                password: hashedPassword,
            };
            const result = await users?.insertOne(newDocument);
            return { success: result?.acknowledged, insertedDocument: newDocument };
        }
        else if (resultFind) {
            const repeated = resultFind.name === name && resultFind.email != email
                ? "name"
                : resultFind.email === email && resultFind.name != name
                    ? "email"
                    : resultFind.name === name && resultFind.email === email
                        ? "both"
                        : "none";
            return { success: false, repeatedPropertie: repeated };
        }
    }
    static async login(body) {
        const { name, password } = body;
        const db = await run();
        const users = db?.collection("users");
        const nameIsInDB = await users?.findOne({ name: { $eq: name } });
        if (nameIsInDB) {
            const comparePasswords = await bcrypt_1.default.compare(password, nameIsInDB.password);
            return { comparePasswords, nameIsInDB };
        }
        return nameIsInDB;
    }
}
exports.UserModel = UserModel;
