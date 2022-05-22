const asyncHandler = require('../async');
const ErrorResponse = require('../../utils/errorResponse');
const arango = require('../../services/arango');
const wallet = require('../../utils/wallet');
const { getWalletLinks } = require('../../utils/wallet');

const walletLinks = asyncHandler(async (request, response, next) => {
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

  const linkedWalletCursor = await arango.query({
    query: wallet.queries.getLinkedWalletsById,
    bindVars: {
      start_wallet: 'btc_wallets_update/' + id,
      offset: offset,
      limit: count,
    },
  });
  const linkedWalletRes = await linkedWalletCursor.all();

  let totalCount = 0;
  if (linkedWalletRes.length > 0) {
    totalCount = linkedWalletRes[0].total_count;
  }

  const records = linkedWalletRes.map((wallet, index) =>
    getWalletLinks(wallet, index)
  );

  const pagination = {};
  if (records.length > 0) {
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

  response.walletLinks = {
    success: true,
    count: totalCount,
    pagination,
    data: records,
  };

  next();
});

module.exports = walletLinks;
