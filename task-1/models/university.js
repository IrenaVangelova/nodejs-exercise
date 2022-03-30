const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  faculties: [{
    type: mongoose.Types.ObjectId,
    ref: 'faculty'
  }]
}, { timestamps: true });

module.exports = mongoose.model('university', universitySchema);