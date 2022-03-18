const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const arango = require("../services/arango");
const numeral = require("numeral");
const wallet = require("../utils/wallet");

const MAX_RESULTS_IN_PAGE = 10;

const walletTransactions = asyncHandler(async (request, response, next) => {
  const { id } = request.query;
  if (!id) {
    return next(new ErrorResponse("Please provide the wallet Id", 400));
  }

  let requestPage = request.query.page;
  let offset;
  if (!requestPage) {
    offset = 0; // AQL offset starts with 0
    requestPage = 1;
  } else {
    requestPage = parseInt(requestPage, 10);
    offset = (requestPage - 1) * MAX_RESULTS_IN_PAGE;
  }

  const bindVars = { "start_wallet": 'btc_wallets/' + id, 'offset': offset }
  const walletTransactionRes = await arango.query({ query: wallet.queries.getWalletTxById, bindVars: bindVars });

  let total = 0;
  let transactions = [];
  for await (const record of walletTransactionRes) {
    total = record.total_count;
    record.data.map((tx) => {
      transactions.push(
        {
          id: tx.hash,
          block_number: tx.block_number,
          output_value: tx.output_value,
          input_value: tx.input_value,
          timestamp: tx.timestamp,
          type: tx.type,
          is_coinbase: (tx.is_coinbase) ? "True" : "False",
        }
      );
    });
  }

  const pagination = {};
  if (transactions.length > 0) {
    if (total > requestPage * MAX_RESULTS_IN_PAGE) {
      pagination.next = {
        page: requestPage + 1,
        MAX_RESULTS_IN_PAGE,
      };
    }

    pagination.prev = {
      page: requestPage - 1,
      MAX_RESULTS_IN_PAGE,
    };
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

