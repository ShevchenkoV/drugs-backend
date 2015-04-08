var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DrugsSchema   = new Schema({
  "name": String,
  "origin": String,
  "country": String,
  "ats4": String,
  "ats": String,
  "group": String,
  "analog": String,
  "code": String,
  "min": String,
  "max": String
});

module.exports = mongoose.model('Drugs', DrugsSchema);