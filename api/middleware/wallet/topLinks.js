const asyncHandler = require('../async');
const ErrorResponse = require('../../utils/errorResponse');
const arango = require('../../services/arango');
const wallet = require('../../utils/wallet');
const numeral = require('numeral');
const util = require('util');

const walletTopLinks = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return next(new ErrorResponse('Please provide the wallet Id', 400));
  }

  let topLinkedWalletCursor = await arango.query({
    query: wallet.queries.getTopLinkedWalletsById,
    bindVars: { start_wallet: 'btc_wallets/' + id },
  });
  const topLinkedWalletRes = await topLinkedWalletCursor.all();

  let topLinks = {};
  let nodes = [
    {
      id: id,
      label: util.format('[%s]', id.split('-')[0]),
      title: 'Current Wallet',
      color: '#4791db',
    },
  ];
  let edges = [];
  topLinkedWalletRes.map((row) => {
    nodes.push({
      id: row.wallet_id,
      label: util.format('[%s]', row.wallet_id.split('-')[0]),
      title: util.format(
        'Inbound Txes - %s \n Outbound Txes - %s',
        row.num_inbound_txes,
        row.num_outbound_txes
      ),
    });
    if (row.num_inbound_txes > 0) {
      edges.push({
        from: row.wallet_id,
        to: id,
        width: wallet.getEdgeWidth(row.num_inbound_txes),
        smooth: { type: 'curvedCW', roundness: 0.2 },
      });
    }
    if (row.num_outbound_txes > 0) {
      edges.push({
        from: id,
        to: row.wallet_id,
        width: wallet.getEdgeWidth(row.num_outbound_txes),
        smooth: { type: 'curvedCW', roundness: 0.2 },
      });
    }
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
