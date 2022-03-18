const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const arango = require("../services/arango");
const numeral = require("numeral");
const wallet = require("../utils/wallet");

const MAX_RESULTS_IN_PAGE = 10;

const walletAddresses = asyncHandler(async (request, response, next) => {
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
  const walletAddresRes = await arango.query({ query: wallet.queries.getWalletAddressById, bindVars: bindVars });

  let total = 0;
  let addresses = [];
  for await (const record of walletAddresRes) {
    total = record.total_count;
    record.data.map((address) => {
      addresses.push(
        {
          id: address.id,
          address: address.address,
          type: address.type,
        }
      );
    });
  }

  const pagination = {};
  if (addresses.length > 0) {
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

  response.walletAddresses = {
    success: true,
    count: total,
    pagination,
    data: addresses,
  };

  next();
});

module.exports = walletAddresses;

