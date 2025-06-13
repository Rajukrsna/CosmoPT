const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "your_secret_key"; // Better to store in .env

const initialAchievements = [
  { id: 'first-quiz', title: 'First Steps', description: 'Complete your first quiz', icon: '🎓', unlocked: false, points: 50 },
  { id: 'planet-explorer', title: 'Planet Explorer', description: 'Visit all planets in the solar system', icon: '🌍', unlocked: false, points: 200 },
  { id: 'mission-commander', title: 'Mission Commander', description: 'Complete your first space mission', icon: '🚀', unlocked: false, points: 100 },
  { id: 'quiz-master', title: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🏆', unlocked: false, points: 300 },
  { id: 'space-scholar', title: 'Space Scholar', description: 'Reach 1000 points', icon: '⭐', unlocked: false, points: 500 },
];

// Create new user
router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      password: hashedPassword,
      points: 0,
      level: 1,
      achievements: initialAchievements,
      completedQuizzes: [],
      visitedPlanets: [],
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// "Login" by name only (for demo purposes)
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
console.log(name, password)
  try {
    const user = await User.findOne({ name });
    console.log("userfound", user)
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

   const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' });
    res.json({user, token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
