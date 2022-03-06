const asyncHandler = require('../middleware/async');
const Statistic = require('../models/Statistic');
const ErrorResponse = require('../utils/errorResponse');
const computeStats = require("../jobs/computeStats");

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {

  let statistics = await Statistic.find();
  if (!statistics) {
    return next(new ErrorResponse('There are no statistics available', 404));
  }

  // if the scheduled job has not been run in first time
  if (statistics.length === 0) {
    await computeStats();
    statistics = await Statistic.find();

    if (!statistics) {
      return next(new ErrorResponse('There are no statistics available', 404));
    }
  }

  return response.status(200).json({
    success: true,
    data: statistics[0],
  });
});

exports.getStatistics = getStatistics;
