const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema(
  {
    computed: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Statistic', StatisticSchema);
