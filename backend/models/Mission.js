const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  outcome: { type: String, enum: ['success', 'failure', 'continue'], required: true },
  points: { type: Number, default: 0 },
  nextScenario: { type: String },
  result: { type: String },
}, { _id: false });

const ScenarioSchema = new mongoose.Schema({
  id: { type: String, required: true },
  situation: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
}, { _id: false });

const MissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  duration: { type: String, required: true }, // e.g., "10 min", "1 hour"
  objective: { type: String, required: true },
  scenarios: { type: [ScenarioSchema], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Mission', MissionSchema);
