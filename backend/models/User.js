
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  icon: String,
  unlocked: Boolean,
  points: Number,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, default: 'Space Explorer' },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  password: { type: String, required: true}, // Add this
  achievements: [AchievementSchema],
  completedQuizzes: [String],
  visitedPlanets: [String],
});

module.exports = mongoose.model('User', UserSchema);
