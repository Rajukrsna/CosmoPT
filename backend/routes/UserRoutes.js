const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');
// Get user (you can change to auth-based id system later)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //console.log("got user", user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'User not found' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add points and update level
router.put('/:id/points',  async (req, res) => {
  const { pointsToAdd } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.points += pointsToAdd;
    user.level = Math.floor(user.points / 200) + 1;

    // Unlock Space Scholar if 1000+ points
    const spaceScholar = user.achievements.find(a => a.id === 'space-scholar');
    if (user.points >= 1000 && spaceScholar && !spaceScholar.unlocked) {
      spaceScholar.unlocked = true;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete quiz
router.put('/:id/quiz', async (req, res) => {
  const { quizId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user.completedQuizzes.includes(quizId)) {
      user.completedQuizzes.push(quizId);

      // Unlock First Quiz
      if (user.completedQuizzes.length === 1) {
        const firstQuiz = user.achievements.find(a => a.id === 'first-quiz');
        if (firstQuiz) firstQuiz.unlocked = true;
      }

      // Unlock Quiz Master
      if (user.completedQuizzes.length >= 10) {
        const quizMaster = user.achievements.find(a => a.id === 'quiz-master');
        if (quizMaster) quizMaster.unlocked = true;
      }

      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visit planet
router.put('/:id/visit', async (req, res) => {
  const { planetId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user.visitedPlanets.includes(planetId)) {
      user.visitedPlanets.push(planetId);

      // Unlock Planet Explorer
      if (user.visitedPlanets.length >= 8) {
        const explorer = user.achievements.find(a => a.id === 'planet-explorer');
        if (explorer) explorer.unlocked = true;
      }

      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlock a specific achievement manually
router.put('/:id/unlock', async (req, res) => {
  const { achievementId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    const achievement = user.achievements.find(a => a.id === achievementId);
    if (achievement) {
      achievement.unlocked = true;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Achievement not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
