"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).sort({ rank: 1 });
    res.json(leaderboard);
});
exports.default = router;
