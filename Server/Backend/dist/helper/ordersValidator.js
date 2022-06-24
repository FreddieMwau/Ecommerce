"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ordersSchema = joi_1.default.object({
    product_id: joi_1.default.string().required(),
    customer_id: joi_1.default.string().required(),
    quantity_ordered: joi_1.default.number().required(),
    total_price: joi_1.default.number().required(),
});
