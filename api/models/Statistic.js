const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema(
  {
    computed: {
      type: Object,
      required: true,
    },
  }
);

module.exports = mongoose.model('Statistic', StatisticSchema);
