const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    safety: {
      type: String,
      required: [false, 'Please select a saftey class'],
      enum: ['benign', 'malicious'],
    },
    type: {
      type: String,
      required: [false, 'Please select the type'],
      enum: ['user', 'service'],
    },
    userType: {
      type: String,
      required: [false, 'Please select the user type'],
      enum: ['socialMedia', 'other'],
    },
    serviceType: {
      type: String,
      required: [false, 'Please select the service type'],
      enum: [
        'wallet',
        'pool',
        'scam',
        'marketplace',
        'gambling',
        'exchange',
        'darkweb',
        'finance',
        'utility',
        'tumbler',
        'gateway',
        'darkwebOther',
      ],
    },
    darkwebCategory: {
      type: String,
      required: [false, 'Please select the Darkweb category'],
      enum: [
        'crypto-service',
        'index',
        'marketplace',
        'pornography',
        'forum',
        'other',
      ],
    },
    comments: {
      type: String,
      default: '',
    },
    other: {
      type: String,
      default: '',
    },
    darkwebOther: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    page: {
      type: String,
      required: [true, 'Please provide a page id'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tag', TagSchema);
