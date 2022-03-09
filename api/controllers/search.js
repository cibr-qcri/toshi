const asyncHandler = require('../middleware/async');

// @desc      Search wallet data by query from greenplum
// @route     GET /api/v1/search/blockchain
// @access    Private
const wallets = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletResults);
});

exports.wallets = wallets;
