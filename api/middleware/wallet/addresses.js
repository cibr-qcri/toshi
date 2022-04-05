const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const gp = require('../../services/gp');
const wallet = require('../../utils/wallet');
const { getWalletAddresses } = require('../../utils/wallet');

const walletAddresses = asyncHandler(async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return next(new ErrorResponse('Please provide the wallet Id', 400));
  }

  const page = parseInt(request.query.page) || 0;
  const count = parseInt(request.query.count) || 10;

  let offset;
  if (page !== 0) {
    offset = page * count;
  } else {
    offset = 0;
  }

  const walletAddressRes = await gp.query(
    wallet.queries.getWalletAddressesById,
    [id, offset, count]
  );

  let totalCount = 0;
  if (walletAddressRes && walletAddressRes.rows.length > 0) {
    const walletAddressCountRes = await gp.query(
      wallet.queries.getWalletAddressCountById,
      [id]
    );
    totalCount = parseInt(walletAddressCountRes.rows[0].num_address);
  }

  const addresses = walletAddressRes.rows.map((row) => getWalletAddresses(row));

  const pagination = {};
  if (addresses.length > 0) {
    if (totalCount > page * count) {
      pagination.next = {
        page: page + 1,
        count,
      };
    }

    if (page !== 0) {
      pagination.prev = {
        page: page - 1,
        count,
      };
    }
  }

  response.walletAddresses = {
    success: true,
    count: totalCount,
    pagination,
    data: addresses,
  };

  next();
});

module.exports = walletAddresses;
