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
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const mailer_1 = __importDefault(require("../helper/mailer"));
dotenv_1.default.config();
const emailService = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mssql_1.default.connect(config_1.default);
    console.log("db connected at mail service");
    const users = (yield db.request()
        .execute('getUnemailedUsers')).recordset;
    console.log(users);
    const orders = (yield db.request()
        .execute('allOrders')).recordset;
    for (let user of users) {
        console.log("User emails");
        ejs_1.default.renderFile(`./template/registration.ejs`, { name: user.full_name }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
            }
            const mailOption = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "",
                text: "",
                html: data
            };
            try {
                yield (0, mailer_1.default)(mailOption);
                yield db.request()
                    .input('customer_id', mssql_1.default.VarChar, user.customer_id)
                    .execute('userMailed');
                console.log("User mail sent");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = emailService;
