"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTERROUTER = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.REGISTERROUTER = (0, express_1.Router)();
exports.REGISTERROUTER.get("/", controller_1.RegisterController.prueba);
exports.REGISTERROUTER.post("/", controller_1.RegisterController.registerUser);
