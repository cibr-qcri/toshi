const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const arango = require("../services/arango");
const wallet = require("../utils/wallet");
const numeral = require("numeral");

const walletLinks = asyncHandler(async (request, response, next) => {
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

  const linkedWalletCursor = await arango.query({
    query: wallet.queries.getLinkedWalletsById,
    bindVars: {
      start_wallet: "btc_wallets/" + id,
      offset: offset,
      limit: count,
    },
  });
  const linkedWalletRes = await linkedWalletCursor.all();

  let totalCount = 0;
  if (linkedWalletRes.length > 0) {
    totalCount = linkedWalletRes[0].total_count;
  }

  const records = linkedWalletRes.map((currentWallet) => {
    return {
      walletId: currentWallet.item.wallet_id,
      numInTxes: numeral(currentWallet.item.num_inbound_txes).format("0,0"),
      inUSDAmount: numeral(currentWallet.item.inbound_usd_amount).format(
        "$0,0.00"
      ),
      inBTCAmount:
        "₿" +
        numeral(
          wallet.satoshiToBTC(currentWallet.item.inbound_satoshi_amount)
        ).format("0,0.000000"),
      numOutTxes: numeral(currentWallet.item.num_outbound_txes).format("0,0"),
      outUSDAmount: numeral(currentWallet.item.outbound_usd_amount).format(
        "$0,0.00"
      ),
      outBTCAmount:
        "₿" +
        numeral(
          wallet.satoshiToBTC(currentWallet.item.outbound_satoshi_amount)
        ).format("0,0.000000"),
    };
  });

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
