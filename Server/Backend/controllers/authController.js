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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.getUserById = exports.getUserByUserName = exports.getAllUsers = exports.signUp = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const signinValidator_1 = require("../helper/signinValidator");
const signupValidator_1 = require("../helper/signupValidator");
dotenv_1.default.config();
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = (0, uuid_1.v1)();
        const { full_name, customer_password, email } = req.body;
        const { error } = signupValidator_1.signUpSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const hashPwd = yield bcrypt_1.default.hash(customer_password, 15);
        const user = yield dbPool.request()
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .input('full_name', mssql_1.default.VarChar, full_name)
            .input('customer_password', mssql_1.default.VarChar, hashPwd)
            .input('email', mssql_1.default.VarChar, email)
            .execute('createUser');
        const token = jsonwebtoken_1.default.sign(customer_id, process.env.SECRET_KEY);
        res.status(200)
            .json({ message: 'New user created successfully', token });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.signUp = signUp;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const users = yield dbPool.request()
            .execute('getAllUsers');
        res.status(200)
            .json(users.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const user = yield dbPool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getUserByUserName');
        if (!user.recordset[0]) {
            return res.json({ message: `User with email:${email} does not exist` });
        }
        res.status(200)
            .json(user.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUserByUserName = getUserByUserName;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = req.params.customer_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const user = yield dbPool.request()
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .execute('getUserById');
        if (!user.recordset[0]) {
            return res.json({ message: `User with id::${customer_id} does not exist` });
        }
        res.status(200)
            .json(user.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { email, customer_password } = req.body;
        const { error } = signinValidator_1.signInSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const user = yield dbPool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getUserByUserName');
        if (!user.recordset[0]) {
            return res.json({ message: `user with email :: ${email} does not exist` });
        }
        const validatePwd = yield bcrypt_1.default.compare(customer_password, user.recordset[0].customer_password);
        if (!validatePwd) {
            return res.json({ message: 'Invalid credentials, try again' });
        }
        const data = user.recordset.map(record => {
            const { customer_password } = record, rest = __rest(record, ["customer_password"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(email, process.env.SECRET_KEY);
        res.status(200).json({ message: 'Logged in successfully', data, token });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.logIn = logIn;
