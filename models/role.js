var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = new Schema({
    roleName: String,
    description: String,
    isExpired: Boolean
});

module.exports = mongoose.model('Role', Role);