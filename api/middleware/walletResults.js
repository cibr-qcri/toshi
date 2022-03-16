const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const numeral = require('numeral');
const wallet = require('../utils/wallet');

const MAX_RESULTS_IN_PAGE = 25;

const walletResults = asyncHandler(async (request, response, next) => {
  const { query, type } = request.query;
  const allowedTypes = ['label', 'transaction', 'address'];

  if (!type) {
    return next(new ErrorResponse('Please provide a search type', 400));
  }

  if (!allowedTypes.includes(type)) {
    return next(new ErrorResponse('Invalid search type', 400));
  }

  let requestPage = request.query.page;
  let offset;
  if (!requestPage) {
    offset = 0; // SQL offset starts with 0
    requestPage = 1;
  } else {
    requestPage = parseInt(requestPage, 10);
    offset = (requestPage - 1) * MAX_RESULTS_IN_PAGE;
  }

  let getWalletsQuery;
  let queryValues;
  if (type === 'address') {
    getWalletsQuery = wallet.queries.getWalletsByAddress;
    queryValues = [query, offset, MAX_RESULTS_IN_PAGE];
  } else if (type === 'transaction') {
    getWalletsQuery = wallet.queries.getWalletByTx;
    queryValues = [query, query, offset, MAX_RESULTS_IN_PAGE];
  } else {
    getWalletsQuery = wallet.queries.getWalletByLabel;
    queryValues = [query, offset, MAX_RESULTS_IN_PAGE];
  }

  const results = await gp.query(getWalletsQuery, queryValues);

  // set total result count of the query
  let total = 0;
  if (results && results.rows.length > 0) {
    total = results.rows[0].total_count;
  }

  const records = results.rows.map((row) => {
    let riskLevel = 'Low';
    if (row.risk_score >= 0.7) {
      riskLevel = 'High';
    } else if (row.risk_score >= 0.5 && row.risk_score < 0.7) {
      riskLevel = 'Medium';
    }

    const walletData = {
      wallet_id: row.cluster_id,
      info: [
        {
          title: 'Top Category',
          text:
            row.category && row.category.length > 0
              ? wallet.getTopCategory(row.category)
              : 'N/A',
        },
        {
          title: 'Top Label',
          text:
            row.label && row.label.length > 0
              ? wallet.getTopLabel(row.label)
              : 'N/A',
        },
        {
          title: 'Size',
          text: numeral(row.num_address).format('0,0'),
        },
        {
          title: 'Risk Score',
          text: numeral(row.risk_score).format('0.00') + ' (' + riskLevel + ')',
        },
        {
          title: 'Total In',
          text: numeral(row.total_received_usd).format('$0,0.00'),
        },
        {
          title: 'Total Out',
          text: numeral(row.total_spent_usd).format('$0,0.00'),
        },
      ],
      type: {
        in_wallet: false,
        out_wallet: false,
      },
    };

    if (type === 'transaction') {
      if (row.wallet_type === 'in_wallet') {
        walletData.type.in_wallet = true;
      } else if (row.wallet_type === 'out_wallet') {
        walletData.type.out_wallet = true;
      } else if (row.wallet_type === 'in_wallet/out_wallet') {
        walletData.type.in_wallet = true;
        walletData.type.out_wallet = true;
      }
    }

    return walletData;
  });

  const pagination = {};
  if (records.length > 0) {
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

  response.walletResults = {
    success: true,
    count: total,
    pagination,
    data: records,
  };

  next();
});

module.exports = walletResults;
