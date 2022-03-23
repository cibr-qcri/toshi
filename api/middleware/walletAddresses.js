const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const gp = require("../services/gp");
const wallet = require("../utils/wallet");
const numeral = require('numeral');

const walletAddresses = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
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

  const walletAddressRes = await gp.query(wallet.queries.getWalletAddressById, [
    id,
    offset,
    count,
  ]);

  let totalCount = 0;
  if (walletAddressRes && walletAddressRes.rows.length > 0) {
    totalCount = parseInt(walletAddressRes.rows[0].total_count);
  }

  const addresses = walletAddressRes.rows.map((row) => {
    return {
      id: row.id,
      address: row.address,
      totalSpentSatoshi: (row.total_spent_satoshi) ? numeral(row.total_spent_satoshi).format('0,0'): '-',
      totalSpentUSD: (row.total_spent_usd) ? numeral(row.total_spent_usd).format('$0,0.00'): '-',
      totalReceivedSatoshi: (row.total_received_satoshi) ? numeral(row.total_received_satoshi).format('0,0'): '-',
      totalReceivedUSD: (row.total_received_usd) ? numeral(row.total_received_usd).format('$0,0.00'): '-',
      satoshiBalance: (row.total_received_satoshi && row.total_spent_satoshi) ? numeral(row.total_received_satoshi)
        .subtract(row.total_spent_satoshi).format('0,0'): '-',
      usdBalance: (row.total_received_usd && row.total_spent_usd) ? numeral(row.total_received_usd)
        .subtract(row.total_spent_usd).format('$0,0.00'): '-',
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

  response.walletAddresses = {
    success: true,
    count: totalCount,
    pagination,
    data: addresses,
  };

  next();
});

module.exports = walletAddresses;
