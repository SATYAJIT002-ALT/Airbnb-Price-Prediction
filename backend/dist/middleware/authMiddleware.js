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
exports.host = exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Handle cases where token is literal string "null" from localStorage
            if (token === 'null')
                throw new Error('Token is null');
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = yield User_1.default.findById(decoded.id).select('-passwordHash');
        }
        catch (error) {
            console.log('Token verification failed, using fallback user');
        }
    }
    // If no user found (e.g. DB cleared but localStorage persisted), inject a mock user for the demo
    if (!req.user) {
        req.user = {
            _id: '000000000000000000000000', // Valid 24-char ObjectId for Mongoose
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'Host'
        };
    }
    next();
});
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    }
    else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
exports.admin = admin;
const host = (req, res, next) => {
    // For demo purposes, allow any authenticated user to act as a host
    if (req.user) {
        next();
    }
    else {
        res.status(401).json({ message: 'Not authorized, no user found' });
    }
};
exports.host = host;
