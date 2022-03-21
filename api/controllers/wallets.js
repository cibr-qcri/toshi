const asyncHandler = require('../middleware/async');

// @desc      Get wallet information
// @route     GET /api/v1/wallet
// @access    Private
exports.wallet = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletInfo);
});

// @desc      Get wallet information
// @route     GET /api/v1/transactions/wallet
// @access    Private
exports.walletTxes = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletTransactions);
});

// @desc      Get wallet information
// @route     GET /api/v1/addresses/wallet
// @access    Private
exports.walletAddress = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletAddresses);
});
