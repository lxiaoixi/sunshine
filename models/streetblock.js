var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//街道办表
var StreetBlock = new Schema({
    streetName: String,
    content: String,

});

module.exports = mongoose.model('StreetBlock', StreetBlock);