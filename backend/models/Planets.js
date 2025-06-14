const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  diameter: { type: String, required: true },
  mass: { type: String, required: true },
  temperature: { type: String, required: true },
  moons: { type: Number, required: true },
  dayLength: { type: String, required: true },
  yearLength: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const PlanetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  distance: { type: Number, required: true }, // AU from Sun
  size: { type: Number, required: true },     // relative size for display
  color: { type: String, required: true },
  info: { type: InfoSchema, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Planet', PlanetSchema);
