"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const orderRouter = express_1.default.Router();
orderRouter.post('/neworder', orderController_1.newOrders);
orderRouter.get('/', orderController_1.getAllOrders);
orderRouter.get('/:id', orderController_1.getOrder);
exports.default = orderRouter;
