"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'admin' },
        { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
        { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' },
    ]);
    const teams = await team_1.Team.insertMany([
        {
            name: 'Endurance Squad',
            sport: 'Running',
            members: users.slice(0, 2).map((user) => user._id.toString()),
        },
        {
            name: 'Strength Crew',
            sport: 'CrossFit',
            members: [users[2]._id.toString()],
        },
    ]);
    await activity_1.Activity.insertMany([
        {
            type: 'run',
            duration: 35,
            date: '2026-06-26',
            userId: users[0]._id.toString(),
        },
        {
            type: 'weightlifting',
            duration: 45,
            date: '2026-06-25',
            userId: users[1]._id.toString(),
        },
        {
            type: 'cycling',
            duration: 60,
            date: '2026-06-24',
            userId: users[2]._id.toString(),
        },
    ]);
    await leaderboard_1.LeaderboardEntry.insertMany([
        { userName: 'Ava Chen', score: 985, rank: 1 },
        { userName: 'Noah Patel', score: 941, rank: 2 },
        { userName: 'Mina Alvarez', score: 912, rank: 3 },
    ]);
    await workout_1.Workout.insertMany([
        {
            title: 'Morning Jog Interval',
            difficulty: 'moderate',
            duration: 30,
            focus: 'cardio',
        },
        {
            title: 'Full Body Strength',
            difficulty: 'advanced',
            duration: 45,
            focus: 'strength',
        },
        {
            title: 'Core Recovery Flow',
            difficulty: 'easy',
            duration: 20,
            focus: 'mobility',
        },
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
