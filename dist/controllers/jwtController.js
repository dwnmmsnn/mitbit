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
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sql_1 = require("../utils/sql");
const JWT_SECRET = process.env.JWT_SECRET || 'l0cn1nc0ln0clnlJTl10lTCl1010lclc';
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId, secretKey } = req.body;
    try {
        const storedSecretKey = yield (0, sql_1.getSecretKey)(shopId);
        if (storedSecretKey && secretKey === storedSecretKey) {
            const token = jsonwebtoken_1.default.sign({ shopId, secretKey }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(403).json({ message: 'Invalid shopId or secretKey' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signin = signin;
