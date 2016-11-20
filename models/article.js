var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema({
    title: String,
    author: String,
    publisher: String,
    procuratorate: { type: mongoose.Schema.Types.ObjectId, ref: 'Procuratorate' },
    content: String,
    articleType: { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleType' },
    comment: String,
    readNums: Number,
    isExpired: Boolean,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

});


module.exports = mongoose.model('Article', Article);