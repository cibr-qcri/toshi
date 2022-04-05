const asyncHandler = require('../middleware/async');

// @desc      Search wallet data by query from greenplum
// @route     GET /api/v1/search
// @access    Private
const search = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.searchResults);
});

exports.search = search;
