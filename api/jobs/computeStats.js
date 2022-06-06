const numeral = require('numeral');
const gp = require('../services/gp');
const Statistic = require('../models/Statistic');

const computeStats = async () => {
  console.log(`[cron:computeStats] Server running a scheduled job`.magenta);

  try {
    await Statistic.deleteMany({});
  } catch (error) {
    console.log(`[cron:computeStats] Error while deleting previous record`.red);
    console.log(error);
  }

  try {
    const numWalletsReq = gp.query('SELECT count(*) from btc_wallet;');
    const numLabelsReq = gp.query('SELECT count(*) from btc_address_label;');
    const numBlocksReq = gp.query('SELECT max(height) from btc_block;');
    const [numWalletsRes, numLabelRes, numBlocksRes] = await Promise.all([
      numWalletsReq,
      numLabelsReq,
      numBlocksReq,
    ]);

    if (!numWalletsRes || !numLabelRes || !numBlocksRes) {
      throw new Error('There are no statistics available in greenplum');
    }

    const count = {};
    count.wallet = parseInt(numWalletsRes.rows[0].count);
    count.label = parseInt(numLabelRes.rows[0].count);
    count.block = numeral(parseInt(numBlocksRes.rows[0].max)).format('0,0');

    await Statistic.create({
      computed: {
        count,
      },
    });
    console.log(`[cron:computeStats] Job successfully completed`.green);
  } catch (error) {
    console.log(`[cron:computeStats] Error while computing stats`.red);
    console.log(error);
  }
};

module.exports = computeStats;
