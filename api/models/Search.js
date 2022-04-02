const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['label', 'transaction', 'address'],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

module.exports = mongoose.model('Search', SearchSchema);
