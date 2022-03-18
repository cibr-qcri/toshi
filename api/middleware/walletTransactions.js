const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const arango = require("../services/arango");
const numeral = require("numeral");
const wallet = require("../utils/wallet");

const walletTransactions = asyncHandler(async (request, response, next) => {
  const { id } = request.query;
  if (!id) {
    return next(new ErrorResponse("Please provide the wallet Id", 400));
  }

  const page = parseInt(request.query.page) || 0;
  const count = parseInt(request.query.count) || 10;

  let offset;
  if (page !== 0) {
    offset = page * count;
  } else {
    offset = 0;
  }

  const bindVars = {
    start_wallet: "btc_wallets/" + id,
    offset: offset,
    limit: count,
  };
  const walletTransactionRes = await arango.query({
    query: wallet.queries.getWalletTxById,
    bindVars: bindVars,
  });

  let total = 0;
  let transactions = [];
  for await (const record of walletTransactionRes) {
    total = record.total_count;
    record.data.map((tx) => {
      transactions.push({
        id: tx.hash,
        block_number: tx.block_number,
        output_value: tx.output_value,
        input_value: tx.input_value,
        timestamp: tx.timestamp,
        type: tx.type,
        is_coinbase: tx.is_coinbase ? "True" : "False",
      });
    });
  }

  const pagination = {};
  if (transactions.length > 0) {
    if (total > page * count) {
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
    count: total,
    pagination,
    data: transactions,
  };

  next();
});

module.exports = walletTransactions;
