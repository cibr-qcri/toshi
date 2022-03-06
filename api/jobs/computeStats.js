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

  const count = {};
  try {
    const walletRequest = gp.query('SELECT count(*) from btc_wallet;');
    const labelRequest = gp.query('SELECT count(distinct label) from btc_address_label;');
    const riskLevelRequest = gp.query('SELECT avg(risk_score) from btc_wallet;');
    const [walletResponse, labelResponse, riskLevelResponse] = await Promise.all([walletRequest, labelRequest, riskLevelRequest]);

    if (!walletResponse|| !labelResponse || !riskLevelResponse) {
      throw new Error('There are no statistics available in greenplump');
    }

    count.wallet = walletResponse.rows[0].count;
    count.label = labelResponse.rows[0].count;
    count.riskLevelScore = riskLevelResponse.rows[0].avg;

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
