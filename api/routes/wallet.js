const walletInfo = require("../middleware/walletInfo");
const walletTransactions = require("../middleware/walletTransactions");
const walletAddresses = require("../middleware/walletAddresses");
const express = require("express");
const { protect } = require("../middleware/auth");
const { wallet, walletTxes, walletAddress } = require("../controllers/wallets");

const router = express.Router();

router.use(protect);
router.get("/wallet", walletInfo, wallet);
router.get("/transactions/wallet", walletTransactions, walletTxes);
router.get("/addresses/wallet", walletAddresses, walletAddress);

module.exports = router;