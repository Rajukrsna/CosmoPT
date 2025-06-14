const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  speed: { type: Number, required: true }, // km/s
  description: { type: String, required: true },
  icon: { type: String, required: true }, // URL or class name for an icon
  multiplier: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
