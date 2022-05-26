const mongoose = require('mongoose');

const AddressTagSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    abuser: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: [false, 'Please select the type'],
      enum: ['user', 'service'],
    },
    serviceCategory: {
      type: String,
      required: [false, 'Please select a service category'],
      enum: [
        'wallet',
        'pool',
        'scam',
        'marketplace',
        'gambling',
        'exchange',
        'darkweb',
        'blacklist',
        'finance',
        'utility',
        'tumbler',
        'gateway',
        'socialMedia',
        'darkwebOther',
      ],
    },
    darkwebSubcategory: {
      type: String,
      required: [false, 'Please select a Darkweb service subcategory'],
      enum: [
        'crypto-service',
        'index',
        'marketplace',
        'pornography',
        'forum',
        'other',
      ],
    },
    description: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AddressTag', AddressTagSchema, 'addressTags');
