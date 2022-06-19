"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productsSchema = joi_1.default.object({
    product_name: joi_1.default.string().required(),
    product_image_url: joi_1.default.string().required(),
    product_description: joi_1.default.string().required(),
    product_price: joi_1.default.number().min(2).required(),
    product_in_stock: joi_1.default.number().min(2).required(),
    product_category: joi_1.default.string().required()
});
