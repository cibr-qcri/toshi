const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const gp = require("../services/gp");
const numeral = require("numeral");

const MAX_RESULTS_IN_PAGE = 25;

const walletResults = asyncHandler(async (request, response, next) => {
  const {query, type} = request.query;
  const allowedTypes = ["label", "transaction", "address"];

  if (!type) {
    return next(new ErrorResponse("Please provide a search type", 400));
  }

  if (!allowedTypes.includes(type)) {
    return next(new ErrorResponse("Invalid statistic type", 401));
  }

  let requestPage = request.query.page;
  let offset;
  if (!requestPage) {
    // SQL offset starts with 0
    offset = 0;
    requestPage = 1;
  } else {
    requestPage = parseInt(requestPage, 10);
    offset = (requestPage - 1) * MAX_RESULTS_IN_PAGE;
  }

  let getWalletsQuery;
  let queryValues;
  if (type === "address") {
    getWalletsQuery = `SELECT *, count(*) OVER() AS total_count from btc_wallet where cluster_id in (SELECT cluster_id from btc_address_cluster where address=$1) order by id OFFSET $2 LIMIT $3;`;
    queryValues = [ query, offset, MAX_RESULTS_IN_PAGE ];
  } else if (type === "transaction") {
    getWalletsQuery = `SELECT id, cluster_id, num_address, num_tx, total_spent_usd, total_received_usd, risk_score, label, category, array_to_string(array_agg(wallet_type), '/') AS wallet_type, count(*) OVER() AS total_count  from (SELECT btc_wallet.*, 'in_wallet' AS wallet_type  from btc_wallet join (SELECT cluster_id from (SELECT address from btc_tx_input where tx_hash=$1) as addresses join btc_address_cluster on addresses.address=btc_address_cluster.address) as wallets on wallets.cluster_id=btc_wallet.cluster_id UNION SELECT btc_wallet.*, 'out_wallet' AS wallet_type  from btc_wallet join (SELECT cluster_id from (SELECT address from btc_tx_output where tx_hash=$2) as addresses join btc_address_cluster on addresses.address=btc_address_cluster.address) as wallets on wallets.cluster_id=btc_wallet.cluster_id) as wallet_data group by id, cluster_id, num_address,num_tx, total_spent_usd, total_received_usd, risk_score, label, category order by id OFFSET $3 LIMIT $4;`;
    queryValues = [ query, query, offset, MAX_RESULTS_IN_PAGE ];
  } else {
    getWalletsQuery = `SELECT btc_wallet.*, count(*) OVER() AS total_count from btc_wallet where label ~* $1 order by id OFFSET $2 LIMIT $3;`;
    queryValues = [ query, offset, MAX_RESULTS_IN_PAGE ];
  }

  const results = await gp.query(getWalletsQuery, queryValues);
  if (!results) {
    return next(
      new ErrorResponse(
        "There are no data for requested available in greenplum",
        400
      )
    );
  }

  const getTopCategory = (categories) => {
    const categoryArray = categories.split(",");
    if (categoryArray.length > 1) {
      return calculateMaxValue(categoryArray);
    } else {
      return categories;
    }
  }

  const getTopLabel = (labels) => {
    const labelArray = labels.split(",");
    if (labelArray.length > 1) {
      return calculateMaxValue(labelArray);
    } else {
      return labels;
    }
  }

  const calculateMaxValue = (array) => {
    return array.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
  }

  // set total result count of the query
  let total = 0;
  if (results && results.rows.length > 0) {
    total = results.rows[0].total_count;
  }

  const records = results.rows.map((row) => {
    let riskLevel = "Low";
    if (row.risk_score >= 0.7) {
      riskLevel = "High";
    } else if (row.risk_score >= 0.5 && row.risk_score < 0.7) {
      riskLevel = "Medium";
    }

    const walletData = {
      wallet_id: row.cluster_id,
      info: [
        {
          title: "Top Category",
          text: (row.category && row.category.length > 0) ? getTopCategory(row.category) : "N/A",
        },
        {
          title: "Top Label",
          text: (row.label && row.label.length > 0) ? getTopLabel(row.label) : "N/A",
        },
        {
          title: "Size",
          text: numeral(row.num_address).format("0,0"),
        },
        {
          title: "Risk Score",
          text: numeral(row.risk_score).format("0.00") + " (" + riskLevel + ")",
        },
        {
          title: "Total In",
          text: numeral(row.total_received_usd).format("$0,0.00"),
        },
        {
          title: "Total Out",
          text: numeral(row.total_spent_usd).format("$0,0.00"),
        },
      ],
      type: {
        in_wallet: false,
        out_wallet: false,
      },
    };

    if (type === "transaction") {
      if (row.wallet_type === "in_wallet") {
        walletData.type.in_wallet = true;
      } else if (row.wallet_type === "out_wallet") {
        walletData.type.out_wallet = true;
      } else if (row.wallet_type === "in_wallet/out_wallet") {
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
