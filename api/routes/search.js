const walletResults = require('../middleware/walletResults');
const express = require('express');
const { protect } = require('../middleware/auth');
const { wallets } = require('../controllers/search');

const router = express.Router();

router.use(protect);
router.get('/', walletResults, wallets);

module.exports = router;
