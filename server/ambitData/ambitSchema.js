var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ambitSchema = new Schema({
  refId: {type: Number, index: true}, //a number used to keep track of the ambit
  name: String,
  coords: {
    latitude: Number,
    longitude: Number
  },
  weekdays: [Boolean], //0 is Sunday, 6 is Saturday
  startDate: Date,
  startTime: Date,
  checkIns: [Date], // a history of successful check-ins
  time: Date,
  icon: String
  //time (when during the day are you supposed to check in)
  //repeats (every week? every other week? is this necessary?)
});

var Ambit = mongoose.model('Ambit', ambitSchema);

module.exports = Ambit;
