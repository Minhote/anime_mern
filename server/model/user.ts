import { registerUser } from "../types";
import bycrypt from "bcrypt";
import { MongoClient, ServerApiVersion, Document, ObjectId } from "mongodb";
import dotenv from "dotenv";

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

export class UserModel {
  static async register(body: registerUser) {
    const db = await run();
    const users = db?.collection("users");
    const { name, email, password } = body;
    const resultFind = await users?.findOne({
      $or: [{ name }, { email }],
    });
    if (resultFind === null) {
      const hashedPassword = await bycrypt.hash(password, 10);
      const newDocument: Document = {
        _id: new ObjectId(),
        name,
        email,
        password: hashedPassword,
      };
      const result = await users?.insertOne(newDocument);
      return { success: result?.acknowledged, insertedDocument: newDocument };
    } else if (resultFind) {
      const repeated =
        resultFind.name === name && resultFind.email != email
          ? "name"
          : resultFind.email === email && resultFind.name != name
          ? "email"
          : resultFind.name === name && resultFind.email === email
          ? "both"
          : "none";

      return { success: false, repeatedPropertie: repeated };
    }
  }

  static async login(body: Omit<registerUser, "email">) {
    const { name, password } = body;
    const db = await run();
    const users = db?.collection("users");

    const nameIsInDB = await users?.findOne({ name: { $eq: name } });
    if (nameIsInDB) {
      const comparePasswords = await bycrypt.compare(
        password,
        nameIsInDB.password
      );

      return { comparePasswords, nameIsInDB };
    }

    return nameIsInDB;
  }
}
