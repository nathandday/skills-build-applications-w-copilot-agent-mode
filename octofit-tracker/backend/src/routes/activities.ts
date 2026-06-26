import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

export default router;
