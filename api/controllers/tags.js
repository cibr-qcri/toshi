const asyncHandler = require('../middleware/async');
const WalletTag = require('../models/WalletTag');
const AddressTag = require('../models/AddressTag');

// @desc      Get tags of signed in user
// @route     GET /api/v1/me/tags
// @route     GET /api/v1/tags
// @access    Private
const getTags = asyncHandler(async (request, response, next) => {
  if (request.reRoute && request.reRoute.noMongoResults) {
    const tags = await Tag.find({ user: request.user.id });

    return response.status(200).json({
      success: true,
      count: tags.length,
      data: tags,
    });
  } else {
    response.status(200).json(response.mongoResults);
  }
});

// @desc      Add a tag for signed in user
// @route     POST /api/v1/me/tags
// @route     POST /api/v1/tags
// @access    Private
const addTag = asyncHandler(async (request, response, next) => {
  request.body.user = request.user.id;
  const isWalletTagging = request.body.isWalletTagging;
  delete request.body[isWalletTagging];

  let tag;
  if (isWalletTagging) {
    tag = await WalletTag.create(request.body);
  } else {
    tag = await AddressTag.create(request.body);
  }

  tag.user = undefined;

  response.status(201).json({
    success: true,
    data: tag,
  });
});

exports.getTags = getTags;
exports.addTag = addTag;
