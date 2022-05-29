const asyncHandler = require('../async');
const ErrorResponse = require('../../utils/errorResponse');
const arango = require('../../services/arango');
const wallet = require('../../utils/wallet');
const numeral = require('numeral');
const util = require('util');
const gp = require('../../services/gp');

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

  // get topLinkedWallet ids
  const topWalletIds = topLinkedWalletRes.map((row) => {
    return row.wallet_id;
  });
  topWalletIds.push(id);
  const topWalletSizeRes = await gp.query(
    wallet.queries.getTopLinkedWalletsSize,
    [topWalletIds]
  );

  let topWalletSizeMap = {};
  topWalletSizeRes.rows.map((row) => {
    topWalletSizeMap[row.cluster_id] = row.num_address;
  });

  let topLinks = {};
  let nodes = [
    {
      id: id,
      label: 'Current',
      color: '#4791db',
      value: topWalletSizeMap[id],
    },
  ];
  let edges = [];
  topLinkedWalletRes.map((row) => {
    nodes.push({
      id: row.wallet_id,
      label: util.format('[%s]', row.wallet_id.split('-')[0]),
      value: topWalletSizeMap[row.wallet_id],
      title: util.format(
        'Wallet Size: %s',
        numeral(topWalletSizeMap[row.wallet_id]).format('0,0')
      ),
    });

    if (row.num_inbound_txes > 0) {
      edges.push({
        from: row.wallet_id,
        to: id,
        width: wallet.getEdgeWidth(row.num_inbound_txes),
        smooth: { type: 'curvedCW', roundness: 0.2 },
        title: util.format(
          'Tx Count: %s',
          numeral(row.num_inbound_txes).format('0,0')
        ),
      });
    }

    if (row.num_outbound_txes > 0) {
      edges.push({
        from: id,
        to: row.wallet_id,
        width: wallet.getEdgeWidth(row.num_outbound_txes),
        smooth: { type: 'curvedCW', roundness: 0.2 },
        title: util.format(
          'Tx Count: %s',
          numeral(row.num_outbound_txes).format('0,0')
        ),
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
