const numeral = require('numeral');
const { timestampToDateString } = require('./common');

exports.stringShortener = (value) => {
  if (value.endsWith('.onion')) {
    value = '[' + value.substring(0, 7) + '].onion';
  }
  return value;
};

const findMostFrequentItem = (object) => {
  let result = {
    topValue: '',
    count: 0,
    values: [],
  };
  Object.entries(object).map(([key, value]) => {
    if (value > result.count) {
      result.topValue = this.stringShortener(key);
      result.count = value;
    } else if (value === result.count) {
      result.topValue = '';
    }
    result.values.push({ text: this.stringShortener(key), value: value });
  }, {});
  return result;
};

exports.getTopCategory = (categories) => {
  const categoriesObject = JSON.parse(categories);
  if (Object.keys(categoriesObject).length > 1) {
    return findMostFrequentItem(categoriesObject).topValue;
  } else {
    return Object.keys(categoriesObject)[0];
  }
};

exports.getLabels = (labels, isTopLabel = false) => {
  if (!labels) {
    return [];
  }
  const labelObject = JSON.parse(labels);
  if (Object.keys(labelObject).length < 2 && isTopLabel) {
    return this.stringShortener(Object.keys(labelObject)[0]);
  } else if (isTopLabel) {
    return findMostFrequentItem(labelObject).topValue;
  } else {
    return findMostFrequentItem(labelObject).values;
  }
};

exports.getEdgeWidth = (value) => {
  if (value > 1000) {
    return 5;
  } else if (value > 100) {
    return 3;
  } else {
    return 1;
  }
};

exports.getRiskLevel = (score) => {
  let riskLevel = 'Low';
  if (score >= 0.7) {
    riskLevel = 'High';
  } else if (score >= 0.5 && score < 0.7) {
    riskLevel = 'Medium';
  }
  return riskLevel;
};

exports.satoshiToBTC = (value) => {
  return value / 100000000;
};

exports.getWalletAddresses = (row) => {
  return {
    id: row.id,
    address: row.address,
    totalSpentBTC: row.total_spent_satoshi
      ? '₿' +
        numeral(this.satoshiToBTC(row.total_spent_satoshi)).format('0,0.000000')
      : 'N/A',
    totalSpentUSD: row.total_spent_usd
      ? numeral(row.total_spent_usd).format('$0,0.00')
      : 'N/A',
    totalReceivedBTC: row.total_received_satoshi
      ? '₿' +
        numeral(this.satoshiToBTC(row.total_received_satoshi)).format(
          '0,0.000000'
        )
      : 'N/A',
    totalReceivedUSD: row.total_received_usd
      ? numeral(row.total_received_usd).format('$0,0.00')
      : 'N/A',
    btcBalance:
      row.total_received_satoshi && row.total_spent_satoshi
        ? '₿' +
          numeral(this.satoshiToBTC(row.total_received_satoshi))
            .subtract(this.satoshiToBTC(row.total_spent_satoshi))
            .format('0,0.000000')
        : 'N/A',
    usdBalance:
      row.total_received_usd && row.total_spent_usd
        ? numeral(row.total_received_usd)
            .subtract(row.total_spent_usd)
            .format('$0,0.00')
        : 'N/A',
  };
};

exports.getWalletTxes = (row) => {
  return {
    id: row.id,
    transaction: row.tx_hash,
    blockNumber: numeral(row.block_number).format('0,0'),
    outputBTCValue:
      '₿' + numeral(this.satoshiToBTC(row.output_value)).format('0,0.000000'),
    inputBTCValue:
      '₿' + numeral(this.satoshiToBTC(row.input_value)).format('0,0.000000'),
    inputUSDValue: numeral(row.input_usd_value).format('$0,0.00'),
    outputUSDValue: numeral(row.output_usd_value).format('$0,0.00'),
    type: row.tx_type,
    isCoinbase: row.is_coinbase ? 'Yes' : 'No',
    timestamp: timestampToDateString(row.timestamp),
  };
};

exports.getWalletLinks = (wallet, index) => {
  return {
    id: index,
    wallet: wallet.item.wallet_id,
    numOutTxes: numeral(wallet.item.num_inbound_txes).format('0,0'),
    outUSDAmount: numeral(wallet.item.inbound_usd_amount).format('$0,0.00'),
    outBTCAmount:
      '₿' +
      numeral(this.satoshiToBTC(wallet.item.inbound_satoshi_amount)).format(
        '0,0.000000'
      ),
    numInTxes: numeral(wallet.item.num_outbound_txes).format('0,0'),
    inUSDAmount: numeral(wallet.item.outbound_usd_amount).format('$0,0.00'),
    inBTCAmount:
      '₿' +
      numeral(this.satoshiToBTC(wallet.item.outbound_satoshi_amount)).format(
        '0,0.000000'
      ),
  };
};

exports.escapeCharacters = (value) => {
  return value.replace(/(?=[() ])/g, '\\');
};

