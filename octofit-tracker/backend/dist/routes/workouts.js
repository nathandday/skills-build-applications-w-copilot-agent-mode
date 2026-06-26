"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({});
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
