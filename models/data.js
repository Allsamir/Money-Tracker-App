const mongoose = require('mongoose');

const moneyTrackerSchema = mongoose.Schema({
          purchase : String,
          price: Number,
          date : String,
          description : String
});

const MoneyTracker = mongoose.model("expense", moneyTrackerSchema);

module.exports = MoneyTracker;