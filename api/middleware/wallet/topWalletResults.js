const asyncHandler = require('../async');
const ErrorResponse = require('../../utils/errorResponse');
const gp = require('../../services/gp');
const wallet = require('../../utils/wallet');

const MAX_RESULTS_IN_PAGE = 25;

const topWalletResults = asyncHandler(async (request, response, next) => {
  const { sortBy, order } = request.query;
  const sortByString = wallet.getSortByString(sortBy);
  if (sortByString === '') {
    return next(new ErrorResponse('Please provide a valid sortBy param', 400));
  }

  const getWalletsQuery = wallet.queries.getTopWallet;
  const queryValues = [sortByString, order, MAX_RESULTS_IN_PAGE];
  const results = await gp.query(getWalletsQuery, queryValues);

  // set total result count of the query
  let total = 0;
  if (results && results.rows.length > 0) {
    total = results.rows.length;
  }

  const records = results.rows.map((row) => {
    return {
      _id: row.cluster_id,
      info: wallet.getWalletInfo(row),
    };
  });

  response.topWallets = {
    success: true,
    count: total,
    data: records,
  };

  next();
});

module.exports = topWalletResults;
