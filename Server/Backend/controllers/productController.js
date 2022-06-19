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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.getCategoryProducts = exports.getAllProducts = exports.newProduct = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const productValidator_1 = require("../helper/productValidator");
dotenv_1.default.config();
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = (0, uuid_1.v1)();
        // const { product_name, product_image_url, product_description, product_price, product_in_stock, product_category } = req.body as { product_name: string, product_image_url: string, product_description: string, product_price: number, product_in_stock: number, product_category: string, }
        const _a = req.body, { users } = _a, products = __rest(_a, ["users"]);
        const { error } = productValidator_1.productsSchema.validate(products);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const product = yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('product_name', mssql_1.default.VarChar, products.product_name)
            .input('product_image_url', mssql_1.default.VarChar, products.product_image_url)
            .input('product_description', mssql_1.default.VarChar, products.product_description)
            .input('product_price', mssql_1.default.Int, products.product_price)
            .input('product_in_stock', mssql_1.default.Int, products.product_in_stock)
            .input('product_category', mssql_1.default.VarChar, products.product_category)
            .execute('addProduct');
        res.status(200)
            .json({ message: 'Product added successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.newProduct = newProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const products = yield dbPool.request()
            .execute('getAllProducts');
        res.status(200)
            .json(products.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getCategoryProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_category = req.params.product_category;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const product = yield dbPool.request()
            .input('product_category', mssql_1.default.VarChar, product_category)
            .execute('getCategoryProducts');
        if (!product.recordset[0]) {
            return res.json({ message: `Product category:: ${product_category} does not exist` });
        }
        res.status(200)
            .json(product.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getCategoryProducts = getCategoryProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const product = yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .execute('getProductById');
        if (!product.recordset[0]) {
            return res.json({ message: `Product with id:: ${product_id} does not exist` });
        }
        res.status(200)
            .json(product.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const product = yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .execute('getProductById');
        if (!product.recordset[0]) {
            return res.json({ message: `Product with id:: ${product_id} does not exist` });
        }
        yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .execute('deleteProduct');
        res.status(200)
            .json({ message: `Product with id:: ${product_id} has been deleted successfully` });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        // const { product_name, product_image_url, product_description, product_price, product_in_stock, product_category } = req.body as { product_name: string, product_image_url: string, product_description: string, product_price: number, product_in_stock: number, product_category: string, }
        const _b = req.body, { users } = _b, products = __rest(_b, ["users"]);
        const { error } = productValidator_1.productsSchema.validate(products);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const product = yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .execute('getProductById');
        if (!product.recordset[0]) {
            return res.json({ message: `Product with id:: ${product_id} does not exist` });
        }
        const updatedProduct = yield dbPool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('product_name', mssql_1.default.VarChar, products.product_name)
            .input('product_image_url', mssql_1.default.VarChar, products.product_image_url)
            .input('product_description', mssql_1.default.VarChar, products.product_description)
            .input('product_price', mssql_1.default.Int, products.product_price)
            .input('product_in_stock', mssql_1.default.Int, products.product_in_stock)
            .input('product_category', mssql_1.default.VarChar, products.product_category)
            .execute('updateProduct');
        res.status(200)
            .json({ message: 'Product added successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
