const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const arango = require('../services/arango');
const numeral = require('numeral');
const wallet = require('../utils/wallet');

const walletInfo = asyncHandler(async (request, response, next) => {
  const { id } = request.query;
  if (!id) {
    return next(new ErrorResponse('Please provide the wallet Id', 400));
  }

  const result = await gp.query(wallet.queries.getWalletsById, [id]);

  let data = {};
  if (result.rows.length > 0) {
    const row = result.rows[0];
    data = {
      topCategory: {
        name: 'Top Category',
        value:
          row.category && row.category.length > 0
            ? wallet.getTopCategory(row.category)
            : 'N/A',
      },
      topLabel: {
        name: 'Top Label',
        value:
          row.label && row.label.length > 0
            ? wallet.getLabels(row.label, (isTopLabel = true))
            : 'N/A',
      },
      riskScore: {
        name: 'Risk Score',
        value:
          numeral(row.risk_score).format('0.00') +
          ' (' +
          wallet.getRiskLevel(row.risk_score) +
          ')',
      },
      size: {
        name: 'Size',
        value: numeral(row.num_address).format('0,0'),
      },
      volume: {
        name: 'Volume',
        value: numeral(row.num_tx).format('0,0'),
      },
      balance: {
        name: 'Balance',
        value: numeral(row.total_received_usd)
          .subtract(row.total_spent_usd)
          .format('$0,0.00'),
      },
      totalIn: {
        name: 'Total In',
        value: numeral(row.total_received_usd).format('$0,0.00'),
      },
      totalOut: {
        name: 'Total Out',
        value: numeral(row.total_spent_usd).format('$0,0.00'),
      },
    };
  }

  response.walletInfo = {
    success: true,
    count: result.rows.length,
    data,
  };

  next();
});

module.exports = walletInfo;
