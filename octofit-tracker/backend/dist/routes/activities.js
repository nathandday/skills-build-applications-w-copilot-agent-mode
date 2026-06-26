"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.Activity.find({});
    res.json(activities);
});
router.post('/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
exports.default = router;
