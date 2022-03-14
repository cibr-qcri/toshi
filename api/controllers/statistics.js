const asyncHandler = require('../middleware/async');
const Statistic = require('../models/Statistic');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {
  let statistics = await Statistic.findOne();

  if (!statistics) {
    return next(new ErrorResponse('There are no statistics available', 404));
  }

  return response.status(200).json({
    success: true,
    data: statistics,
  });
});

exports.getStatistics = getStatistics;
