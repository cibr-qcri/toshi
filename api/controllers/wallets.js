const asyncHandler = require('../middleware/async');

// @desc      Get wallet information
// @route     GET /api/v1/wallet/:id
// @access    Private
const getWallet = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletInfo);
});

// @desc      Get wallet tx information
// @route     GET /api/v1/wallet/:id/transactions
// @access    Private
const getWalletTxes = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletTransactions);
});

// @desc      Get wallet address information
// @route     GET /api/v1/wallet/:id/addresses
// @access    Private
const getWalletAddress = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.walletAddresses);
});

// @desc      Get wallet top connected wallets information
// @route     GET /api/v1/wallet/:id/top-links
// @access    Private
const getWalletTopConnectedLinks = asyncHandler(
  async (request, response, next) => {
    response.status(200).json(response.walletTopLinks);
  }
);

// @desc      Get wallet connected wallets information
// @route     GET /api/v1/wallet/:id/links
// @access    Private
const getWalletConnectedLinks = asyncHandler(
  async (request, response, next) => {
    response.status(200).json(response.walletLinks);
  }
);

// @desc      Get wallet labels information
// @route     GET /api/v1/wallet/:id/labels
// @access    Private
const getWalletReportedLabels = asyncHandler(
  async (request, response, next) => {
    response.status(200).json(response.walletLabels);
  }
);

exports.getWallet = getWallet;
exports.getWalletTxes = getWalletTxes;
exports.getWalletAddress = getWalletAddress;
exports.getWalletTopConnectedLinks = getWalletTopConnectedLinks;
exports.getWalletConnectedLinks = getWalletConnectedLinks;
exports.getWalletReportedLabels = getWalletReportedLabels;
