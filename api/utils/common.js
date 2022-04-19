exports.filters = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  mongoOperators: /\b(gt|gte|lt|lte|in)\b/g,
};

exports.getStrFromQuery = (query) => {
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((field) => delete query[field]);
  let queryStr = JSON.stringify(query);
  return queryStr.replace(filters.mongoOperators, (match) => `$${match}`);
};

exports.timestampToDateString = (timestamp) => {
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };

  const date = new Date(timestamp * 1000);

  const formatted = `${date.toLocaleDateString(
    'en-CA',
    dateOptions
  )} ${date.toLocaleTimeString('en-CA', timeOptions)}`;

  return formatted;
};
