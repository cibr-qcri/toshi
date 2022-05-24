const topWalletResults = require('../middleware/wallet/topWalletResults');
const express = require('express');
const { protect } = require('../middleware/auth');
const { getTopWallets } = require('../controllers/topWallets');

const router = express.Router();

router.use(protect);
router.get('/', topWalletResults, getTopWallets);

module.exports = router;
