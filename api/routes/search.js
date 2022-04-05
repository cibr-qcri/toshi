const searchResults = require('../middleware/wallet/searchResults');
const express = require('express');
const { protect } = require('../middleware/auth');
const { search } = require('../controllers/search');

const router = express.Router();

router.use(protect);
router.get('/', searchResults, search);

module.exports = router;
