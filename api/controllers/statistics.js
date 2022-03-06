const asyncHandler = require('../middleware/async');
const gp = require('../services/gp');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {

  const walletRequest = gp.query('SELECT count(*) from btc_wallet;');
  const labelRequest = gp.query('SELECT count(distinct label) from btc_address_label;');
  const riskLevelRequest = gp.query('SELECT avg(risk_score) from btc_wallet;');
  const [walletResponse, labelResponse, riskLevelResponse] = await Promise.all([walletRequest, labelRequest, riskLevelRequest]);

  if (!walletResponse|| !labelResponse || !riskLevelResponse) {
    return next(new ErrorResponse('There are no statistics available', 404));
  }

  const statistics = {
    computed: {
      count: {
        wallet: walletResponse.rows[0].count,
        label: labelResponse.rows[0].count,
        riskLevelScore: riskLevelResponse.rows[0].avg,
      },
    },
  }

  return response.status(200).json({
    success: true,
    data: statistics,
  });
});

exports.getStatistics = getStatistics;
