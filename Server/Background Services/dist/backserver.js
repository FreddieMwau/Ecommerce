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
const express_1 = __importDefault(require("express"));
const mssql_1 = __importDefault(require("mssql"));
const node_cron_1 = __importDefault(require("node-cron"));
const config_1 = __importDefault(require("./config/config"));
const mail_1 = __importDefault(require("./mailService/mail"));
const app = (0, express_1.default)();
app.listen(5000, () => {
    console.log("Background Services running on port ====> 5000");
});
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const y = yield mssql_1.default.connect(config_1.default);
        if (y.connected) {
            console.log("Db connected flawlessly");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
const mail = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('*/5 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mail_1.default)();
        console.log('Running after every 5 secs');
    }));
});
// mail()
dbConnect();
