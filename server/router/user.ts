import { Router } from "express";
import { UserController } from "../controller";

export const USERROUTER = Router();

USERROUTER.post("/register", UserController.register);
USERROUTER.post("/login", UserController.login);
