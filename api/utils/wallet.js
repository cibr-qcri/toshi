const stringShortener = (value) => {
  if (value.endsWith(".onion")) {
    value = "[" + value.substring(0, 7) + "].onion";
  }
  return value;
};

const findMostFrequentItem = (strArray) => {
  let result = {
    topValue: "",
    count: 0,
    values: [],
  };
  result.values = strArray.reduce((strCount, currentStr) => {
    currentStr = stringShortener(currentStr);
    if (strCount[currentStr]) {
      strCount[currentStr] += 1;
    } else {
      strCount[currentStr] = 1;
    }
    if (strCount[currentStr] > result.count) {
      result.topValue = currentStr;
      result.count = strCount[currentStr];
    }
    return strCount;
  }, {});
  return result;
};

exports.getTopCategory = (categories) => {
  const categoryArray = categories.split(",");
  if (categoryArray.length > 1) {
    return findMostFrequentItem(categoryArray).topValue;
  } else {
    return categories;
  }
};

exports.getLabels = (labels, isTopLabel = false) => {
  const labelArray = labels.split(",");
  if (labelArray.length < 2 && isTopLabel) {
    return stringShortener(labels);
  }
  if (labelArray.length < 2) {
    return [stringShortener(labels)];
  } else if (isTopLabel) {
    return findMostFrequentItem(labelArray).topValue;
  } else {
    return Object.keys(findMostFrequentItem(labelArray).values);
  }
};

exports.getRiskLevel = (score) => {
  let riskLevel = "Low";
  if (score >= 0.7) {
    riskLevel = "High";
  } else if (score >= 0.5 && score < 0.7) {
    riskLevel = "Medium";
  }
  return riskLevel;
};

exports.queries = {
  getWalletsById: `
      SELECT *
      FROM btc_wallet
      WHERE cluster_id = $1;
  `,
  getWalletTxById: `
      LET start_vertex = @start_wallet
      LET txes = (
        for edge in btc_wallet_address_edges
        FILTER (edge._from == start_vertex)
        LET address = edge._to
        for item in btc_edges 
            FILTER (item._from == address or item._to == address)
            LET tx_hash  = SPLIT((item._from == address) ? item._to : item._from, '/')[1]
            LET type = { 'hash': tx_hash , 'type' : (item._from == address) ? 'SENDING' : 'RECEIVING' }
            FOR tx IN btc_transactions
                FILTER tx_hash == tx._key 
                RETURN distinct UNSET(MERGE(tx, type),  "_id", "_key", "_rev")
        )
        LET response_data = (
                FOR item in txes
                LIMIT @offset, @limit
                RETURN item
        )
        RETURN { "total_count": LENGTH(txes), "data": response_data }
  `,
  getWalletAddressById: `
      SELECT id, address,
      count(*) OVER() AS total_count
      FROM btc_address_cluster
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
  getWalletMoneyFlowById: `
    SELECT category, SUM(total_usd_amount) as total_usd_amount, flow_type
    FROM btc_wallet_money_flow
    WHERE wallet_id = $1
    GROUP BY category, flow_type;
  `,
  getWalletByLabel: `
    SELECT btc_wallet.*,
        count(*) OVER() AS total_count
    FROM btc_wallet
    WHERE label ~* $1
    ORDER BY id OFFSET $2
    LIMIT $3;
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
                'in_wallet' AS wallet_type
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
                'out_wallet' AS wallet_type
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
    OFFSET $3
    LIMIT $4;
    `,
  getTopWalletsById: `
    WITH btc_addresses, btc_wallets 
    let start_vertex = @start_wallet
    FOR v, e in 1..1 any start_vertex btc_wallet_edges 
    FILTER not(e._to == start_vertex and e._to == start_vertex) 
    LET c_wallet = (e._from == start_vertex ? e._to : e._from) 
    COLLECT wallet = c_wallet INTO wallets_group_by_id 
    LET in_wallet_satoshi_amount = (for item in wallets_group_by_id[*].e 
    FILTER item._to == start_vertex return SUM([ item.in_satoshi_amount, item.out_satoshi_amount ])) 
    LET in_wallet_usd_amount = (for item in wallets_group_by_id[*].e 
    FILTER item._to == start_vertex return SUM([ item.in_usd_amount, item.out_usd_amount ])) 
    LET in_wallet_tx_hashes = (for item in wallets_group_by_id[*].e 
    FILTER item._to == start_vertex return distinct item.tx_hash) 
    LET out_wallet_satoshi_amount = (for item in wallets_group_by_id[*].e 
    FILTER item._from == start_vertex return SUM([ item.in_satoshi_amount, item.out_satoshi_amount ])) 
    LET out_wallet_usd_amount = (for item in wallets_group_by_id[*].e 
    FILTER item._from == start_vertex return SUM([ item.in_usd_amount, item.out_usd_amount ])) 
    LET out_wallet_tx_hashes = (for item in wallets_group_by_id[*].e 
    FILTER item._from == start_vertex return distinct item.tx_hash) 
    LET tx_hashes = (for hash in wallets_group_by_id[*].e.tx_hash return distinct hash) 
    SORT LENGTH (tx_hashes) DESC LIMIT 0, 10 
    RETURN { 'wallet_id': wallet, 'num_total_txes': LENGTH(tx_hashes), 'num_inbound_txes': LENGTH(in_wallet_tx_hashes), 
    'inbound_satoshi_amount': SUM(in_wallet_satoshi_amount), 'inbound_usd_amount': SUM(in_wallet_usd_amount), 
    'num_outbound_txes': LENGTH(out_wallet_tx_hashes), 'outbound_satoshi_amount': SUM(out_wallet_satoshi_amount), 
    'outbound_usd_amount': SUM(out_wallet_usd_amount) }
  `,
};
