var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//主任表
var LiasionPeople = new Schema({
    name: String,
    tel: Number,
    address: String,

});

module.exports = mongoose.model('LiasionPeople', LiasionPeople);