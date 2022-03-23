const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const wallet = require('../utils/wallet');

const walletInfo = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return next(new ErrorResponse('Please provide a valid wallet Id', 400));
  }

  const result = await gp.query(wallet.queries.getWalletsById, [id]);

  let data = {};
  if (result.rows.length > 0) {
    data.info = wallet.getWalletInfo(result.rows[0], true);
    data.labels = wallet.getLabels(result.rows[0].label);
  }

  response.walletInfo = {
    success: true,
    count: result.rows.length,
    data,
  };

  next();
});

module.exports = walletInfo;
