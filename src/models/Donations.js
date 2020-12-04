const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('donations', DonationSchema);