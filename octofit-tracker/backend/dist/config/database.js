"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';
const connectDatabase = async () => {
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected to MongoDB');
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
};
exports.disconnectDatabase = disconnectDatabase;
