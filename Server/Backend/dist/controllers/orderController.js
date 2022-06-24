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
exports.getOrderCount = exports.updateOrder = exports.deleteOrder = exports.getOrderByUserId = exports.getOrder = exports.getAllOrders = exports.newOrders = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const ordersValidator_1 = require("../helper/ordersValidator");
dotenv_1.default.config();
const newOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = (0, uuid_1.v1)();
        const { product_id, customer_id, quantity_ordered, total_price } = req.body;
        const { error } = ordersValidator_1.ordersSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const order = yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .input('quantity_ordered', mssql_1.default.Int, quantity_ordered)
            .input('total_price', mssql_1.default.Int, total_price)
            .execute('addOrder');
        res.status(200)
            .json({ message: 'Order added successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.newOrders = newOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const orders = yield dbPool.request()
            .execute('getAllOrders');
        res.status(200)
            .json(orders.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.order_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const order = yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .execute('getOrderById');
        if (!order.recordset[0]) {
            return res.json({ message: `Order with id:: ${order_id} does not exist` });
        }
        res.status(200)
            .json(order.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getOrder = getOrder;
const getOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer_id = req.params.customer_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const userOrder = yield dbPool.request()
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .execute('getOrderByUserId');
        if (!userOrder.recordset[0]) {
            return res.json({ message: `This customer id :: ${customer_id} does not have any orders` });
        }
        res.status(200)
            .json(userOrder.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getOrderByUserId = getOrderByUserId;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.order_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const order = yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .execute('getOrderById');
        if (!order) {
            return res.json({ message: `Order with id:: ${order_id} does not exist` });
        }
        yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .execute('deleteOrder');
        res.status(200)
            .json({ message: `Order with id:: ${order_id} has been deleted successfully` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteOrder = deleteOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.order_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { product_id, customer_id, quantity_ordered, total_price } = req.body;
        const { error } = ordersValidator_1.ordersSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const order = yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .execute('getOrderById');
        if (!order) {
            return res.json({ message: `Order with id:: ${order_id} does not exist` });
        }
        const updateOrder = yield dbPool.request()
            .input('order_id', mssql_1.default.VarChar, order_id)
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('customer_id', mssql_1.default.VarChar, customer_id)
            .input('quantity_ordered', mssql_1.default.Int, quantity_ordered)
            .input('total_price', mssql_1.default.Int, total_price)
            .execute('updateOrder');
        res.status(200)
            .json({ message: `Order :: ${order_id} has been updated successfully` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateOrder = updateOrder;
const getOrderCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const orderCount = yield dbPool.request()
            .execute('getOrderCount');
        res.status(200)
            .json(orderCount.recordset[0]);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getOrderCount = getOrderCount;
