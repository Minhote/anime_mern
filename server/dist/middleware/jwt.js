"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareJWT = void 0;
const middlewareJWT = (req, res, next) => {
    console.log("Entre en el middleware");
    console.log(req.headers.authorization);
    next();
};
exports.middlewareJWT = middlewareJWT;
