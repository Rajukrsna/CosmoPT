const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['planet', 'star', 'galaxy', 'nebula', 'moon'],
    required: true
  },
  distance: { type: Number, required: true }, // in kilometers
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  funFacts: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
