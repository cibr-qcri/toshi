const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const arango = require("../services/arango");
const wallet = require("../utils/wallet");
const numeral = require('numeral');

const walletTopLinks = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return next(new ErrorResponse("Please provide the wallet Id", 400));
  }

  let topLinkedWalletCursor =  await arango.query({
    query: wallet.queries.getTopLinkedWalletsById,
    bindVars: { start_wallet: 'btc_wallets/' + id },
  });
  const topLinkedWalletRes = await topLinkedWalletCursor.all();

  let topLinks = {};
  let nodes = [{
    id: id,
    label: "wallet",
    title: "This is the current wallet",
    color: "#4791db"
  }];
  let edges = [];
  let index = 1;
  topLinkedWalletRes.map((wallet) => {
    nodes.push({
      id: wallet.wallet_id,
      label: "wallet-" + index++,
      title: "This wallet has {} total connected txes"
    });
    edges.push({
      from: wallet.wallet_id,
      to: id,
      label: 'txes:' + wallet.num_total_txes
    });
  });

  topLinks.nodes = nodes;
  topLinks.edges = edges;

  response.walletTopLinks = {
    success: true,
    count: topLinks.edges.length,
    data: topLinks,
  };

  next();
});

module.exports = walletTopLinks;
