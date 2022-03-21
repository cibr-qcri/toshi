const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const wallet = require('../utils/wallet');

const walletInfo = asyncHandler(async (request, response, next) => {
  const { id } = request.query;
  if (!id) {
    return next(new ErrorResponse('Please provide a wallet ID', 400));
  }

  const result = await gp.query(wallet.queries.getWalletsById, [id]);

  let data = {};
  if (result.rows.length > 0) {
    data = wallet.getWalletInfo(result.rows[0], true);
  }

  response.walletInfo = {
    success: true,
    count: result.rows.length,
    data,
  };

  next();
});

module.exports = walletInfo;
