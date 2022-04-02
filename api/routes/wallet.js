const walletInfo = require('../middleware/wallet/info');
const walletTransactions = require('../middleware/wallet/transactions');
const walletAddresses = require('../middleware/wallet/addresses');
const walletLinks = require('../middleware/wallet/links');
const walletTopLinks = require('../middleware/wallet/topLinks');
const walletLabels = require('../middleware/wallet/labels');
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  wallet,
  walletTxes,
  walletAddress,
  walletTopConnectedLinks,
  walletConnectedLinks,
  walletReportedLabels,
} = require('../controllers/wallets');

const router = express.Router();

router.use(protect);
router.get('/:id', walletInfo, wallet);
router.get('/:id/transactions', walletTransactions, walletTxes);
router.get('/:id/addresses', walletAddresses, walletAddress);
router.get('/:id/top-links', walletTopLinks, walletTopConnectedLinks);
router.get('/:id/links', walletLinks, walletConnectedLinks);
router.get('/:id/labels', walletLabels, walletReportedLabels);

module.exports = router;
