var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleType = new Schema({
    typeName: String,

    description: String,
    isExpired: Boolean
});

module.exports = mongoose.model('ArticleType', ArticleType);