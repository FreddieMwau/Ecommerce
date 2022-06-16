"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authToken = req.headers['authToken'];
    if (!authToken) {
        return res.json({ error: 'Not authorized to access this route.... no token found' });
    }
    try {
        let decodeToken;
        decodeToken = jsonwebtoken_1.default.verify(authToken, process.env.SECRET_KEY);
        req.body.users = decodeToken;
    }
    catch (error) {
        return res.json({ error: 'Invalid token was provided' });
    }
    next();
};
exports.verifyToken = verifyToken;
