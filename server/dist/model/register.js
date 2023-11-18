"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const node_crypto_1 = __importDefault(require("node:crypto"));
const uri = "mongodb+srv://erickicaza94:barcelo94@mernft.xhbdult.mongodb.net/?retryWrites=true&w=majority";
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
class RegisterModel {
    static async registerUser(body) {
        const db = await run();
        const users = db?.collection("users");
        const { name, email, password } = body;
        const resultFind = await users?.findOne({
            $or: [{ name: name }, { email: email }],
        });
        if (resultFind === null) {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const id = node_crypto_1.default.randomBytes(16).toString("hex");
            const newDocument = {
                _id: id,
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
}
exports.RegisterModel = RegisterModel;
