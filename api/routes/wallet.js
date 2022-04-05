const walletInfo = require('../middleware/wallet/info');
const walletTransactions = require('../middleware/wallet/transactions');
const walletAddresses = require('../middleware/wallet/addresses');
const walletLinks = require('../middleware/wallet/links');
const walletTopLinks = require('../middleware/wallet/topLinks');
const walletLabels = require('../middleware/wallet/labels');
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getWallet,
  getWalletTxes,
  getWalletAddress,
  getWalletTopConnectedLinks,
  getWalletConnectedLinks,
  getWalletReportedLabels,
} = require('../controllers/wallets');

const router = express.Router();

router.use(protect);
router.get('/:id', walletInfo, getWallet);
router.get('/:id/transactions', walletTransactions, getWalletTxes);
router.get('/:id/addresses', walletAddresses, getWalletAddress);
router.get('/:id/top-links', walletTopLinks, getWalletTopConnectedLinks);
router.get('/:id/links', walletLinks, getWalletConnectedLinks);
router.get('/:id/labels', walletLabels, getWalletReportedLabels);

module.exports = router;
