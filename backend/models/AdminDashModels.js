const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const MessMenuData = mongoose.model('MessMenu', messMenuSchema);
module.exports = {
    MessMenuData
}
