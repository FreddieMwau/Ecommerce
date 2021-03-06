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
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
function createTransport(config) {
    let transport = nodemailer_1.default.createTransport(config);
    return transport;
}
const configuration = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
};
const sendMail = (mailOption) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTransport(configuration);
    yield transporter.verify();
    yield transporter.sendMail(mailOption);
});
exports.default = sendMail;
