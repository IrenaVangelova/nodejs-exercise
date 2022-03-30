const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  academy: {
      type: mongoose.Types.ObjectId,
      ref: 'academy'
  }
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);