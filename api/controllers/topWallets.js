const asyncHandler = require('../middleware/async');

// @desc      Search top wallet data from greenplum
// @route     GET /api/v1/top-wallets
// @access    Private
const getTopWallets = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.topWallets);
});

exports.getTopWallets = getTopWallets;
