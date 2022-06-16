"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// import jwt,{JwtPayload} from 'jsonwebtoken'\
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authToken = req.headers['authToken'];
    if (!authToken) {
        return res.json({ error: 'Not authorized to access this route.... no token found' });
    }
    try {
        let decodeToken;
        // decodeToken = <JwtPayload>jwt.verify(authToken, process.env.SECRET_KEY as string)
        // req.body.users = decodeToken
    }
    catch (error) {
        return res.json({ error: 'Invalid token was provided' });
    }
    next();
};
exports.verifyToken = verifyToken;
