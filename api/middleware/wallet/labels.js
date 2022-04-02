const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const gp = require('../../services/gp');
const wallet = require('../../utils/wallet');

const walletLabels = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return next(new ErrorResponse('Please provide the wallet Id', 400));
  }

  const page = parseInt(request.query.page) || 0;
  const count = parseInt(request.query.count) || 10;

  let offset;
  if (page !== 0) {
    offset = page * count;
  } else {
    offset = 0;
  }

  const walletLabelsRes = await gp.query(wallet.queries.getWalletLabelsById, [
    id,
    offset,
    count,
  ]);

  let totalCount = 0;
  if (walletLabelsRes && walletLabelsRes.rows.length > 0) {
    totalCount = parseInt(walletLabelsRes.rows[0].total_count);
  }

  const addresses = walletLabelsRes.rows.map((row) => {
    return {
      id: row.id,
      label: row.label,
      category: row.category,
      source: row.source,
      address: row.address,
    };
  });

  const pagination = {};
  if (addresses.length > 0) {
    if (totalCount > page * count) {
      pagination.next = {
        page: page + 1,
        count,
      };
    }

    if (page !== 0) {
      pagination.prev = {
        page: page - 1,
        count,
      };
    }
  }

  response.walletLabels = {
    success: true,
    count: totalCount,
    pagination,
    data: addresses,
  };

  next();
});

module.exports = walletLabels;
