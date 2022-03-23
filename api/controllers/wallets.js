const asyncHandler = require('../middleware/async');

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id
// @access    Private
exports.wallet = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletInfo);
});

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id/transactions
// @access    Private
exports.walletTxes = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletTransactions);
});

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id/addresses
// @access    Private
exports.walletAddress = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletAddresses);
});

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id/top-links
// @access    Private
exports.walletTopConnectedLinks = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletTopLinks);
});

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id/links
// @access    Private
exports.walletConnectedLinks = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletLinks);
});
