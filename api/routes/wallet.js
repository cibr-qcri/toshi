const walletInfo = require("../middleware/walletInfo");
const walletTransactions = require("../middleware/walletTransactions");
const walletAddresses = require("../middleware/walletAddresses");
const walletLinks = require("../middleware/walletLinks");
const walletTopLinks = require("../middleware/walletTopLinks");
const walletLabels = require("../middleware/walletLabels");
const express = require("express");
const { protect } = require("../middleware/auth");
const {
  wallet,
  walletTxes,
  walletAddress,
  walletTopConnectedLinks,
  walletConnectedLinks,
  walletReportedLabels,
} = require("../controllers/wallets");

const router = express.Router();

router.use(protect);
router.get("/:id", walletInfo, wallet);
router.get("/:id/transactions", walletTransactions, walletTxes);
router.get("/:id/addresses", walletAddresses, walletAddress);
router.get("/:id/top-links", walletTopLinks, walletTopConnectedLinks);
router.get("/:id/links", walletLinks, walletConnectedLinks);
router.get("/:id/labels", walletLabels, walletReportedLabels);

module.exports = router;
