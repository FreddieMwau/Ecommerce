"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
authRouter.post('/signup', authController_1.signUp);
authRouter.get('/', authController_1.getAllUsers);
authRouter.get('/:customer_id', authController_1.getUserById);
authRouter.get('/email/:email', authController_1.getUserByUserName);
authRouter.post('/signin', authController_1.logIn);
exports.default = authRouter;
