"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.Team.find({});
    res.json(teams);
});
router.post('/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.default = router;
