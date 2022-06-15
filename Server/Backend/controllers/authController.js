"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = (0, uuid_1.v1)();
        const { full_name, email, customer_password } = req.body;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const hashPwd = yield bcrypt_1.default.hash(customer_password, 15);
        yield dbPool.request()
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .input('full_name', mssql_1.default.VarChar, full_name)
            .input('email', mssql_1.default.VarChar, email)
            .input('customer_password', mssql_1.default.VarChar, hashPwd)
            .execute('createUser');
        res.status(200)
            .json({ message: 'New user created successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
