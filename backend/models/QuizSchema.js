// models/Quiz.js
const mongoose = require('mongoose');
const QuestionSchema = require('./QuestionSchema');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  questions: [QuestionSchema],
  points: { type: Number, required: true },
}, {
  timestamps: true
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
