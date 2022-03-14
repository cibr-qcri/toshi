calculateMaxValue = (array) => {
  return array.reduce((previous, current, i, arr) => {
    if (
      arr.filter((item) => item === previous).length >
      arr.filter((item) => item === current).length
    ) {
      return previous;
    } else {
      return current;
    }
  });
};

exports.getTopCategory = (categories) => {
  const categoryArray = categories.split(',');
  if (categoryArray.length > 1) {
    return calculateMaxValue(categoryArray);
  } else {
    return categories;
  }
};

exports.getTopLabel = (labels) => {
  const labelArray = labels.split(',');
  if (labelArray.length > 1) {
    return calculateMaxValue(labelArray);
  } else {
    return labels;
  }
};

exports.queries = {
  getWalletsByAddress: `
      SELECT *,
      count(*) OVER() AS total_count
      from btc_wallet
      where cluster_id in (
              SELECT cluster_id
              from btc_address_cluster
              where address = $1
          )
      order by id OFFSET $2
      LIMIT $3;
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
    GROUP BY id OFFSET $3
    LIMIT $4;
    `,
};
