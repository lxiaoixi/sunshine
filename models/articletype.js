var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleType = new Schema({
    name: String,
    description: String,
    isExpired: Boolean
});

module.exports = mongoose.model('ArticleType', ArticleType);