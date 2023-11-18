"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERROUTER = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.USERROUTER = (0, express_1.Router)();
exports.USERROUTER.post("/register", controller_1.UserController.register);
exports.USERROUTER.post("/login", controller_1.UserController.login);
