import express, { Request, Response } from "express";
import { ANIMEROUTER } from "./router/anime";
import { middlewareCORS } from "./middleware/cors";
import { USERROUTER } from "./router/user";
import dotenv from "dotenv";
import { CHARACTERSROUTER } from "./router/character";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(middlewareCORS());

app.options("*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.status(204).end();
});

app.use(express.json());

app.use("/animes", ANIMEROUTER);
app.use("/characters", CHARACTERSROUTER);
app.use("/user", USERROUTER);

app.listen(PORT, () => {
  console.log(`Server listen on Port ${PORT}`);
});
