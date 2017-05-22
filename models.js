var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  _id: {
    type: Number,
    index: true
  },
  original: String,
  shortened: String
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
