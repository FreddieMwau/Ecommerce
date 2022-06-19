"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const jwtVerify_1 = require("../middleware/jwtVerify");
const productRouter = express_1.default.Router();
productRouter.post('/newproduct', jwtVerify_1.verifyToken, productController_1.newProduct);
productRouter.get('/', productController_1.getAllProducts);
productRouter.get('/category/:product_category', jwtVerify_1.verifyToken, productController_1.getCategoryProducts);
productRouter.get('/:product_id', jwtVerify_1.verifyToken, productController_1.getProduct);
productRouter.delete('/:product_id', jwtVerify_1.verifyToken, productController_1.deleteProduct);
productRouter.patch('/:product_id', jwtVerify_1.verifyToken, productController_1.updateProduct);
exports.default = productRouter;
