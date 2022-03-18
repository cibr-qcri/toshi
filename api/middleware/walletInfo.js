const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const gp = require("../services/gp");
const arango = require("../services/arango");
const numeral = require("numeral");
const wallet = require("../utils/wallet");

const walletInfo = asyncHandler(async (request, response, next) => {
  const { id } = request.query;
  if (!id) {
    return next(new ErrorResponse("Please provide the wallet Id", 400));
  }

  const walletInfoReq =  gp.query(wallet.queries.getWalletsById, [id]);
  const walletMoneyFlowReq = gp.query(wallet.queries.getWalletMoneyFlowById, [id] );
  const topLinkedWalletReq = arango.query({ query: wallet.queries.getTopWalletsById, bindVars: { "start_wallet": 'btc_wallets/' + id } });
  const [walletInfoRes, walletMoneyFlowRes, topLinkedWalletRes] = await Promise.all([walletInfoReq, walletMoneyFlowReq, topLinkedWalletReq]);

  let record = {};

  let links = [];
  for await (const wallet of topLinkedWalletRes) {
    links.push(
      {
        id: wallet.wallet_id.split("/")[1],
        num_total_txes: wallet.num_total_txes,
        num_inbound_txes: wallet.num_inbound_txes,
        inbound_satoshi_amount: wallet.num_inbound_txes,
        inbound_usd_amount: wallet.num_inbound_txes,
        num_outbound_txes: wallet.num_inbound_txes,
        outbound_satoshi_amount: wallet.num_inbound_txes,
        outbound_usd_amount: wallet.num_inbound_txes,
      }
    );
  }
  record.links = links;

  if (walletInfoRes.rows.length > 0) {
    const row = walletInfoRes.rows[0];
    record.summary = [
        {
          name: "Wallet",
          value: row.cluster_id,
        },
        {
          name: "Category",
          value:
            row.category && row.category.length > 0
              ? wallet.getTopCategory(row.category)
              : "N/A",
        },
        {
          name: "Toshi Score",
          value:
            numeral(row.risk_score).format("0.00") +
            " (" +
            wallet.getRiskLevel(row.risk_score) +
            ")",
        },
        {
          name: "Volume (#txes)",
          value: numeral(row.num_tx).format("0,0"),
        },
        {
          name: "Size (#address)",
          value: numeral(row.num_address).format("0,0"),
        },
        {
          name: "Balance",
          value: numeral(row.total_received_usd)
            .subtract(row.total_spent_usd)
            .format("$0,0.00"),
        },
        {
          name: "Total Sent",
          value: numeral(row.total_spent_usd).format("$0,0.00"),
        },
        {
          name: "Total Received",
          value: numeral(row.total_received_usd).format("$0,0.00"),
        },
      ];
      record.labels = row.label && row.label.length > 0 ? wallet.getLabels(row.label) : [];
  }

  let moneyFlowNodes = [ { id: "Wallet" } ];
  let moneyFlowLinks = [];
  walletMoneyFlowRes.rows.forEach(row => {
    if (row.flow_type === 'IN') {
      moneyFlowNodes.push({ id: row.category + " "});
      moneyFlowLinks.push({
        source: "Wallet",
        target: row.category + " ",
        value: Math.round(row.total_usd_amount * 100) / 100,
      })
    } else {
      moneyFlowNodes.push({ id: row.category});
      moneyFlowLinks.push({
        source: row.category,
        target: "Wallet",
        value: Math.round(row.total_usd_amount * 100) / 100,
      })
    }
  });
  record.moneyFlow = { "nodes" : moneyFlowNodes, "links" : moneyFlowLinks };

  response.walletInfo = {
    success: true,
    count: walletInfoRes.rows.length,
    data: record,
  };

  next();
});

module.exports = walletInfo;

