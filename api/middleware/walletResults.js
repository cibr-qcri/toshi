const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const gp = require('../services/gp');
const moment = require('moment');
const Search = require('../models/Search');

const MAX_RESULTS_IN_PAGE = 25;
const DEFAULT_PAGE_NUM = 1;

const walletResults = asyncHandler(async (request, response, next) => {
  const { query } = request.query;

  if (!query) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  await Search.create({
    user: request.user.id,
    query,
    source: 'web',
  });

  const page = parseInt(request.query.page, 10) || DEFAULT_PAGE_NUM;
  const limit = parseInt(request.query.limit, 10) || MAX_RESULTS_IN_PAGE;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = await gp.query('');

  const total = results.body.hits.total.value;

  const hits = results.body.hits.hits.map((hit) => {

    return {
      id: hit._id,
      url: hit._source.data.info.url,
      title: hit._source.data.info.title,
      crawledAt: moment(hit._source.data.timestamp).utc().toISOString(true),
      body: hit._source.data.info.summary || hit._source.data.info.title,
      info: [
        {
          title: 'Category',
          text: '',
        },
        {
          title: 'Crypto Addresses',
          text: '',
        },
        {
          title: 'Safety',
          text: '',
        },
        {
          title: 'Privacy',
          text: '',
        },
        {
          title: 'Mirroring',
          text: '',
        },
        {
          title: 'Main Language',
          text: '',
        },
        {
          title: 'Status',
          text: '',
        },
        {
          title: 'Availability',
          text: '',
        },
      ],
    };
  });

  const pagination = {};
  if (hits.length > 0) {
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  }

  response.walletResults = {
    success: true,
    count: hits.length,
    pagination,
    data: hits,
  };

  next();
});

module.exports = walletResults;