exports.getWalletInfo = (result, isDetailed = false) => {
  let riskScore = 'N/A';
  if (result.risk_score > -1) {
    riskScore =
      numeral(result.risk_score).format('0.00') +
      ' (' +
      this.getRiskLevel(result.risk_score) +
      ')';
  }
  let walletInfo = {
    topCategory: {
      name: 'Top Category',
      value:
        result.category && result.category.length > 0
          ? this.getTopCategory(result.category)
          : 'N/A',
    },
    topLabel: {
      name: 'Top Label',
      value:
        result.label && result.label.length > 0
          ? this.getLabels(result.label, (isTopLabel = true))
          : 'N/A',
    },
    riskScore: {
      name: 'Risk Score',
      value: riskScore,
    },
    size: {
      name: 'Size',
      value: numeral(result.num_address).format('0,0'),
    },
    // volume: {
    //   name: 'Volume',
    //   value: numeral(result.num_tx).format('0,0'),
    // },
  };

  if (isDetailed) {
    walletInfo = {
      ...walletInfo,
      volume: {
        name: 'Volume',
        value: numeral(result.num_tx).format('0,0'),
      },
      usdBalance: {
        name: 'Balance',
        value: numeral(result.total_received_usd)
          .subtract(result.total_spent_usd)
          .format('$0,0.00'),
      },
      btcBalance: {
        name: 'Balance',
        value:
          '₿' +
          numeral(this.satoshiToBTC(result.total_received))
            .subtract(this.satoshiToBTC(result.total_spent))
            .format('0,0.000000'),
      },
      totalUSDIn: {
        name: 'Total In',
        value: numeral(result.total_received_usd).format('$0,0.00'),
      },
      totalUSDOut: {
        name: 'Total Out',
        value: numeral(result.total_spent_usd).format('$0,0.00'),
      },
      totalBTCIn: {
        name: 'Total In',
        value:
          '₿' +
          numeral(this.satoshiToBTC(result.total_received)).format(
            '0,0.000000'
          ),
      },
      totalBTCOut: {
        name: 'Total Out',
        value:
          '₿' +
          numeral(this.satoshiToBTC(result.total_spent)).format('0,0.000000'),
      },
    };
  }

  return walletInfo;
};

exports.getSortByString = (sortBy) => {
  if (sortBy === 'size' || sortBy === '') {
    return 'num_address';
  } else if (sortBy === 'riskScore') {
    return 'risk_score';
  } else if (sortBy === 'volume') {
    return 'num_tx';
  } else '';
};

