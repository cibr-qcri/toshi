const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const numeral = require('numeral');

const MAX_RESULTS_IN_PAGE = 25;
const DEFAULT_PAGE_NUM = 1;

const walletResults = asyncHandler(async (request, response, next) => {

  const { query, type } = request.query;
  const allowedTypes = ['label', 'transaction', 'address'];

  if (!type) {
    return next(new ErrorResponse('Please provide a search type', 400));
  }

  if (!allowedTypes.includes(type)) {
    return next(new ErrorResponse('Invalid statistic type', 401));
  }

  let getWalletsQuery;
  if (type === 'address') {
    getWalletsQuery = `SELECT * from btc_wallet where cluster_id in (SELECT cluster_id from btc_address_cluster where address='${query}');`;
  } else if (type === 'transaction') {
    getWalletsQuery = `SELECT id, cluster_id,num_address,num_tx,total_spent,total_received, risk_score, array_to_string(array_agg(wallet_type), '/') AS wallet_type  from (SELECT btc_wallet.*, 'in_wallet' AS wallet_type  from btc_wallet join (SELECT cluster_id from (SELECT address from btc_tx_input where tx_hash='${query}') as addresses join btc_address_cluster on addresses.address=btc_address_cluster.address) as wallets on wallets.cluster_id=btc_wallet.cluster_id UNION SELECT btc_wallet.*, 'out_wallet' AS wallet_type  from btc_wallet join (SELECT cluster_id from (SELECT address from btc_tx_output where tx_hash='${query}') as addresses join btc_address_cluster on addresses.address=btc_address_cluster.address) as wallets on wallets.cluster_id=btc_wallet.cluster_id) as wallet_data group by id, cluster_id,num_address,num_tx,total_spent,total_received, risk_score;`;
  } else {
    getWalletsQuery = `SELECT btc_wallet.* from btc_wallet inner join (SELECT cluster_id from btc_address_cluster inner join (SELECT DISTINCT address from btc_address_label where label ~* '${query}') as label_address on label_address.address=btc_address_cluster.address) as wallet_addresses on wallet_addresses.cluster_id=btc_wallet.cluster_id;`;
  }

  const results = await gp.query(getWalletsQuery);
  if (!results) {
    return next(new ErrorResponse('There are no data for requested available in greenplum', 400));
  }

  const page = parseInt(request.query.page, 10) || DEFAULT_PAGE_NUM;
  const limit = parseInt(request.query.limit, 10) || MAX_RESULTS_IN_PAGE;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = results.rows.length;

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
          title: 'Size (# address)',
          text: numeral(row.num_address).format('0,0'),
        },
        {
          title: 'Risk Score',
          text: numeral(row.risk_score).format('0.00') + " (" + riskLevel + ")",
        },
        {
          title: 'Total In',
          text: numeral(row.total_received).format('$0,0.00'),
        },
        {
          title: 'Total Out',
          text: numeral(row.total_spent).format('$0,0.00'),
        },
      ],
      type: {
        in_wallet: false,
        out_wallet: false,
      },
    }

    if (type === 'transaction') {
      if (row.wallet_type === 'in_wallet') {
        walletData.type.in_wallet = true
      } else if (row.wallet_type === 'out_wallet') {
        walletData.type.out_wallet = true
      } else if (row.wallet_type === 'in_wallet/out_wallet') {
        walletData.type.in_wallet = true
        walletData.type.out_wallet = true
      }
    }

    return walletData;
  });

  const pagination = {};
  if (records.length > 0) {
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  }

  response.walletResults = {
    success: true,
    count: records.length,
    pagination,
    data: records,
  };

  next();
});

module.exports = walletResults;
