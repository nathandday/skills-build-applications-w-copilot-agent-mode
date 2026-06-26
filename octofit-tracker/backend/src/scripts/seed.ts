import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';
import { connectDatabase, disconnectDatabase } from '../config/database';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'admin' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
    { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' },
  ]);

  const teams = await Team.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
    { userName: 'Ava Chen', score: 985, rank: 1 },
    { userName: 'Noah Patel', score: 941, rank: 2 },
    { userName: 'Mina Alvarez', score: 912, rank: 3 },
  ]);

  await Workout.insertMany([
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
  await disconnectDatabase();
};

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
