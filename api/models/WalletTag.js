const mongoose = require('mongoose');

const WalletTagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    isAbuse: {
      type: Boolean,
      default: false,
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
      required: [false, 'Please select a darkweb service subcategory'],
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
    walletId: {
      type: String,
      required: [true, 'Please provide a wallet id'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WalletTag', WalletTagSchema, 'walletTags');
