const asyncHandler = require('../async');
const ErrorResponse = require('../../utils/errorResponse');
const wallet = require('../../utils/wallet');
const gp = require('../../services/gp');
const { getWalletTxes } = require('../../utils/wallet');

const walletTransactions = asyncHandler(async (request, response, next) => {
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

  const walletTransactionRes = await gp.query(wallet.queries.getWalletTxById, [
    id,
    offset,
    count,
  ]);

  let totalCount = 0;
  if (walletTransactionRes && walletTransactionRes.rows.length > 0) {
    const walletTransactionCountRes = await gp.query(
      wallet.queries.getWalletTxCountById,
      [id]
    );
    totalCount = parseInt(walletTransactionCountRes.rows[0].num_tx);
  }

  const transactions = walletTransactionRes.rows.map((row) =>
    getWalletTxes(row)
  );

  const pagination = {};
  if (transactions.length > 0) {
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

  response.walletTransactions = {
    success: true,
    count: totalCount,
    pagination,
    data: transactions,
  };

  next();
});

module.exports = walletTransactions;
