const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  university: {
    type: mongoose.Types.ObjectId,
    ref: 'university'
  }
}, { timestamps: true });

module.exports = mongoose.model('faculty', facultySchema);