exports.queries = {
  getWalletsById: `
      SELECT *
      FROM btc_wallet
      WHERE cluster_id = $1;
  `,
  getWalletTxById: `
      SELECT *
      FROM btc_wallet_transaction
      WHERE cluster_id = $1
      ORDER BY id OFFSET $2
      LIMIT $3;
  `,
  getWalletTxCountById: `
      SELECT num_tx
      FROM btc_wallet
      WHERE cluster_id = $1;
  `,
  getWalletAddressCountById: `
      SELECT num_address
      FROM btc_wallet
      WHERE cluster_id = $1;
  `,
  getWalletAddressesById: `
      SELECT id, address, total_spent_satoshi, total_spent_usd, total_received_satoshi, total_received_usd
      FROM btc_address_cluster
      WHERE cluster_id  = $1
      ORDER BY id OFFSET $2
      LIMIT $3;
  `,
  getWalletLabelsById: `
      SELECT *,
      count(*) OVER() AS total_count
      FROM btc_address_label
      WHERE cluster_id  = $1
      ORDER BY id OFFSET $2
      LIMIT $3;
  `,
  getWalletsByAddress: `
      SELECT *,
      count(*) OVER() AS total_count
      FROM btc_wallet
      WHERE cluster_id in (
              SELECT cluster_id
              FROM btc_address_cluster
              WHERE address = $1
          )
      ORDER BY id OFFSET $2
      LIMIT $3;
    `,
  getWalletById: `
      SELECT *,
      1 AS total_count
      FROM btc_wallet
      WHERE cluster_id = $1
    `,
  getWalletMoneyFlowById: `
    SELECT category, SUM(total_usd_amount) as total_usd_amount, flow_type
    FROM btc_wallet_money_flow
    WHERE wallet_id = $1
    GROUP BY category, flow_type;
  `,
  getWalletByLabel: `
    SELECT btc_wallet.*, count(*) OVER() AS total_count
    FROM btc_wallet
    WHERE label ~* $1
    ORDER BY (CASE 
    WHEN $2='num_address' THEN num_address 
    WHEN $2='num_tx' THEN num_tx 
    WHEN $2='risk_score' THEN risk_score 
    END) DESC 
    OFFSET $3
    LIMIT $4;
    `,
  getTopWallet: `
    SELECT btc_wallet.*
    FROM btc_wallet
    ORDER BY (CASE 
    WHEN $1='num_address' THEN num_address 
    WHEN $1='num_tx' THEN num_tx 
    WHEN $1='risk_score' THEN risk_score 
    END) DESC 
    LIMIT $2;
    `,
  getWalletByTx: `
    SELECT id,
    cluster_id,
    num_address,
    num_tx,
    total_spent_usd,
    total_received_usd,
    risk_score,
    label,
    category,
    array_to_string(array_agg(wallet_type), '/') AS wallet_type,
    count(*) OVER() AS total_count
    FROM (
            SELECT btc_wallet.*,
                'out_wallet' AS wallet_type
            FROM btc_wallet
                JOIN (
                    SELECT cluster_id
                    FROM (
                            SELECT address
                            FROM btc_tx_input
                            WHERE tx_hash = $1
                        ) AS addresses
                        JOIN btc_address_cluster ON addresses.address = btc_address_cluster.address
                ) AS wallets ON wallets.cluster_id = btc_wallet.cluster_id
            UNION
            SELECT btc_wallet.*,
                'in_wallet' AS wallet_type
            FROM btc_wallet
                JOIN (
                    SELECT cluster_id
                    FROM (
                            SELECT address
                            FROM btc_tx_output
                            WHERE tx_hash = $2
                        ) AS addresses
                        JOIN btc_address_cluster ON addresses.address = btc_address_cluster.address
                ) AS wallets ON wallets.cluster_id = btc_wallet.cluster_id
        ) AS wallet_data
    GROUP BY id,
        cluster_id,
        num_address,
        num_tx,
        total_spent_usd,
        total_received_usd,
        risk_score,
        label,
        category
    ORDER BY (CASE 
      WHEN $3='num_address' THEN num_address 
      WHEN $3='num_tx' THEN num_tx 
      WHEN $3='risk_score' THEN risk_score 
      END) DESC 
    OFFSET $4
    LIMIT $5;
    `,
  getTopLinkedWalletsById: `
    WITH btc_addresses,
    btc_wallets_update LET start_vertex = @start_wallet FOR v,
    e in 1..1 any start_vertex btc_wallet_edges_update FILTER not (
        e._to == start_vertex
        and e._from == start_vertex
    ) LET c_wallet = SPLIT((e._from == start_vertex ? e._to: e._from), '/') [1] COLLECT wallet = c_wallet INTO wallets_group_by_id LET in_wallet_tx_hashes = (
        for item in wallets_group_by_id [*].e FILTER item._to == start_vertex return distinct item.tx_hash
    ) LET out_wallet_tx_hashes = (
        for item in wallets_group_by_id [*].e FILTER item._from == start_vertex return distinct item.tx_hash
    ) LET tx_hashes = (
        for hash in wallets_group_by_id [*].e.tx_hash return distinct hash
    ) SORT LENGTH(tx_hashes) DESC
    LIMIT
        0, 5 RETURN { 'wallet_id': wallet,
        'num_inbound_txes': LENGTH(in_wallet_tx_hashes),
        'num_outbound_txes': LENGTH(out_wallet_tx_hashes) }
  `,
  getLinkedWalletsById: `
    WITH btc_addresses,
    btc_wallets_update let start_vertex = @start_wallet LET wallets = (
        FOR v,
        e in 1..1 any start_vertex btc_wallet_edges_update FILTER not (
            e._to == start_vertex
            and e._from == start_vertex
        ) LET c_wallet = SPLIT((e._from == start_vertex ? e._to: e._from), '/') [1] COLLECT wallet = c_wallet INTO wallets_group_by_id LET in_wallet_satoshi_amount = (
            for item in wallets_group_by_id [*].e FILTER item._to == start_vertex return SUM(
                [ item.in_satoshi_amount, item.out_satoshi_amount ]
            )
        ) LET in_wallet_usd_amount = (
            for item in wallets_group_by_id [*].e FILTER item._to == start_vertex return SUM([ item.in_usd_amount, item.out_usd_amount ])
        ) LET in_wallet_tx_hashes = (
            for item in wallets_group_by_id [*].e FILTER item._to == start_vertex return distinct item.tx_hash
        ) LET out_wallet_satoshi_amount = (
            for item in wallets_group_by_id [*].e FILTER item._from == start_vertex return SUM(
                [ item.in_satoshi_amount, item.out_satoshi_amount ]
            )
        ) LET out_wallet_usd_amount = (
            for item in wallets_group_by_id [*].e FILTER item._from == start_vertex return SUM([ item.in_usd_amount, item.out_usd_amount ])
        ) LET out_wallet_tx_hashes = (
            for item in wallets_group_by_id [*].e FILTER item._from == start_vertex return distinct item.tx_hash
        ) LET tx_hashes = (
            for hash in wallets_group_by_id [*].e.tx_hash return distinct hash
        ) SORT LENGTH(tx_hashes) DESC RETURN { 'wallet_id': wallet,
        'num_total_txes': LENGTH(tx_hashes),
        'num_inbound_txes': LENGTH(in_wallet_tx_hashes),
        'inbound_satoshi_amount': SUM(in_wallet_satoshi_amount),
        'inbound_usd_amount': SUM(in_wallet_usd_amount),
        'num_outbound_txes': LENGTH(out_wallet_tx_hashes),
        'outbound_satoshi_amount': SUM(out_wallet_satoshi_amount),
        'outbound_usd_amount': SUM(out_wallet_usd_amount) }
    ) FOR item in wallets
    LIMIT
        @offset, @limit RETURN { 'total_count': LENGTH(wallets),
        item }
  `,
};
