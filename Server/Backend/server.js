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
const config_1 = __importDefault(require("./config/config"));
const mssql_1 = __importDefault(require("mssql"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', authRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/orders', ordersRoutes_1.default);
app.listen(7000, () => {
    console.log("====> Server launched on port 7000");
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const z = yield mssql_1.default.connect(config_1.default);
        if (z.connected) {
            console.log("Db connected flawlessly");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
dbConnection();
