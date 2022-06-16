"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const productRouter = express_1.default.Router();
productRouter.post('/newproduct', productController_1.newProduct);
productRouter.get('/', productController_1.getAllProducts);
productRouter.get('/:product_category', productController_1.getCategoryProducts);
productRouter.get('/:product_id', productController_1.getProduct);
productRouter.get('/:product_id', productController_1.deleteProduct);
productRouter.get('/:product_id', productController_1.updateProduct);
exports.default = productRouter;
