var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//控告举报表
var Charge = new Schema({
    name: String,
    tel: Number,
    content: String,
    type: String
});


module.exports = mongoose.model('Charge', Charge);