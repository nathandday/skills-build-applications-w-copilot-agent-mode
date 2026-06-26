"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const apiUrl_1 = require("./utils/apiUrl");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker backend is running',
        apiBaseUrl: (0, apiUrl_1.getApiBaseUrl)(),
    });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${(0, apiUrl_1.getApiBaseUrl)()}`);
    });
};
startServer();
