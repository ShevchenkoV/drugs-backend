var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DrugsSchema   = new Schema({
  "name": String,
  "origin": String,
  "country": String,
  "ats4": String,
  "ats": String,
  "group": String,
  "analog": Number,
  "code": Number,
  "min": Number,
  "max": Number
});

module.exports = mongoose.model('Drugs', DrugsSchema);
